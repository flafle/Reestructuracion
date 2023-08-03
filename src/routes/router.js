import { Router } from "express";
export default class BaseRouter {
 
    constructor (){
        this.router = Router();
        this.init();
    };
    getRouter(){ //para acceder al router de express desde fuera.
        return this.router;

    }
    init(){ }// esto es por herencia.

    get(path,...callbacks){
        this.router.get(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    post(path,...callbacks){
        this.router.post(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    put(path,...callbacks){
        this.router.put(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
    }
    delete(path,...callbacks){
        this.router.delete(path,this.generateCustomResponses,this.applyCallbacks(callbacks))
       
    }


    

generateCustomResponses = (req,res,next) =>{
    res.sendSuccess = message => res.send({status: "success", message})
    res.sendSuccessWithPayload = payload => res.send({status:"success", payload})
    netx();
}




    applyCallbacks(callbacks){
        return callbacks.map(callback=>async(...params)=>{
            try{
                await callback.apply(this,params);
        }catch(error){
            (req,res,next)
            params[1].status(500).send(error);//esto permite que mi server nunca se caiga.
        }
        });
    };
};