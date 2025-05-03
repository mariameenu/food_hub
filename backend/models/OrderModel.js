const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    name: String,
    customer: String, // Still storing username for display
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    store: String,
    storename: String,
    price: Number,
    status: {
        customer: { type: String, default: "Order Sent" },
        store: { type: String, default: "Got Order"}
    }
},{timestamps:true});

const orderModel = mongoose.model('orders',orderSchema);

module.exports = orderModel;
