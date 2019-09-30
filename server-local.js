'use strict';

const app = require('./express/server');
const config = require('./express/config')

// ----------> Init Server <----------
app.listen(config.port, (err) => {
	if (err) console.log('Something went wrong', err)
	console.log(`Server started on port ${config.port}...`)
})