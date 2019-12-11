import * as request from 'supertest'
import {app} from '../../src/app'

describe("API Specs Test Suite", ()=>{

    test("/GET /Login should return login user details", async done=>{
        const response = await request(app).get("/auth/login").send({
            "email" : "vivek001@kissht.com",
            "password" : "12345"
        })
        const {status,body} = response
        expect(status).toEqual(200)
        done()
    })

    test("/POST /Signup should create user", async done=>{
        const response = await request(app).post("/auth/signup").send({
            "first_name" : "Vivek",
            "last_name"	 : "R",
            "email"		 : "vivek@dbit.com",
            "mobile"	 : "9867000000",
            "password"	: "12345"
        })
        const {status,body} = response
        console.error(body)
        expect(status).toEqual(200)
        done()
    })

});