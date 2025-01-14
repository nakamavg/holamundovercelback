const express = require('express');
const router = express.Router();
const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

// Middleware to connect to MongoDB
router.use(async (req, res, next) => {
  try {
    if (!client.topology || !client.topology.isConnected()) {
      await client.connect();
    }
    req.dbClient = client;
    req.db = client.db("skills");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to connect to the database.");
  }
});

// Define route to list all documents in a specific collection
router.get('/', async (req, res) => {
  try {
    const collection = req.db.collection("tecnichal");
    const documents = await collection.find().toArray();
    res.json(documents);
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to list documents.");
  }
});
router.get('/soft', async (req, res) => {
	  try {
	const collection = req.db.collection("softs");
	const documents = await collection.find().toArray();
	res.json(documents);
  } catch (error) {
	console.error(error);
	res.status(500).send("Failed to list documents.");
  }
});
module.exports = router;