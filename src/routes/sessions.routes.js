import { Router } from "express";
import passport from 'passport';
import userModel from '../dao/mongo/user.model.js';
// import {createHash, validatePassword } from '../utils.js';

const router = Router();

router.post('/api/register',passport.authenticate('register',{failureRedirect:'/api/sessions/registerFail', failureMessage:true}),async(req,res)=>{
    res.send({status:"success",message:"Registered"});
})

router.get('/registerFail',(req,res)=>{
    console.log(req.session.messages);
    res.status(400).send({status:"error",error:req.session.messages})
})

router.post('/api/login',passport.authenticate('login',{failureRedirect:'/api/sessions/loginFail', failureMessage:true}),async(req,res)=>{
    req.session.user = {
        name: req.user.name,
        role: req.user.role,
        id: req.user.id,
        email: req.user.email
    }
    return res.sendStatus(200);
})
router.get('/loginFail',(req,res)=>{
    console.log(req.session.messages);
    if(req.session.messages.length>4) return res.status(400).send({message:"BLOQUEA LOS INTENTOS YA!!!!!"})
    res.status(400).send({status:"error",error:req.session.messages});
})

//quien autentica:
router.get("/github", passport.authenticate("github"), (req,res)=>{});//dispara el evento de autenticacion
router.get("/githubcallback", passport.authenticate("github"), (req,res)=>{
    
}) //el evento final adonde llega la info.


router.post('/restorePassword',async(req,res)=>{
    const {email, password } = req.body;
    //¿El usuario sí existe?
    const user = await userModel.findOne({email})
    if(!user) return res.status(400).send({status:"error",error:"User doesn't exist"})
    const isSamePassword = await validatePassword(password,user.password);
    if(isSamePassword) return res.status(400).send({status:"error",error:"Cannot replace password with current password"})
    //Ahora sí, actualizamos
    const newHashedPassword = await createHash(password);
    await userModel.updateOne({email},{$set:{password:newHashedPassword}});
    res.sendStatus(200);
})

export default router;