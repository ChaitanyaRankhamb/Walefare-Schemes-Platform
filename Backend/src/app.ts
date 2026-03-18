import express, { Request, Response } from "express";
import connectDB from "./config/mongo.connection";
import { errorHandler } from "./middlewares/errorHandling.middleware";

// Create a new express application instance
const app = express();

// connect the mongoDB database
connectDB();

// Set the network port
const port = process.env.PORT || 4000;

// Define the root path with a greeting message
app.get("/", (req: Request, res: Response) => {
    res.json({ message: "Welcome to the Walefare Schemes Platform!" });
});

// use the error handling middleware
app.use(errorHandler);

// Start the Express server
app.listen(port, () => {
    console.log(`The server is running at http://localhost:${port}`);
});