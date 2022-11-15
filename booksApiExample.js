// get request to the '/api/books' endpoint recieves an array of objects of books
// post request to the same endpoint add a new book object to the array and sends back a confirmation message
// patch request to the same endpoint updates the book that matches teh title of the book sent in the body, and sends back the updated book object

import express from "express";
const app = express();
const port = 8080;

app.use(express.json())

let booksArr = [
    {
        'id' : 1, 
        'title' : 'Book 1', 
        'author' : 'Author 1'
    },
    {
        'id' : 2, 
        'title' : 'Book 2', 
        'author' : 'Author 2'
    },
    {
        'id' : 3, 
        'title' : 'Book 3', 
        'author' : 'Author 3'
    }
]

app.get('/api/books', (req, res) => {
    res.status(200).send(booksArr)
})

app.post('/api/books', (req, res) => {
    let bookToAdd = req.body;
    booksArr.push(bookToAdd)
    res.status(201).send(booksArr)
})

app.patch('/api/books', (req, res) => {
    let foundFlag = false; 
    let foundBook = {};
    booksArr.forEach(book => {
        if (book.title === req.body.title) {
           foundFlag = true; 
           book.author = req.body.author;
           foundBook = book;
        }
    })
    if (foundFlag) {
        res.status(200).send(foundBook)
    } else {
        res.status(404).send('Book not found in Library.')
    }
})

app.listen(port, (console.log('Books server is listening.')))