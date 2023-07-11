import { Router } from "express";

const router = Router();


//usuari@s: es mi login

//registro: es mi sing up
router.get("/api/register", (req, res)=>{
    res.render("api/register");
});
//profile:
router.get("/api/products", (req, res)=>{
    res.render ("api/products" );
});
// mi home:
router.get("/api/home", async(req, res)=>{
    res.render("api/home");

})
export default router;