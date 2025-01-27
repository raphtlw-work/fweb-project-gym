import { MongoClient, ServerApiVersion } from "mongodb";

const uri =
  "mongodb+srv://fweb:z6MgGHzZTQUz3w1t@db.uu5qh.mongodb.net/?retryWrites=true&w=majority&appName=db";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function connectToDatabase() {
  await client.connect();
  return client.db("fastgym");
}
