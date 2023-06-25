const app = require('../app')
const mongoose = require('mongoose')
const supertest = require('supertest')


const api = supertest(app) //can send http requests and create fake internal networks


test('test of root api', async()=>{
   const res = await api.get('/')
   // console.log(res)
   expect(res.statusCode).toBe(200)
   expect(res.text).toBe('hello world!')
})

afterAll(async()=>{
   mongoose.connection.close()
})






































