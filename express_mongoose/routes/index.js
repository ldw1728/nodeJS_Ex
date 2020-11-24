var express = require('express');
var router = express.Router();

var Book = require('../models/book');

    //모든 책들 조회
    router.get('/api/books', (req, res)=>{
        Book.find((err, books)=>{
            if(err) 
                return res.status(500).send({error:'database failure'});
            res.json(books);
            });
    });
    //한 개의 책 조회
    router.get('/api/books/:book_id', (req, res)=>{
        Book.findOne({_id : req.params.book_id}, (err, book)=>{
            if(err) 
            return res.status(500).json({error: err});
            if(!book) 
            return res.status(404).json({error:'book not found'});
            res.json(book);
        });
    });
    //작가로 조회
    router.get('/api/books/author:author', (req, res)=>{
        Book.find({author : req.params.author}, {_id:0, title:1, published_date:1},
                (err, books)=>{
                    if(err)
                        return res.status(500).json({error:err});
                    if(book.length == 0) 
                        return res.status(404).json({error:'book not found'});
                    res.json(books); 
                });
    }); 
    //등록
    router.post('/api/books', (req, res)=>{

        var book = new Book();
        book.title = req.body.name;
        book.author = req.body.author;
        book.published_date = new Date(req.body.published_date);

        book.save((err)=>{
            if(err){
                console.error(err);
                res.json({result : 0});
                return;
            }
            res.json({result : 1});
        });
    });
    //책 업데이트
    router.put('/api/books/:book_id', (req, res)=>{
        Book.findOne({_id : req.params.book_id}, (err, book)=>{
            if(err) 
            return res.status(500).json({error: err});
            if(!book) 
            return res.status(404).json({error:'book not found'});
            
            if(req.body.title) book.title = req.body.title;
            if(req.body.author) book.author = req.body.author;
            if(req.body.published_date) book.published_date = req.body.published_date;

            book.save((err)=>{
                if(err){
                    res.status(500).json({error: 'failed to update'});
                }
                res.json({result : "book updated"});
            });
        });
    });
    //책 삭제
    router.delete('/api/books/:book_id', (req, res)=>{
        Book.remove({_id : req.params.book_id}, (err, output)=>{
            if(err)
                return res.staus(500).json({error:"database failure"});
            res.status(204).end();
        });
    });

module.exports = router;

