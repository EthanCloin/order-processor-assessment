import { Router, RequestHandler } from "express";
import { ValidationError, Static } from "runtypes";
import { Order } from "../models/order";

export const orderRouter = Router();

type Order = Static<typeof Order>;

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

const validateItemIds: RequestHandler = (req, res, next) => {
  const orderObj: Order = req.body;

  // filter to only id not existing in mockData Object (replace with db later)
  const missingItemIds = orderObj.items
    .filter((item) => !Object.keys(mock_items).includes(item.id.toString()))
    .map((item) => item.id);
  // need to convert id to string since JS converts keys to string type when hashing
  if (missingItemIds.length === 0) {
    next();
  } else {
    res.status(404).send(`invalid item id: [${missingItemIds}]`);
    return;
  }
};

orderRouter.post(
  "/",
  validateOrderSchema,
  validateItemIds,
  (req, res, next) => {
    // validate order data matches model (middleware handles that)
    const orderObj: Order = req.body;

    // fetch item prices from db by id
    // calc subtotal
    // add tax to calc total
    // return subtotal and total
    res.status(200).send("got your order :) ");
  }
);
