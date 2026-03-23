import express, { Request, Response } from "express";
import passport from "passport";
import connectDB from "./config/mongo.connection";
import "./config/passport.config"; // Initialize passport configuration
import { errorHandler } from "./middlewares/errorHandling.middleware";
import userRouter from "./modules/user/user.routes";
import { redisConnection } from "./config/redis.connection";

// Create a new express application instance
const app = express();

// connect the mongoDB database
connectDB();

// connect the redis client here
redisConnection();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());  // initialize the passport middleware

// Routes
app.use("/auth", userRouter);

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
