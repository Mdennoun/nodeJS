const express = require('express')
const fs = require('fs')
const app = express()

// Parsing
app.use(express.json())

// GET method route
app.get('/', function (req, res) {	
	res.send('Hello World')
})



var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Example app listening on port ', port)
})