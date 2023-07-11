 import { Router } from "express";
import userModel from "../models/user.model.js"
import bcrypt from "bcrypt";


const router = Router();



router.get("/", async (req, res)=>{
   const userList = await userModel.find().select("-passwordHash");

   if(!userList){
      res.status(500).json({success: false})
      }
      res.send(userList);
});
//buscar al user por id:
router.get("/:id", async (req, res)=>{
   const user = await userModel.findById(req.params.id).select("-passwordHash");
   if(!user){res.status(500).json({message: "El user no fue encontrado"})}
   res.status(200).send(user);

 });

 router.post ("/login", async (req, res)=>{
   //primero si existe:
   const user = await userModel.findOne({email:req.body.email})
   if(!user){
      return res.status(400).send ("El user no fué encontrado")
   }
   //si me aseguro que esta en mi database, continuo:
   if(user && bcrypt.compareSync(req.body.password, user.passwordHash)){
     res.status(200).send("User autentificado")
   } else {
      res.status(400).send("password esta mal")
   }
   return res.status(200).send(user);
 });
 



 //post:
 router.post("/", async (req, res)=>{
   const { name,email,passwordHash,phone,isAdmin,street,city,zip } = req.body;
   if(!name||!email||!passwordHash||!phone||!isAdmin||!street||!city||!zip) 
   return res.status(400).send({status:"error", error: "User incompleto"} );

  //construyo el user:
  const user = {name,email,passwordHash,phone,isAdmin,street,city,zip };
  const result = await userModel.create(user); 
  res.send({status: "success", payload:result});
 });
 

router.put("/", (req, res)=>{

});

router.delete("/", (req, res)=>{

});
export default router;
//me falta cambiar la arquitectura:
//router.get("/", users.controller.getUsers);