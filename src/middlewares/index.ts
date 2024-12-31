

import {Request,Response,NextFunction} from 'express';
import { SECRET } from '../secret/constant';
import { UserStore } from '../service/store/userStore';
import { identity, merge } from 'lodash';

export const isAuthenticated = async(req:Request,res:Response,next:NextFunction)=>{
  const token = req.cookies["MY-COOKIE"];
  if(!token){
    res.sendStatus(401);
    return;
  }
  try{
    const getSession = await UserStore.getUserrBySessionToken(token);
   
    if(!getSession){
      res.sendStatus(403);
      return;
    }

    merge(req,{identity:getSession})
    return next();

  }catch(error){
    res.sendStatus(401);
    return;
  }
}