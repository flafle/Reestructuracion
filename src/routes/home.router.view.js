import { Router }   from "express";
import productsModel from "../dao/mongo/product.model";

const router = Router();

//Get
router.get("/", async (req, res)=>{
    const productsList = await productsModel.find();
    res.send(productsList);
  });

  export default router;