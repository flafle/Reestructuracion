import { Router } from "express";


const router = Router();


//registro: es mi sing up
router.get("/", async(req,res)=>{
    res.render("/api/home", {
        css:"home"
    });
    
});

//registro: es mi sing up
router.get("/register", async (req, res)=>{
    res.render("register",{
        css:"register"
    });


});

//profile:
router.get("/profile",async (req, res)=>{
    res.render ("profile",{
        user:req.session.user
    });

});

    //login:
    router.get("/login", async(req, res)=>{
        res.render("login",{
            css:"login"
        });

});
    //product:
    router.get("/products",async (req, res)=>{
        res.render("products",{
            css:"products"
        });
});    
        
   //users:
   router.get("/users", async(req, res)=>{
    res.render("/api/users", {
           css: "users"
       });

});
    




export default router;