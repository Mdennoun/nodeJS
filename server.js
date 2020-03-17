const express = require('express')
const app = express()
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbName = 'chatbot';
const bddURL= "mongodb+srv://root:root@cluster0-ok0cc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(bddURL, { useNewUrlParser: true, useUnifiedTopology: true });

// Parsing
app.use(express.json())

// GET method route
app.get('/', function (req, res) {  
    res.send('Hello World')
})


app.get('/hello', function(req, res) {

  
  var nom = req.query.nom
  if(!req.query.nom){
    res.send("Quel est votre nom ?")

  } else {
    res.send("Bonjour " + nom )
  }

})

// POST method route
app.post('/chat', async function (req, res) {     

    var message = req.body.msg.split(' ')
    await client.connect();
        console.log("Connected correctly to database");
        
        //var message = req.body.msg.split(' ')
        //console.log(message);

        const db = client.db(dbName);
       

        // Get the collection
        const col = db.collection('messages');
      var k = message[0]

      // Read file
      var content = fs.readFileSync('reponses.json')
      var object = JSON.parse(content)

      if (message.length === 1) {

       

          if (k in object) {
            let m = k + ': ' + object[k]
            await col.insertMany([{ from : "user", msg: object[k] }, { from : "bot", msg: m }]);
            res.send(m)
          } else {
            let m = 'Je ne connais pas ' + k + '...'
            await col.insertMany([{ from : "user", msg: object[k] }, { from : "bot", msg: m }]);
            res.send(m)

          }
          
          
      }

      if (message.length === 3) {

          object[k] = message[2]
          // Write in file
          var data = JSON.stringify(object)
          fs.writeFileSync('recponses.json', data)
          let m = 'Merci pour cette information !'

          await col.insertMany([{ from : "user", msg: object[k] }, { from : "bot", msg: m }]);

       
          res.send(m)
      }
})


app.get('/messages/all', async function (req, res) {           
    

      try {
        await client.connect();
        console.log("Connected correctly to database");
        
        //var message = req.body.msg.split(' ')
        //console.log(message);

        const db = client.db(dbName);
       

        // Get the collection
        const col = db.collection('messages');
        // Get the documents that match the query
        const docs = await col.find().toArray();
        res.send(docs);
        
      } catch (err) {
        console.log(err.stack);
        console.log("fail to connect to database");

      }

      // Close connection
      client.close();

});

app.delete('/messages/last', async function (req, res) {           
    

  try {
    await client.connect();
    console.log("Connected correctly to database");
    
    //var message = req.body.msg.split(' ')
    //console.log(message);

    const db = client.db(dbName);
   

    // Get the collection
    const col = db.collection('messages');
    // Get the documents that match the query
    const docs = await col.find().toArray();
    let last = docs[docs.length-1]
    await col.deleteOne(last)
    res.send("delete successfully");
    
  } catch (err) {
    console.log(err.stack);
    console.log("fail to connect to database");

  }

  // Close connection
  client.close();

});



var port = process.env.PORT || 3000;

app.listen(port, function () {
    console.log('Example app listening on port ', port)
})



