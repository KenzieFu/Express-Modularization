import { UserModel } from "../../schema/users";

const getUsers  = ()=>UserModel.find();
const getUserByEmail = (email:string)=>UserModel.findOne({email});
const getUserrBySessionToken=(sessionToken:string)=>UserModel.findOne({
  "authentication.sessionToken":sessionToken
});
const getUserById = (id:string)=>UserModel.findById(id);
const createUser = (user:Record<string,any>)=>new UserModel(user).save().then(user=>user.toObject());
const deleteUserById = (id:string)=>UserModel.findByIdAndDelete(id);
const updateUserById = (id:string,user:Record<string,any>)=>UserModel.findByIdAndUpdate(id,user,{new:true});

export const UserStore={getUsers,getUserByEmail,getUserrBySessionToken,getUserById,createUser,deleteUserById,updateUserById}