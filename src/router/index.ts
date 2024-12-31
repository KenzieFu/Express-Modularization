import  Express from "express";
import { authController } from "../service/controller/authController";
import { userController } from "../service/controller/userController";

const router = Express.Router();

export default():Express.Router=>{
  authController.routes(router)
  userController.routes(router)
  return router;
}