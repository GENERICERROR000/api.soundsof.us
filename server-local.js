'use strict';
const app = require('./express/server')

// ----------> Init Server <----------
app.listen(3001, (err) => {
	if (err) console.log('Something went wrong', err)
	console.log(`Server started on port ${3001}...`)
})