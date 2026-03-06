// import MongoDB driver
const { MongoClient, ServerApiVersion } = require("mongodb");
const uri =
  "mongodb+srv://hello:gyfguyfyf@cluster0.fkmn43w.mongodb.net/?appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
    // connect to atlas cluster
    await client.connect();

    // get database
    const db = client.db("MyDatabase");
    // insert document
    await db.collection("users").insertOne({
      name: "Saad",
      age: 25,
    });

    // read document
    const users = await db.collection("users").find().toArray();
    // close the connection
    console.log(users);

    // await client.close()
}

run().catch(console.dir);


// express route
const app = require("express")();
const db = client.db("MyDatabase");

app.get("/users", async (req, res) => {
  const users = await db.collection("users").find().toArray();
  res.json(users);

  console.log(users);
});

app.listen(3000)

// for creating connection with the MongoDB cluster database
// const { MongoClient, ServerApiVersion } = require('mongodb');

// const uri = "mongodb+srv://hello:YOUR_PASSWORD@cluster0.fkmn43w.mongodb.net/?retryWrites=true&w=majority";

// const client = new MongoClient(uri, {
//   serverApi: {
//     version: ServerApiVersion.v1,
//     strict: true,
//     deprecationErrors: true,
//   }
// });

// async function run() {
//   try {
//     await client.connect();
//     await client.db("admin").command({ ping: 1 });
//     console.log("Connected successfully!");
//   } finally {
//     await client.close();
//   }
// }

// run().catch(console.dir);
