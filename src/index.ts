import express, { Request, Response } from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import { orderRouter } from "./routes/order-route";

// support using environment vars
dotenv.config();

// initialize express app
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use("/order", orderRouter);

const port = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("<p>Welcome to Order Processor!</p>");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
