import { Router }   from "express";
import loginModel from "../models/login.model.js";

const router = Router();

//Get
router.get("/", async (req, res)=>{
    const login = await loginModel.find();
    res.send(login);
  });

  export default router;