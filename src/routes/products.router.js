  import { Router } from "express";
  import productModel  from "../dao/mongo/product.model.js";
  


  const router = Router();
  
  //Get .-   //Get-filtrar por categoria: Cuando este vacio me devulve los productos. cuando haya un query , el campo tomara la category y devuelve por categoría

  router.get("/", async (req, res)=>{
    let filter= {};
    if(req.query.categories)
    {
      filter = {category: req.query.categories.split(",")}
    }
    const productList = await productModel.find(filter);
    res.send(productList);;//Despues del .find(), puedo usar --> .select("name image -_id"); //esto en el caso de "filtrar por nombre, image e id por ejemplo"

  });

  //get by id:
  router.get("/:id", async (req, res)=>{
    const product = await productModel.findById(req.params.id).populate("category");
    if(!product){res.status(500).json({message: "El producto no fue encontrado"})}
    res.status(200).send(product);

  });
  
  //post
  router.post("/", async (req, res)=>{
      const { name,image,description, images,stock,category,price } = req.body;
      if(!name||!image||!description||!stock||!category||!price) 
      return res.status(400).send({status:"error", error: "Producto incompleto"} );

  
    //construyo el prod:
    const product = {name, image,description, images, stock,category,price};
    const result = await productModel.create(product); //si va a ser 1 producto.
    res.send({status: "success", payload:result});
});

     //Put:por producto (actualizo)
  router.put("/:id", async (req, res)=>{
    const product = await productModel.findByIdAndUpdate(req.params.id,
      {  name: req.body.name,
        description:req.body.description,
        image:req.body.image,
        images:req.body.images,
        price:req.body.price,
        category:req.body.category,
        stock:req.body.stock
      }, {new:true} 
        );

    if(!product)
    return res.status(400).send("El producto no puede ser actualizado")
    res.send(product);
  } );


       //delete:by Id (desde el user o el cliente). 
  router.delete("/:id", (req, res)=>{
    productModel.findByIdAndRemove(req.params.id).then(product=> {
      if(product) {
        return res.status(200).json({succes: true, message: "El producto se borró"})
       }else {
          return res.status(404).json({success: false, message: "El producto no se borró"})
        }  
      }).catch(error=> {
        return res.status(400).json({ducces: false, error: error});
      });
    
    });




  export default router;