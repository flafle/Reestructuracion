import cartModel from "../models/cartModel.js";
import productsModel from "../models/productsModel.js";
import ProductsManager from "../managers/productsManager.js";


const productsService= new ProductsManager()

export default class CartsManager{

createCart=()=>{
    return cartModel.create({products:[]})
}
;
getCarts=()=>{
    return cartModel.find().lean().populate("products")
};
//por id
getCartById=(cid)=>{
    return cartModel.findById(cid).lean().populate("products")
};

deleteCart=(cid)=>{
    return cartModel.findByIdAndDelete(cid)
};
//Agregar al carrito
addProductToCart = async (cid, pid) => {
    const product = await productsModel.findById(pid)
  
    if (!product) {
      console.log("No encontró el producto"); 
    } ;
    const cart = await cartModel.findById(cid)
    if (!cart) {
      console.log("carrito no encontrado")
    };
  
    cart.products.push(pid)
  
    await cart.save()
    return cart
  };

};