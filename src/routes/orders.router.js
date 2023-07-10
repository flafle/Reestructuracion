import { Router } from "express";
import ordersModel  from "../models/order.model.js";

 const router = Router();

 

 router.get("/", async (req, res)=>{
    const orderList = await ordersModel.find();
    res.send(orderList);
  });

export default router;