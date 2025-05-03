var express = require('express');
var router = express.Router();
const upload = require("../uploads");

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name:String,
    price: Number,
    category: String,
    status:String,
    description:String,
    imageUrl : String, // store filename or image url
    storeId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"users",
    required:true
  }
},{timestamps:true});

const productModel = mongoose.model('products',productSchema);

/* GET home page. */
router.get('/', async function(req, res, next) {
  let products = await productModel.find().populate("storeId", "username");
  res.json(products);
});

router.get('/storeproducts', async function(req, res, next) {
  const storeId = req.headers["x-user-id"];
  if (!storeId) return res.status(400).json({ message: "Store ID missing" });

  try {
    const products = await productModel.find({ storeId }).populate("storeId", "username");
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ message: "Something went wrong" });
  }
});

//add product
router.post('/',upload.single("image"), async function(req,res,next){
    try{
        const {name,price,category,status,description} = req.body;
        const storeId = req.headers["x-user-id"];
        if (!storeId) return res.status(400).json({ message: "Store ID missing" });

        const newProduct = new productModel({
          name,
          price,
          category,
          status,
          description,
          imageUrl : req.file? req.file.filename: "",
          storeId
        });
        await newProduct.save();
        res.status(201).json({ message: "Product created successfully", product: newProduct });
    }    
    catch(error){
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Something went wrong" });
    }
});

// GET products by storeId
router.get('/productofstore', async function(req, res) {
  const { storeId } = req.query;

  if (!storeId) {
    return res.status(400).json({ message: "Store ID is required" });
  }

  try {
    const products = await productModel.find({ storeId }).populate("storeId", "username");
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

//count number of products
router.get('/countproduct', async function(req,res,next){
    let result = await productModel.countDocuments();
    res.json(result);
});
module.exports = router;
