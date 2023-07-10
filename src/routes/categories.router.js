import { Router }   from "express";
import categoryModel from "../models/category.model.js";

const router = Router();

//Get
router.get("/", async (req, res)=>{
    const categoryList = await categoryModel.find();
    res.send(categoryList);
  });

  //para encontrar por categoría:
  router.get("/:id", async (req, res)=>{
    const category = await categoryModel.findById(req.params.id);
    if(!category){res.status(500).json({message: "la categoría no fue encontrada"})}
    res.status(200).send(category);
    });

  //post:
  router.post("/", async (req, res)=>{
    const { name,icon,color } = req.body;
    if(!name||!icon||!color) 
    return res.status(400).send({status:"error", error: "Categoría incompleta"} );

   //construyo la categoria:
   const category = { name,icon,color };
   const result = await categoryModel.create(category); 
   res.send({status: "success", payload:result});
  });
  


  //put: by id
  router.put("/:id", async (req, res)=>{
    const category = await categoryModel.findByIdAndUpdate(req.params.id,
      { name: req.body.name,
        icon:req.body.icon,
        color: req.body.color},
        { new:true} //esto significa que en postman cada vez que actualizaba, me mostraba la info antigua(en la consola, en la lista total se actualizaba al instante). Ahora le digo que quiero verla en lo inmediato.
    );
    if(!category)
    return res.status(400).send("la categoría no puede ser actualizada")
    res.send(category);
  } );


  //delete:by Id (desde el user o el cliente). 
  router.delete("/:id", (req, res)=>{
    categoryModel.findByIdAndRemove(req.params.id).then(category=> {
      if(category) {
        return res.status(200).json({succes: true, message: "la categoría se borró"})
       }else {
          return res.status(404).json({success: false, message: "Categoría no se borró o no fue encontrada"})
        }  
      }).catch(error=> {
        return res.status(400).json({ducces: false, error: error});
        
      });
    
    });



 
export default router;