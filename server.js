const express = require('express'),
	bodyParser = require('body-parser'),
	cors = require('cors'),
	logger = require('morgan'),
	helmet = require('helmet'),
	multer = require('multer'),
	config = require('./config'),
	get = require('./routes/get'),
	post = require('./routes/post')

const upload = multer()
const app = express()

app.use(multer().single('soundBlob'))

// ----------> Set Middleware <----------

app.use(logger('common'))
app.use(helmet())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))

app.use(cors())
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*')
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE')
	res.setHeader('Access-Control-Allow-Headers', 'content-type')
	next()
})

// ----------> API Routes <----------

// Homepage for API
app.get('/', (req, res) => res.send("WHY ARE YOU HERE? <br><br> THIS IS THE API HOMEPAGE FOR <a href='https://soundsof.us'>SOUNDSOF.US</a> <br><br> WHY DID I EVEN MAKE THIS!?"))

// Get All Sounds
// app.get('/api/v1/sounds', upload.single('soundBlob'), (req, res) => get.Sounds(req, res))
app.get('/api/v1/sounds', (req, res) => get.Sounds(req, res))

// Create Sound
app.post('/api/v1/sounds/new', (req, res) => post.saveSound(req, res))

//  404 Error
app.use((req, res) => res.send("<b>404 - Page Not Found</b> <br><br><br><br> Oh - hey there. Seems you have found the page that indicates the page you're looking for is not actually page... <br><br> How's that for clarity?"))

// ----------> Init Server <----------
app.listen(config.port, (err) => {
	if (err) console.log('Something went wrong', err)
	console.log(`Server started on port ${config.port}...`)
})