
import { Request, Response,Router } from 'express';
import { UserStore } from '../../service/store/userStore';
import { isAuthenticated } from '../../middlewares';
const getAllUsers = async(req: Request, res: Response) => {

  try{
    const users = await UserStore.getUsers();
    res.status(200).json(users).end();
    return 
  }catch(error){
    console.log(error);
    res.sendStatus(400);
    return
  }
}


const routes = (router: Router):Router => {
    router.get("/users",isAuthenticated,getAllUsers);
    return router

}


export const userController = {routes}