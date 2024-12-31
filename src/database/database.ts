import mongoose from "mongoose";
import { MONGO_URL_LOCAL } from "./constant";

mongoose.Promise=Promise;

export const mongoConnect = async()=>{
  mongoose.connect(MONGO_URL_LOCAL)
  console.log("Connected to database")
  mongoose.connection.on("error",(error:Error)=>console.log("Error connecting to database",error))
  return mongoose;
}