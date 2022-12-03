import { Router, RequestHandler } from "express";
import { ValidationError } from "runtypes";
import { Order } from "../models/order";

export const orderRouter = Router();

// use this to debug logic before implementing db
const mock_items = {
  1: 5,
  2: 8,
  3: 2,
};

/**
 * Assert that order request body confirms to schema defined in models/order.Order
 * @param req
 * @param res
 * @param next
 * @returns
 */
const validateOrderSchema: RequestHandler = (req, res, next) => {
  try {
    Order.check(req.body);
    next();
  } catch (err) {
    if (err instanceof ValidationError) {
      res
        .status(400)
        .send("invalid order request body! " + JSON.stringify(err.details));
      return;
    }
  }
};

orderRouter.post("/", validateOrderSchema, (req, res, next) => {
  // validate order data matches model (middleware does it first)
  const orderObj = Order.check(req.body);

  res.status(200).send("got your order :) ");
  // fetch item prices from db by id
  // calc subtotal
  // add tax to calc total
  // return subtotal and total
});
