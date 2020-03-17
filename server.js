const express = require('express')
const app = express()
const fs = require('fs')

// Parsing
app.use(express.json())

// GET method route
app.get('/', function (req, res) {	
	res.send('Hello World')
})

// POST method route

app.get('/hello', function(req, res) {

  
  var country = req.query. country
  if(!country){
    res.send("Which country?")

  } else {
    res.send("Hello, " + country + "!" )
  }

})

// POST method route
app.post('/chat', function (req, res) {		

	var message = req.body.msg.split(' ')
	var k = message[0]

	// Read file
	var content = fs.readFileSync('reponses.json')
	var object = JSON.parse(content)

	if (message.length === 1) {

		(k in object) ? 
		res.send(k + ': ' + object[k])
		: res.send('Je ne connais pas ' + k + '...')
	}

	if (message.length === 3) {

		object[k] = message[2]

		// Write in file
		var data = JSON.stringify(object)
		fs.writeFileSync('recponses.json', data)

		res.send('Merci pour cette information !')
	}
})




var port = process.env.PORT || 3000;

app.listen(port, function () {
	console.log('Example app listening on port ', port)
})