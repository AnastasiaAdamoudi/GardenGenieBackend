
const uri =
  "mongodb+srv://mashed:mashed@mashedcluster.jdkw84x.mongodb.net/?retryWrites=true&w=majority"; // second "mashed" needs to be put into env as this is our password

// Create a MongoClient with a MongoClientOptions object to set the Stable API version

import express from 'express';
import mongoose  from 'mongoose';

import { MongoClient, ServerApiVersion } from 'mongodb';



// Create the Express app
const app = express();
const port = 3000;

// Connect to MongoDB Atlas
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
  });

// Define the API endpoint
app.get('/api/data', async (req, res) => {
  try {
    // Create a MongoClient with the desired options
    const client = new MongoClient(uri, {
      serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      },
    });

    // Connect the client to the server
    await client.connect();

    // Access the desired collection in your MongoDB Atlas database
    const collection = client.db('Gardening').collection('Plants');

    // Retrieve all documents from the collection
    const documents = await collection.find().toArray();

    // Close the client connection
    await client.close();

    // Send the retrieved documents as the API response
    res.json(documents);
  } catch (err) {
    console.error('Error retrieving data:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});






// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log(
//       "Pinged your deployment. You successfully connected to MongoDB!"
//     );
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }

// run().catch(console.dir);
