import {Request,Response,Router} from 'express';
const expressRouter = Router();
import {config} from '../config';
import * as bcrypt from 'bcrypt';
import {Database} from '../models/database';
import * as jwt from 'jsonwebtoken';
//import {ObjectID} from 'mongodb';

// Validations Middleware
import {ValidationLogin,ValidationErrorHandlder} from '../middleware';

export class ApiLoginSignup{
    dataRouter:any; 
    constructor(){
        this.dataRouter = expressRouter;

        this.dataRouter.get("/login",
        ValidationLogin.loginValidator(), 
        ValidationErrorHandlder.handleErrors, 
        async (req:Request, res:Response) => {            
            const readParams = {
                collection : 'users',
                criteria : { 'email': req.body.email},
                projection : {}
            }
            try{
                const docs: any = await new Database().readOne(readParams);
                if(docs !== null){
                    if(bcrypt.compareSync(req.body.password, docs.password)) {
                        
                        const token = jwt.sign( { email : docs.email },
                                                config.get('jwtSecretKey'), 
                                                { expiresIn: '1h' });

                        return res.send({
                            status : true,
                            message : "User details found",
                            data : {
                                user : docs,
                                token : token
                            }
                        });

                    } else {
                        return res.send({
                            status : false, 
                            message : "Invalid Mobile/password!!!", 
                            data : null
                        });
                    }

                } else {
                    return res.send({
                        status : false,
                        message : "User not found!..",
                        data : null
                    });
                }
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        })

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
                const docs: any = await new Database().write(writeParams);
                res.send(docs)
            } catch(e){
                res.status(500).send(`${e.message}-${e.stack}`);
            }
        });

    }
}