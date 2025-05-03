var express = require('express');
var router = express.Router();

const orderModel = require('../models/OrderModel');


/* get orders of a user */
router.get('/', async function(req, res, next) {
    const userId = req.headers['x-user-id'];
  const result = await orderModel.find({ customerId: userId });
  res.json(result);
});
// get orders of a store
router.get('/storeorder', async function(req, res, next) {
    const storeId = req.headers['x-user-id']; // use 'x-user-id' if you're storing store user ID here

    if (!storeId) {
        return res.status(400).json({ error: "Missing x-user-id header" });
    }

    try {
        const result = await orderModel.find({ store: storeId });
        res.json(result);
    } catch (error) {
        console.error("Error fetching store orders:", error);
        res.status(500).json({ error: "Failed to fetch store orders" });
    }
});
//add orders
router.post('/', async function(req,res,next){
    try{
        const{name,customer,customerId,store,storename,price,status} = req.body;
        const newOrder = new orderModel({
            name,
            customer,
            customerId,
            store,
            storename,
            price,
            status: {
                customer: status?.customer || "Order Sent",
                store: status?.store
            }       
          });
          await newOrder.save();
          res.status(201).json({ message: "Order created successfully", order: newOrder});
    }
    catch(error){
        console.error("Error saving order:", error);
        res.status(500).json({ error: "Failed to save order" });
    }
});
//update customer status
router.patch('/updatecustomerstatus/:id', async function(req,res,next){
    const {role,newStatus} = req.body;
    const {id} = req.params;
    const updateField = `status.${role}`;
    try{
        const updated = await orderModel.findByIdAndUpdate(id,
            {$set:{[updateField]:newStatus}},
            {new:true}
        );
        res.json(updated);
    }
    catch(error){
        res.status(500).json({ error: "Failed to update order status" });
    }
});
//update store status
router.patch('/updatestorestatus/:id',async function(req,res,next){
    const {role,storeStatus} = req.body;
    const {id} = req.params;
    const updateField = `status.${role}`;
    try{
         const updated = await orderModel.findByIdAndUpdate(id,
            {$set:{[updateField]:storeStatus}},
            {new:true}
        );
        res.json(updated);
    }
    catch(error){
         res.status(500).json({ error: "Failed to update order status" });
    }
});
//count orders
router.get('/countorders',async function(req,res,next){
    let result = await orderModel.countDocuments();
    res.json(result);
});

module.exports = router;
