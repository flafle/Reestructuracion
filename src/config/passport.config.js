import {  Strategy, ExtractJwt } from "passport-jwt";
import local from "passport-local";
import passport from "passport";

import { userService } from "../managers/indexManager.js";
import { disconnect } from "mongoose";


const LocalStrategy = local.Strategy;
const JWTStrategy = Strategy;

const initializePassportStrategies = () => {
    passport.use("register", new LocalStrategy({passReqToCallback:true, usernameField:"email"}, async(req,email,password, done)=>{

        try{
            const {firstName, lastName, role} =req.body;
            const exists = await userService.getUserby({email});
            if(exists)
            return done(null, false, {message: "ya registrado"});
            const hashedPassword = await createHash(password);
            const newUser = {
                name: `${firstName} ${lastName}`,
               email,
               role,
               password:hashedPassword
            };
            const result = await userService.createUser(newUser)
            return done(null, result)

        } catch (error){
            return done(error);

        }
    }));
//estrategia de login:

passport,use("login", new LocalStrategy({usernameField: "email"}, async(email, password)=>{
    let resultUser;
    try{
        if(email=== "admin@admin.com"&&password==="321"){
            //roles.
            resultUser = {
                name: "admin",
                id:0,
                role: "supervisor"
            }
            return done(null, resultUser)
        }
        const user = await userService.getUserby({email})
        if(!user) return done(null, false, {message: "No encontrado"})
    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) return done(null, false, {message:"pase Incorrecto"});
    resultUser = {
        //este deberia de coincidir con el admin
        name: user.name,
        id: user_id,
        role:user.role
    }
    } catch (error) {
        return done (error);
    }
}) );

passport.use ("jwt")
}

export default initializePassportStrategies;