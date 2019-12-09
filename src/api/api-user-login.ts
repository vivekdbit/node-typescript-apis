import {Request,Response,Router} from 'express';
const expressRouter = Router();
//import * as jwt from 'jsonwebtoken';
//import * as bcrypt from 'bcrypt';
//import {app} from '../../src/app'
import {Database} from '../models/database';
//import {ObjectID} from 'mongodb';

// Validations Middleware
//const {ValidationLogin,validationErrorHandler} = require("../middleware")

export class ApiLoginSignup{
    dataRouter:any; 
    constructor(){
        this.dataRouter = expressRouter;

        this.dataRouter.post("/signup", 
        //ValidationLogin.signupValidator(), 
        //validationErrorHandler.handleErrors, 
        async (req:Request, res:Response) => {

            let dat = req.body;
            //dat.password = bcrypt.hashSync(dat.password, app.get('saltRounds'));
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