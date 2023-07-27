 import { Router } from "express";
import userModel from "../dao/mongo/user.model.js"
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
 
 router.post("/", async (req, res)=>{
   const { name,icon,color } = req.body;
   if(!name||!icon||!color) 
   return res.status(400).send({status:"error", error: "Categoría incompleta"} );

  //construyo la categoria:
  const category = { name,icon,color };
  const result = await categoryModel.create(category); 
  res.send({status: "success", payload:result});
 });
 


 //actualizo by id
 router.put("/:id", async (req, res)=>{
   const category = await userModel.findByIdAndUpdate(req.params.id,
     { name: req.body.name,
       icon:req.body.icon,
       color: req.body.color},
       { new:true} 
   );
   if(!category)
   return res.status(400).send("la categoría no puede ser actualizada")
   res.send(category);
 } );


 //borro desde el id 
 router.delete("/:id", (req, res)=>{
   userModel.findByIdAndRemove(req.params.id).then(user=> {
     if(user) {
       return res.status(200).json({succes: true, message: "user se borró"})
      }else {
         return res.status(404).json({success: false, message: "user no se borró o no fue encontrado"})
       }  
     }).catch(error=> {
       return res.status(400).json({ducces: false, error: error});
       
     });
   
   });


export default router;
