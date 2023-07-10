import { Router } from "express";

const router = Router();

// mi home:
router.get("/", async(req, res)=>{
    res.render("home");

})
//usuari@s: es mi login

//registro: es mi sing up
router.get("/api/register", (req, res)=>{
    res.render("api/register");
});
//profile:
router.get("products", (req, res)=>{
    res.render ("products" );
});

export default router;