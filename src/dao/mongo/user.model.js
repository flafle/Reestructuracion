import mongoose from "mongoose";


//coleccion
const collection = "users";

//schema
const schema= new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required:true
    },
   
    passwordHash:  {
        type:String,
        required:true
    },
    phone:{
        type: Number,
        required:true
    },
   isAdmin: {
    type: Boolean,
    default:false
   },
   street:{
    type:String,
    default: ""
   },
   city:{
    type: String,
    required:true,

},
    zip: {
        type:String,
        default:""
    }

   
});

//creo el model
const userModel = mongoose.model(collection, schema);

export default userModel;