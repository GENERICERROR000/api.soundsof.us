const express = require('express'),
  bodyParser = require('body-parser'),
  cors = require('cors'),
  logger = require('morgan'),
  helmet = require('helmet'),
  config = require('./config')


const app = express()

// ----------> Set Middleware <----------

app.use(logger('common'))
app.use(helmet())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cors())
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'content-type')
  next()
})

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

// ----------> Init Server <----------
app.listen(config.port, (err) => {
  if (err) console.log('Something went wrong', err)
  console.log(`Server started on port ${config.port}...`)
})

