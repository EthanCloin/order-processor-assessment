import { Router } from "express";

export const orderRouter = Router();

orderRouter.get("/", (req, res, next) => {
  res.send("got it :)");
});
