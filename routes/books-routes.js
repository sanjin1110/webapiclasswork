const express = require('express')
const uuid =require('uuid')
const router = express.Router()
const Book = require('../models/Book')
let books = require('../data/books.js') //import books

router.route('/')
    .get((req,res)=> {
        Book.find()  //using promises
            // .then((boks)=>{res.json(books)})   data folder bata data lina ko lagi
            .then((books)=>{res.json(books)})  // post gare paxi matra data aauxa 
            .catch(e=>console.log(e))
        // res.json(books)

        // using async await == get(async(req,res)
        // try{
        //     const boos = await Book.find()
        //     res.json(books)
        // }
        // catch(err){
        //     console.log(err)
        // }
        
    })
    .post((req,res)=>{
        Book.create(req.body)
            .then((book) => {
                res.status(201).json(book)
            })
            .catch(err => {
                res.status(400).json({error: err.message})
            })



        // const books={
        //     id:uuid.v4(),
        //     title:req.body.title,
        //     author:req.body.author
        // }
        // // res.json(req.body)    //generate id and add it to list(HW)
        // res.json(books)
    })
    .put((req,res)=>{                     //id nahali put garna mildaina
        res.status(405).json({error:"Method not allowed"})
    })



    .delete((req,res)=>{
        Book.deleteMany()
        .then((result)=>{
            res.json(result)
        })
        .catch(err=>console.log(err))
    })

router.route('/:book_id')
    .get((req,res)=>{
        Book.findById(req.params.book_id)
            .then((book)=>{
                res.json(book)
            })
            .catch(err=>console.log(err))
    })
    .post((req,res)=>{  //id halera post garna mildaina
        res.status(405).json({error:"method not allowed"})
    })
    .put((req,res)=>{
        Book.findByIdAndUpdate(req.params.book_id,
            {$set: req.body},
            {new:true}
        )
            .then((updated)=>{res.json(updated)})
            .catch(err=>console.log(err))
    })

    .delete((req,res)=>{
        Book.findByIdAndDelete(req.params.book_id)
        .then((reply)=>{res.json(reply)})
        .catch(err=>console.log(err))
    })
module.exports = router 