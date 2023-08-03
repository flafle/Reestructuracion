import cartModel from "../models/cartModel.js";
import cartModel from "../mongo/cart.model.js";



export default class CartsManager{
  getCarts=(params)=>{
    return cartModel.find(params).lean()
};

//por id
getCartById=(params) => {
    return cartModel.findById(params)
};


createCart=(cart) => {
    return cartModel.create(cart)
};



addProductToCart = async (pid, cid, quantity) => {
  try {
    let cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("No se puede agregar.");
    }
    const productExist = cart.products.findIndex(
      (product) => product.product._id.toString() === pid
      );
    if (productExist !== -1) {
      if (quantity) {
        cart.products[productExist].quantity = quantity;
      } else {
      cart.products[productExist].quantity += 1;
    }
  } else {
    if (quantity) {
      cart.products.push({ product: pid, quantity: quantity });
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }
    }
    cart = await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

//borrar un prodcuto del cart
deleteProductToCart = async (cid, pid) => {
  try {
    let cart = await cartModel.findById(cid);
    if (!cart) {
      throw new Error("Carrito no encontrado");
    }
    const productExist = cart.products.findIndex(
      (product) => product.product._id.toString() === pid
    );
    if (productExist !== -1) {
      cart.products.splice(productExist, 1);
    } else {
      throw new Error("El producto no fue encontrado.");
    }
    cart = await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

deleteCart = async (cid) => {
  try {
    const borrar = await cartModel.findByIdAndDelete(cid);

    if (!borrar) {
      throw new Error("No se puedo borrar.");
    }

    return borrar;
  } catch (error) {
    throw new Error(error.message);
  }
};

};