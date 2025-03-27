import path, { join } from "path";
import express from "express";
import {config} from "dotenv";
import router from "./routes/index";
import {get} from "axios";
// @ts-ignore
import { engine } from "express-handlebars";
import { title } from "process";

config();
const port = process.env.PORT || 3000;
const app = express();

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

const publicPaht = join(__dirname,'..','public');
app.use('/assets',express.static(publicPaht));

app.get("/", (req, res) => {
  res.render('inicio',{
    title: "Inicio"
  })
});

app.get("/users", async (req, res) => {
  const url = `${process.env.API_URL}/users`;
  get(url)
    .then((response) => {
  res.render('users', {users: response.data});
}).catch((error) => {
  res.status(400).send(error);
});
});
app.use("/api", router);

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
});

