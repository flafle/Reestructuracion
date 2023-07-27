import { Router } from "express";
import cartModel from "../dao/mongo/cart.model.js";


const router= Router();


//Get
router.get("/", async (req, res)=>{
    const cartList = await  cartModel.find();
    res.send( cartList);
  });

  //para encontrar :
  router.get("/:id", async (req, res)=>{
    const cart = await  cartModel.findById(req.params.id);
    if(!cart){res.status(500).json({message: "el carrito no fue encontrado"})}
    res.status(200).send(cart);
    });





  //delete:by Id (desde el user o el cliente). 
  router.delete("/:id", (req, res)=>{
    cartModel.findByIdAndRemove(req.params.id).then(cart=> {
      if(cart) {
        return res.status(200).json({succes: true, message: "el carrito se eliminó"})
       }else {
          return res.status(404).json({success: false, message: "el cart no fue encontrado o eliminado"})
        }  
      }).catch(error=> {
        return res.status(400).json({ducces: false, error: error});
        
      });
    
    });



 

export default router;