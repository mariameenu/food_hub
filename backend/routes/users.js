var express = require('express');
const orderModel = require('../models/OrderModel');

var router = express.Router();
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

require('dotenv').config();



const Schema = mongoose.Schema;

const SignupSchema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true }, // Store as a string to prevent formatting issues
  password: { type: String, required: true },
  address:{type: String},
  role: { type: String,enum: ["admin", "store", "customer"], default: "customer" } // Default role
});

const SignupModel = mongoose.model('users',SignupSchema);

/* GET customer listing. */
router.get('/', async function(req, res, next) {
  try{
    let customers = await SignupModel.find({role:"customer"});
    const customerIds = customers.map(c => c._id);
    const orders = await orderModel.aggregate([
      {$match:{customerId:{$in:customerIds}}},
      {$group:{_id:"$customerId",  count:{$sum:1}}}
    ]);
    const orderCountMap = {};
    orders.forEach(o =>{
      orderCountMap[o._id.toString()]= o.count;
    });
    const customersWithOrderCount = customers.map(c=>({
      ...c._doc,
      orderCount:orderCountMap[c._id.toString()] || 0
    }));
      res.json(customersWithOrderCount);
  }
  catch(error){
    console.error(error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
});

/* GET store listing. */
router.get('/stores', async function(req, res, next) {
  let result = await SignupModel.find({role:"store"});
  res.json(result);
});

// add users
router.post('/',async function(req,res,next){
    try{
      const { username, email, phone, password, role } = req.body;
      // Check if all fields are provided
      if (!username || !email || !phone || !password) {
        return res.status(400).json({ message: "All fields are required" });
      }
      // Check if email already exists
      const existingUser = await SignupModel.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ message: "Email already in use" });
      }
       // Hash password
       const salt = await bcrypt.genSalt(10);
       const hashedPassword = await bcrypt.hash(password,salt);

        // Determine role: use provided one or assign based on first user
        const isFirstUser = (await SignupModel.countDocuments()) === 0;
        const userRole = isFirstUser ? "admin" : role || "customer";

         // Create new user
        const newUser = new SignupModel({
          username,
          email,
          phone,
          password: hashedPassword,
          role : userRole
        }); 

         // Save user to database
         await newUser.save();

         res.status(201).json({message: "User Registered Successfully", user: newUser});
    }
    catch(error){
      res.status(500).json({message:"Server Error", error: error.message});
    }   

});

//login users
router.post('/login', async function(req,res,next){
  try{
      const {email,password} = req.body;
      //check if all fields are provided
      if(!email || !password){
        return res.status(400).json({message : "All fields are required"});   
      }
      // Check if the user exists
      const user = await SignupModel.findOne({ email });
      if (!user) {
          return res.status(400).json({ message: "Invalid email or password" });
      }
      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ message: "Invalid email or password" });
      }
      // Generate JWT Token
      const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET// Make sure to set this in your .env file          
        );
        res.status(200).json({ message: "Login successful", token, user });
  }
  catch(error){
    res.status(500).json({message:"Server Error", error: error.message});
  }
});

//count customer
router.get('/countcustomer', async function(req,res,next){
  let count = await SignupModel.countDocuments({role:"customer"});
  res.json({count});
});

//count store
router.get('/countstore', async function(req,res,next){
  let count = await SignupModel.countDocuments({role:"store"});
  res.json({count});
});

//delete store
router.delete('/deletestore/:id', async function(req,res,next){
  try {
    const result = await SignupModel.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({ message: "Store not found" });
    }
    res.status(200).json({ message: "Store deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


module.exports = router;
