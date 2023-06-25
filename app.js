require('dotenv').config()
const express = require('express')//handles and define request in app
const mongoose = require('mongoose')
const books_routes = require('./routes/books-routes.js')
const users_routes = require('./routes/user-routes')
const { verifyUser } = require('./middlewares/auth')
const upload = require('./middlewares/upload')

// let books = require('./data/books.js') //import books
const MONGODB_URI = process.env.NODE_ENV === "test" ? process.env.TEST_DB_URI : process.env.DB_URI
console.log(MONGODB_URI)
mongoose.connect(MONGODB_URI)
    .then(() => console.log("connected to mongodb database"))
    .catch((err) => console.log(err))

// create instance of express
const app = express(MONGODB_URI) 

app.use(express.json())  //server ma aayeko data decode garna/bujhna lai
app.use(express.static('public'))  //static access public folder lai deko


app.get('/', (req, res)=>{             //req=object of request
    res.send("hello world!")           // path match garyo vani yo chalxa
})        

// app.get('/api/books',(req,res) =>{
//     res.json(books)
// })
// app.use(verifyUser)
app.use('/users',users_routes)

app.use('/books', verifyUser, books_routes) //middleware use garnalai 

app.post('/images',upload.single('photo'),(req,res)=>{
    res.json(req.file)
})

//error handling middleware
app.use((err,req,res,next)=>{
    console.error(err)
    if(err.name==='CastError'){
        res.status(400)
    }
    else if(err.name==="ValidationError"){
        res.status(400)
    }
    res.json({error: err.message})
})

//UNknown path handling middleware
app.use((req,res)=>{
    res.status(404).json({error:'path not found'})
})
// port num to host app
// app.listen(3000, () =>{
//     console.log("server is running on port 3000")
// })



// restful rey fieldings

module.exports = app