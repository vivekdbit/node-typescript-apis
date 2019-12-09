import * as request from 'supertest'
import {app} from '../../src/app'

describe("API Specs Test Suite", ()=>{

    test("/POST /Signup should create user", async done=>{
        const response = await request(app).post("/auth/signup").send({
            "first_name" : "vivek 1",
            "last_name"	 : "R 1",
            "email"		 : "vivek13ss33@r.com",
            "mobile"	 : "9867254452",
            "password"	: "12345"
        })
        const {status,body} = response
        console.error(body)
        expect(status).toEqual(200)
        done()
    })

});