import mongoose from "mongoose";

//coleccion
const collection = "login";


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
const loginModel = mongoose.model(collection, schema);

export default loginModel;
