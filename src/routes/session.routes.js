import { Router } from "express";
import session from "express-session";

const router = Router()
router.get("/", async (req, res)=>{
    req.session.user = {usuario:true}
    res.send("Ok")
});

export default router;