const supertest=require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User= require('../models/User')
const api = supertest(app)

beforeAll(async ()=>{
    await User.deleteMany({})
})
test('user registration',async () => {
    // const res = await api.post('/users/register')
    await api.post('/users/register')

    .send({
        username:"testuser12435",
        password: "sanjin",
        email:"test2@gmail.com",
        fullname:"Test User"

    }).expect(201)
    // expect(res.statusCode).toBe(201)
})


test('duplicate username cannot be registered',async()=>{
    res = await api.post('/users/register')
    .send({
        username:"testuser12435",
        password: "sanjin",
        email:"test2@gmail.com",
        fullname:"Test User"
    }).expect(400)
    console.log(res.body)
    expect(res.body.error).toBeDefined()
    expect(res.body.error).toMatch(/already registered/)
})

describe('user login test',  ()=>{
    test('user logged in',async()=>{
        res = await api.post('/users/login')
        .send({
            username:"testuser12435",
            password: "sanjin"
           
        }).expect(200)
    })
})

test('missing email cannot be registered',async()=>{
    res = await api.post('/users/register')
    .send({
        username:"testuser125",
        password: "sanjin",
        fullname:"Test User",
    }).expect(400)
    expect(res.body.error).toBeDefined()

    expect(res.body.error).toMatch(/validation failed/)

})












afterAll(async()=>{
    mongoose.connection.close()
 })