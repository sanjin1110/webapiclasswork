const express = require('express')//handles and define request in app
const mongoose = require('mongoose')
const books_routes = require('./routes/books-routes.js')
// let books = require('./data/books.js') //import books
// create instance of express
const app = express() 
mongoose.connect('mongodb://127.0.0.1:27017/c30-b')
    .then(() => console.log("connected to mongodb database"))
    .catch((err) => console.log(err))


app.use(express.json())  //server ma aayeko data decode garna/bujhna lai

app.get('/', (req, res)=>{             //req=object of request
    res.send("hello world!")           // path match garyo vani yo chalxa
})        

// app.get('/api/books',(req,res) =>{
//     res.json(books)
// })

app.use('/books',books_routes)                   //middleware use garnalai 

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
app.listen(3000, () =>{
    console.log("server is running on port 3000")
})



// restful rey fieldings

