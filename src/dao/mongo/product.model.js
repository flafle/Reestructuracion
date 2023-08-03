import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

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
    stock: Number,
    code: Number
}, 
{ timestamps: { createdAt: "created_at", updatedAt: "updated_at" } });

schema.plugin(mongoosePaginate);

//creo el model
const productModel = mongoose.model(collection, schema);

export default productModel;