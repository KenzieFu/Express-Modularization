import crypto from 'crypto';
import { SECRET } from '../secret/constant';

export const random = ()=>{
  return crypto.randomBytes(16).toString("base64");
}

export const authentication=(salt:string,password:string)=>{
  return crypto.createHmac("sha256",[salt,password].join("/")).update(SECRET).digest("hex")
}

export const Helper = {random,authentication}