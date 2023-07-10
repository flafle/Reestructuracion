import mongoose from "mongoose";

//coleccion
const collection = "productos";


//schema
const schema= new mongoose.Schema({
    name: String,
    description: String,
    image: String,
    images: String,
    price: Number,
    category: String,
    stock: Number
});

//creo el model
const productModel = mongoose.model(collection, schema);

export default productModel;