import * as express from 'express';
import {Request,Response} from 'express';

import * as jwt from 'jsonwebtoken';

const app:express.Application = express();
app.use(express.json());
app.listen(8080);
console.log('Server is started');

// jwt secret token
app.set('secretKey', 'nodeRestApi'); 

// Bcrypt SaltRound
app.set('saltRounds', 10);

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
            jwt.verify(token,req.app.get('secretKey'), (err: any,decoded: any) => {
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
//const DataRouter = require('./api/api-user-login');
//app.use('/auth',new DataRouter().dataRouter);

export {app}