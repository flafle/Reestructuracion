

import { Router } from "express";
// import CartsManager from "../managers/cartManager.js";


const router= Router();
// const cartServices= new CartsManager();


// Obtengo todos los carritos
router.get('/',async (req, res) => {
  try{
    const carts = await cartServices.getCarts();
    res.send({status: 'success', payload: carts})
  }
   catch(error){
    console.log(error)
   }
  });
  
  // Obtengo un carrito por ID
  router.get('/:cid', async (req, res) => {
    try{
      const  cid = req.params.cid;
      const cart = await cartServices.getCartById(cid);

  
      res.send({status: 'success', payload: cart})
    }
   catch(error){
    console.log(error)
   }
  });
  
  //nuevo carrito
  router.post('/', async (req, res) => {
    try{
      const {cart}= req.body
     
      const newCart= await cartServices.createCart(cart)
      
      res.send({status: 'success', payload: newCart})
    }
  catch(error){
    console.log(error)
  }
  });
  
  // Agrego 

  router.put('/:cid/product/:pid',async (req, res) => {
    try{
      const cid = req.params.cid;
      const pid= req.params.pid;
      const cart = await  cartServices.addProductToCart(cid, pid);
      console.log(JSON.stringify(cart,null, '\t'))
      res.send({status: 'success', payload:cart })
      
    }
    catch(error){
      console.log(error)
    }
  });
  
  // Elimina
  router.delete('/:cid/:pid',async (req, res) => {
    try{
      const { cid, pid } = req.params;
      const cart = cartServices.deleteProductToCart(cid, pid);
      res.send({status: 'success', payload: cart})
    }
    catch(error){
      console.log(error)
    }
  });
  
  // Eliminar  por ID
  router.delete('/carts/:id',async (req, res) => {
    try{
      const { id } = req.params;
      const cart = cartServices.deleteCart(id);
      res.send({status: 'success', payload: cart})
    }
  catch(error){
    console.log(error)
  }
  });


  export default router;

