import { Router } from "express";

export const orderRouter = Router();

const mock_items = {
  1: 5,
  2: 8,
  3: 2,
};

orderRouter.post("/", (req, res, next) => {
  // validate order data matches model
  // fetch item prices from db by id
  // calc subtotal
  // add tax to calc total
  // return subtotal and total
});
