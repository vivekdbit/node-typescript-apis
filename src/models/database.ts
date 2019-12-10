import {MongoClient} from 'mongodb';

export class Database {

    client:MongoClient;
    db:string;

    constructor(){
        const url = 'mongodb://localhost:27017';
        this.client = new MongoClient(url, { useNewUrlParser: true })
        this.db = "employeedb"
    }

    async write(writeParams:any) {
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(writeParams.collection);
            const docs = await collection.insertOne(writeParams.criteria,writeParams.projection);
            return docs;
        } catch (e){
            throw e;
        }
    }

    async readOne(readParams:any){
        try{
            const conn = await this.client.connect();
            const db = conn.db(this.db);
            const collection = db.collection(readParams.collection);
            const docs = await collection
                               .findOne(readParams.criteria,readParams.projection);
            return docs;
        } catch (e){
            throw e;
        }
    }

}