import { MongoClient } from "mongodb";
import dotenv from "dotenv";
import { AppError } from "../Error/appError";

dotenv.config(); // Load environment variables from .env file

let client: any;
let db: any;

const connectDB = async () => {
  if (db) return db; // reuse existing connection

  try {
    if (!process.env.MONGODB_URI) {
      throw new AppError(
        "MONGODB_URI is not defined in environment variables",
        500
      )
    }

    client = new MongoClient(process.env.MONGODB_URI);

    await client.connect();  // it will establish the connection 

    db = client.db(); // default DB from URI

    console.log("MongoDB is Connected Successfully");

    return db;
  } catch (error) {
    console.error("MongoDB Connection Error:", error);
    process.exit(1); // fail fast
  }
};

export default connectDB;