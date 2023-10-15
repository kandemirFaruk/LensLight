import express from "express";
import dotenv from "dotenv"
import conn from "./db.js"
import pageRoute from "./routers/pageRoute.js"

dotenv.config()
//Connection to the DB
conn()
const app = express();
const port = process.env.PORT

//EJS template engine
app.set("view engine", "ejs");

//Static files middleware (Ara yazılım)
app.use(express.static("public"));

//Routers
app.use("/",pageRoute)


app.listen(port, () => {
  console.log(`Sunucu ${port} Port'unda Çalışmaya Başladı..`);
});


