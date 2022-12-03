import { Router } from "express";
import { ValidationError } from "runtypes";
import { Order } from "../models/order";

export const orderRouter = Router();

// use this to debug logic before implementing db
const mock_items = {
  1: 5,
  2: 8,
  3: 2,
};

orderRouter.post("/", (req, res, next) => {
  // validate order data matches model
  try {
    const orderObj = Order.check(req.body);
  } catch (err) {
    if (err instanceof ValidationError) {
      res
        .status(400)
        .send("invalid order request body! " + JSON.stringify(err.details));
      return null;
    }
  }

  res.status(200).send("Got your order!");
  // fetch item prices from db by id
  // calc subtotal
  // add tax to calc total
  // return subtotal and total
});
