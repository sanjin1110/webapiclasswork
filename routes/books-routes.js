const express = require('express')
const uuid =require('uuid')
const router = express.Router()
const Book = require('../models/Book')
// let books = require('../data/books.js') //import books

router.route('/')
    .get((req,res,next)=> {
        Book.find()  //using promises
            // .then((boks)=>{res.json(books)})   data folder bata data lina ko lagi
            .then((books)=>{res.json(books)})  // post gare paxi matra data aauxa 
            .catch(next)
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
    .post((req,res,next)=>{
        Book.create(req.body)
            .then((book) => {
                res.status(201).json(book)
            })
            .catch(next)
            // .catch(err => {
            //     res.status(400).json({error: err.message})
            // })



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



    .delete((req,res,next)=>{
        Book.deleteMany()
        .then((result)=>{
            res.json(result)
        })
        .catch(next)
    })

router.route('/:book_id')
    .get((req,res,next)=>{
        Book.findById(req.params.book_id)
            .then((book)=>{
                if(!book) return res.status(404).json({error:"Book not found"})
                res.json(book)
            })
            // .catch(err=>next(err))
            .catch(next)
    })
    .post((req,res)=>{  //id halera post garna mildaina
        res.status(405).json({error:"method not allowed"})
    })
    .put((req,res,next)=>{
        Book.findByIdAndUpdate(req.params.book_id,
            {$set: req.body},
            {new:true}
        )
            .then((updated)=>{res.json(updated)})
            .catch(next)
    })

    .delete((req,res,next)=>{
        Book.findByIdAndDelete(req.params.book_id)
            .then((reply)=>res.status(201).end)
            // .then((reply)=>{res.json(reply)})
            .catch(next)
    })

router.route('/:book_id/reviews')
    .get((req,res,next)=>{
        Book.findById(req.params.book_id)
            .then((book)=>{
                if(!book) return res.status(404).json({error:'book not found'})
                res.json(book.reviews)
            })
            .catch(next)
    })
    .post((req,res,next)=>{
        Book.findById(req.params.book_id)
            .then((book)=>{
                if(!book) return res.status(404).json({error:'book not found'})
                const review = {
                    text:req.body.text
                }
                book.reviews.push(review)
                book.save()
                    .then((book)=> res.status(201).json(book.reviews[book.reviews.length-1]))
                    .catch(next)
            })
            .catch(next)
    })
    .delete((req,res,next)=>{
        Book.findById(req.params.book_id)
            .then((book)=>{
                if(!book) return res.status(404).json({error:"book not found"})
                book.reviews=[]
                book.save()
                    .then((book)=>res.status(204).end())
                    .catch(next)
            })
            .catch(next)
    })

router.route('/:book_id/reviews/:review_id')
    .get((req,res,next)=>{
        Book.findById(req.params.book_id)
            .then((book)=>{
                if(!book) return res.status(404).json({error:"book not found"})
                const review = book.reviews.id(req.params.review_id)
                res.json(review)
            })
            .catch(next)
    })

    .put((req,res,next)=>{
        Book.findById(req.params.book_id)
            .then((book)=>{
                if(!book) return res.status(404).json({error:"book not found"})
                book.reviews = book.reviews.map((r)=>{
                    if(r._id == req.params.review_id){
                        r.text = req.body.text
                    }
                    return r
                })
                book.save()
                    .then(book=>{
                        res.json(book.reviews.id(req.params.review_id))
                    })
                    .catch(next)
            }).catch(next)
    })

    .delete((req,res,next)=>{
        Book.findById(req.params.book_id)
            .then((book)=> {
                    if(!book) return res.status(404).json({error:"book not found"})
                book.reviews = book.reviews.filter((r)=>r._id != req.params.review_id)
                book.save()
                    .then(book => res.status(204).end())
                    .catch(next)
            })
            .catch(next)
    })
module.exports = router 