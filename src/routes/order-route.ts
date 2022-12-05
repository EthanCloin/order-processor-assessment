import usd from "currency.js";
import { Router, RequestHandler } from "express";
import { ValidationError, Static } from "runtypes";
import { Order } from "../models/order";

export const orderRouter = Router();

type Order = Static<typeof Order>;

// use this to debug logic before implementing db
const mock_items = {
  "1": 1,
  "2": 2,
  "3": 3,
};

const mock_state_taxes = new Map();
mock_state_taxes.set("FL", 0.07);
mock_state_taxes.set("GA", 0.1);

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
      res.status(400).send({
        status: "fail",
        data: {
          reason: err.code,
          detail: err.details,
        },
      });
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
    res.status(404).send({
      status: "fail",
      data: {
        reason: "invalid id provided!",
        detail: missingItemIds,
      },
    });
    return;
  }
};

const getStateTax = (state: string): number => {
  // this will be updated to hit db, so deserving of own fxn
  return mock_state_taxes.get(state.toUpperCase()) || 0;
};

const getPrices = (orderObj: Order): number[] =>
  orderObj.items.map(
    (item) =>
      Object.entries(mock_items).find((x) => x[0] === item.id.toString())![1] *
      item.quantity
  );

const calculateTotals = (orderObj: Order, itemPrices: number[]) => {
  const subtotal = usd(itemPrices.reduce((price1, price2) => price1 + price2));
  const taxRate = getStateTax(orderObj.address.state);
  const total = subtotal.add(subtotal.multiply(taxRate));

  return {
    formatted: {
      subtotal: subtotal.format(),
      taxRate: taxRate.toFixed(2),
      taxDue: usd(taxRate).multiply(subtotal).format(),
      total: total.format(),
    },
  };
};

orderRouter.post(
  "/",
  validateOrderSchema,
  validateItemIds,
  (req, res, next) => {
    // validate order data matches model (middleware handles that)
    const orderObj: Order = req.body;
    // validate item ids exist (middleware does that)
    // fetch item prices from db by id
    const itemPrices = getPrices(orderObj);

    // calc subtotal and total
    const totalsData = calculateTotals(orderObj, itemPrices);

    res.status(200).send({
      status: "success",
      data: totalsData,
    });
  }
);
