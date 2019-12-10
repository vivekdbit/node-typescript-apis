import {validationResult} from 'express-validator';
import {Request,Response,NextFunction} from 'express';

export class ValidationErrorHandlder {
  
    static handleErrors(req:Request, res:Response, next:NextFunction) {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
             res.status(422).json({errors: errors.mapped()});
        } else {
          next();
        }
    }
}