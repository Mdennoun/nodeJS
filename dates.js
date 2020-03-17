
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbName = 'chatbot';
const url = "mongodb+srv://root:root@cluster0-ok0cc.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

(async function() {

  try {
    await client.connect();
    console.log("Connected correctly to server");

    // Get the collection
    const col = client.db(dbName).collection("dates");

  
    // Insert a single document
    let r = await col.insertOne({ date : new Date() });
    assert.equal(1, r.insertedCount);

    // Get the documents that match the query
    const allDates = await col.find().toArray();
    console.log("data : ");
    console.log(allDates);

  } catch (err) { 
    console.log('Could not connect to the database.', err);
    process.exit();
  }

  // Close connection
  client.close();
})();

