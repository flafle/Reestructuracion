import mongoose from "mongoose";

//coleccion
const collection = "categorias";


//schema
const schema= new mongoose.Schema({
       name: String,
       icon: String,
       color:String
    });

//creo el model
const categoryModel = mongoose.model(collection, schema);

export default categoryModel;