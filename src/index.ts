import express, { Request, Response } from "express";
import dotenv from "dotenv";

// support using environment vars
dotenv.config();

// initialize express app
const app = express();
const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("<p>Welcome to Order Processor!</p>");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at https://localhost:${port}`);
});
