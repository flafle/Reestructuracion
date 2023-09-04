import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import cors from "cors";
import viewsRouter from "./routes/views.router.js"
import handlebars from "express-handlebars";

import productsRouter from "./routes/products.router.js"
import usersRouter from "./routes/users.router.js";
import categoryRouter from "./dao/mongo/category.model.js";
import sessionRouter from "./routes/sessions.routes.js";
import { methods as auth}   from "./controllers/auth.controller.js";


import MongoStore from "connect-mongo";
import session from "express-session";
import passport  from "passport";
import nodemailer from "nodemailer";

import initializePassportStrategies from "./config/passport.config.js";
import __dirname from "./util.js";

//Server:
const app = express(); //instancia
const PORT = process.env.PORT||8080;
app.listen(PORT,()=> console.log(`Listening on ${PORT} `));

app.get('/', function (req, res, next) {
    res.render('home', {layout: false});
});

//Midlewares:
app.use(express.json());//puedo leer peticiones.
app.use(express.urlencoded({extended:true}));//puedo leer de lo que viene de la url
app.use(express.static(`${__dirname}/public`));



//view engines: Handlebars. (vistas)
app.engine("handlebars", handlebars.engine());
app.set("views", `${__dirname}/views`);
app.set("view engine", "handlebars");


app.use(morgan("tiny"));
app.use(cors());
app.use(session({
    store: new MongoStore({
        mongoUrl: "mongodb+srv://flex:123Motos@solomotoscluster.ojbrcir.mongodb.net/ecommerce-solo-database?retryWrites=true&w=majority",
        ttl:20
    }),
    secret: "codeSecret",
    resave:false,
    saveUninitialized: false
}));
// app.options("*", cors);

app.use(passport.initialize());
initializePassportStrategies();



//Para mis vistas:
app.use("/api/products", productsRouter);
app.use("/api/users", usersRouter);
app.use("/api/sessions", sessionRouter);
app.use("/", viewsRouter);

app.post("register", auth.register);
app.post("api/login", auth.login)
 // Create socket.io server instance.



//DataBase:
const conecction = mongoose.connect("mongodb+srv://flex:123Motos@solomotoscluster.ojbrcir.mongodb.net/ecommerce-solo-database?retryWrites=true&w=majority")
.then(()=>{
    console.log("Lista la base de datos!")
})
.catch ((error)=>{
console.log(error)
});
