const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://mashed:mashed@mashedcluster.jdkw84x.mongodb.net/?retryWrites=true&w=majority"; // second "mashed" needs to be put into env as this is our password

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
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

async function run() {
  try {
    // Connect the client to the server
    await client.connect();

    // Access the desired collection in your MongoDB Atlas database
    const collection = client.db("Gardening").collection("Plants");

    // Retrieve all documents from the collection
    const documents = await collection.find().toArray();

    // Log the retrieved documents
    console.log(documents);
  } finally {
    // Ensure the client is closed
    await client.close();
  }
}

run().catch(console.dir);
