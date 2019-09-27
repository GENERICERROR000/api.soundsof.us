// Require Express
const express = require('express')

// Init App
const app = express()

// Require Mongoose
const mongoose = require('mongoose')

// Require BodyParser
const bodyParser = require('body-parser')

// Require Cors
const cors = require('cors');

// Connect to DB
mongoose.connect('mongodb://localhost:27017/bookdb')

// Tell app to use BodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// Tell app to use Cors
app.use(cors())

// Set Headers for Requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  next()
})

// Bring in Book model
const Book = require('./models/Book');

// ----------> API ROUTES <----------
// Home/Root Page
app.get('/', (req, res) => {
  res.send("WHY YOU HERE - DIS API HOMEPAGE - WHY I EVEN MAKE DIS!?")
})

// GET Books
app.get('/api/v1/books', (req, res) => {
  Book.find((err, books) => {
    if (err) {
      throw err
    } else {
      res.json(books)
    }
  })
})

// POST Book
app.post('/api/v1/books/new', (req, res) => {
  let book = req.body

  Book.create(book, (err, newBook) => {
    if (err) {
      throw err
    } else {
      Book.find((err, books) => {
        if (err) {
          throw err
        } else {
          res.json(books)
        }
      })
    }
  })
})

// DELETE Book
app.delete('/api/v1/books/delete', (req, res) => {
  let bookID = req.body.id

  Book.remove({_id: bookID}, (err) => {
    if (err) {
      throw err
    } else {
      Book.find((err, books) => {
        if (err) {
          throw err
        } else {
          res.json(books)
        }
      })
    }
  })
})

//  404 Error
app.use((req, res) => {
  var err = new Error('Not Found')
  err.status = 404
  res.json(err)
})
// ----------> END API ROUTES <----------

// Start Server
app.listen(3000, () => {
  console.log('Server started on port 3000...')
})
