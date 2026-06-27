import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is not defined");
}

async function main() {
  console.log("🚀 Starting MongoDB test...");

  try {
    const client = new MongoClient(uri);

    console.log("⏳ Connecting to MongoDB...");
    await client.connect();

    console.log("✅ Connected successfully!");

    const db = client.db("arin");

    console.log("📂 Database:", db.databaseName);

    const collections = await db.listCollections().toArray();

    console.log("📋 Collections:");
    console.log(collections);

    await client.close();

    console.log("🔒 Connection closed.");
  } catch (error) {
    console.error("❌ Connection failed:");
    console.error(error);
  }
}

main();