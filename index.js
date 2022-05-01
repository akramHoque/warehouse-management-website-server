const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;


// middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.k8nud.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
  try {

    await client.connect();
    const fruitCollection = client.db('FruitHouse').collection('items');

    app.get('/items', async (req, res) => {
      const query = {};
      const cursor = fruitCollection.find(query);
      const items = await cursor.toArray();
      res.send(items);
    });
    // manageInventories api

    app.get('/manageInventories', async (req, res) => {
      const query = {};
      const cursor = fruitCollection.find(query);
      const manageInventories = await cursor.toArray();
      res.send(manageInventories);
    });

    // Delete item

    app.delete('/manageInventories/:id' , async(req, res) =>{
      const id = req.params.id ;
      const query = {_id: ObjectId(id)} ;
      const result = await fruitCollection.deleteOne(query) ;
      res.send(result);
    });

    // inventory:id 

    app.get('/inventory/:id', async(req, res) =>{
      const id = req.params.id;
      const query = {_id: ObjectId(id)};
      const item = await fruitCollection.findOne(query);
      res.send(item);
    })

  }
  finally {

  }
}

run().catch(console.dir);



app.get('/', (req, res) => {
  res.send('Running assginment-11 server');
});

app.listen(port, () => {
  console.log('Listening to port', port)
})