import mongoose from "mongoose";

//coleccion
const collection = "ordenes";


//schema
const schema= new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    stock: Number,
    category: String,
    price: Number
});

//creo el model
const orderModel = mongoose.model(collection, schema);

export default orderModel;
