import * as request from 'supertest'
import {app} from '../../src/app'

describe("API Specs Test Suite", ()=>{

    test("/POST /Signup should create user", async done=>{
        const response = await request(app).post("/auth/signup").send({
            "first_name" : "Vivek",
            "last_name"	 : "R",
            "email"		 : "vive31@ras.com",
            "mobile"	 : "9867254450",
            "password"	: "12345"
        })
        const {status,body} = response
        console.error(body)
        expect(status).toEqual(200)
        done()
    })

});