import {Database} from './database';

export class Users{

    async findByEmail(email:any){
        try{
            const readParams = {
                collection      : "users",
                criteria        : {"email" : email},
            }
            const docs = await new Database().readOne(readParams);
            if(docs !== null){
                return docs;
            } else {
                return false;
            }
        } catch(e){
            throw(e);
        }
    }
}