import Express, { Application } from "express"

import {UserStore} from "../store/userStore"
import { Helper } from "../../helpers";

 const register = async(req:Express.Request,res:Express.Response): Promise<void>=>{
  try{

    // retrieving request body aattribute
    const {email,password,username}=req.body;

    if(!email || !password || !username){
      res.sendStatus(400);
      return;
    }

    //check if email exists
    const existingUser = await UserStore.getUserByEmail(email);
    if (existingUser){
      res.sendStatus(400);
      return;
    }

    //create user
    const salt =Helper.random();
    const newUser = await UserStore.createUser({
      email,
      username,
      authentication:{
        password:Helper.authentication(salt,password),
        salt
      }
    });

    res.status(200).json(newUser).end();
    return;

  }catch(error){
    console.log(error);
   res.sendStatus(400);
   return ;
  }
}

const login = async (req:Express.Request,res:Express.Response):Promise<void>=>{
  try{
    const {email,password}=req.body;

    if(!email || !password){
      res.sendStatus(400);
      return;
    }

    const user = await UserStore.getUserByEmail(email).select("+authentication.password +authentication.salt");
    if(!user){
      res.sendStatus(400);
      return;
    }

    if(user.authentication.password !== Helper.authentication(user.authentication.salt,password)){
      res.sendStatus(403);
      return;
    }

    const salt= Helper.random();
    user.authentication.sessionToken=Helper.authentication(salt,user._id.toString())
   await user.save();

   res.cookie("MY-COOKIE",user.authentication.sessionToken,{domain:"localhost",path:"/"});
   res.status(200).json(user).end();
   return;

  }catch(error){
    console.log(error);
    res.sendStatus(400);
    return;
  }
}

const routes= (router:Express.Router): Express.Router=>{

  router.post("/register",register);
  router.post("/login",login);
  return router;
}

export const authController = {routes}
