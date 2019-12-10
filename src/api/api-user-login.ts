import {Request,Response,Router} from 'express';
const expressRouter = Router();
import {config} from '../config';
import * as bcrypt from 'bcrypt';
import {Database} from '../models/database';
//import {ObjectID} from 'mongodb';

// Validations Middleware
import {ValidationLogin,ValidationErrorHandlder} from '../middleware';

export class ApiLoginSignup{
    dataRouter:any; 
    constructor(){
        this.dataRouter = expressRouter;

        this.dataRouter.post("/signup", 
        ValidationLogin.signupValidator(), 
        ValidationErrorHandlder.handleErrors, 
        async (req:Request, res:Response) => {

            let dat = req.body;
            dat.password = bcrypt.hashSync(dat.password, config.get('bcryptSaltRounds'));
            dat.created_at = new Date();

            const writeParams = {
                collection      : "users",
                criteria        : dat,
                projection      : {}
            }
            try{
                const docs = await new Database().write(writeParams);
                res.send(docs)
            } catch(e){
                console.error(`${e.message}-${e.stack}`)
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        });

    }
}