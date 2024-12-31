import Express from "express";
import Http from "http";
import BodyParser from "body-parser";
import CookieParser from "cookie-parser";
import Cors from "cors";
import Compression from "compression";
import { mongoConnect } from "./database/database";
import router from "./router/index";

const app = Express();


app.use(Cors({
  credentials: true,
}))

app.use(Compression());
app.use(BodyParser.json());
app.use(CookieParser())

const server = Http.createServer(app);

server.listen(8080,()=>{
  console.log("Server is running on port 8080");

})

app.use("/api",router());

//mongo db connection
const mongo=mongoConnect();
