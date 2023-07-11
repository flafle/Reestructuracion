import mongoose from "mongoose";

const collection= "Carrito"

const schema = new mongoose.Schema({
   products:[
    {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Products'
    }
   ],
    totalAmount:{
        type:Number,
        default: 0
    },
    default: [],

   },{timestamps:{createdAt: 'created_at', updatedAt: 'updated_at'}}
 );

const cartModel= mongoose.model(collection,schema);


export default cartModel;
