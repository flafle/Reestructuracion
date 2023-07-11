import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars";

import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/users.router.js";
import ordersRouter from "./routes/orders.router.js";
import categoryRouter from "./routes/categories.router.js";
import MongoStore from "connect-mongo";
import session from "express-session";
import sessionRouter from "./routes/session.routes.js";
import __dirname from "./util.js";

// import initializePassportStrategies from "./config/pasport.config.js";
//Server:
const app = express(); //instancia
const PORT = process.env.PORT||8080;
app.listen(PORT,()=> console.log(`Listening on ${PORT} `));

//Midlewares:
app.use(express.json());//puedo leer peticiones.
app.use(express.urlencoded({extended:true}));//puedo leer de lo que viene de la url
app.use(express.static(`${__dirname}/public`));
app.use(morgan("tiny"));
app.use(cors());
app.use(session({
    secret: "codeSecret",
    resave:false,
    saveUninitialized: false
}));
app.options("*", cors);

//view engines: Handlebars. (vistas)
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname} /views`);
app.set("view engine", "handlebars");


//Para mis vistas:
app.use("/api/home", viewsRouter);
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/categories", categoryRouter);
app.use("/api/orders", ordersRouter)
app.use("/api/session", sessionRouter);




//DataBase:
const conecction = mongoose.connect("mongodb+srv://flex:123Motos@solomotoscluster.ojbrcir.mongodb.net/ecommerce-solo-database?retryWrites=true&w=majority")
.then(()=>{
    console.log("Lista la base de datos!")
})
.catch ((error)=>{
console.log(error)
});
