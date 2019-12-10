import * as express from 'express';
import {Request,Response} from 'express';
import * as jwt from 'jsonwebtoken';
import {config} from './config';

const app:express.Application = express();
app.use(express.json());
app.listen(8080);
console.log('Server is started');

app.get('/', (req:Request, res:Response)=>{
    res.send('Hello World');
})

// Token Verification code
app.all("/api/*", (req,res,next) => {
    try{
        const token = req.header("token");
        if(!token){
            res.status(403).send('Token not present');
        } else {
            jwt.verify(token,config.get('jwtSecretKey'), (err: any,decoded: any) => {
                if(!err){
                    next();
                } else {
                    res.status(500).send('Invalid Token');
                }
            })
        }
    } catch(e){
        throw(e);
    }
})

import {ApiLoginSignup} from './api/api-user-login';
app.use('/auth', new ApiLoginSignup().dataRouter);
export {app}