import { Router } from "express";


const router = Router();


//registro: es mi sing up
router.get("/", async(req,res)=>{
    res.render("/api/home", {
        css:"home"
    });
    
});

//registro: es mi sing up
router.get("/register", (req, res)=>{
    res.render("register");
});
//profile:
router.get("/profile", (req, res)=>{
    res.render ("/profile",{
        user:req.session.user
    } );
});


export default router;