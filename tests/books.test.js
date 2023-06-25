const supertest= require('supertest')
const app = require('../app')
const mongoose = require('mongoose')
const User = require('../models/User')

const api = supertest(app)
let registeredUser = null

beforeAll(async()=>{
    await User.deleteMany({})
    res = await api.post('/users/register')
    .send({
        username:"testasUser",
        password:"test123",
        email:"testas@gmail.com",
        fullname:"test user"
    })
    registeredUser = res.body

    login = await api.post('/users/login')
    .send({
        username:"testasUser",
        password:"test123"
    })
    registeredUser.token = login.body.token

    console.log(registeredUser)
    
})


describe('books route test',() =>{
    test('unouthorized user cannot get all books',async ()=>{

        await api.get('/books').expect(401)
    })
    
    test('registered user can add book ', async ()=>{
        await api.post('/books')
        .send({
           title:"testBook",
           author:"testAuthor" 
        })
        .set('authorization',`bearer ${registeredUser.token}`)
        .expect(201)
    })

})


afterAll(async ()=>{
    mongoose.connection.close()
 })