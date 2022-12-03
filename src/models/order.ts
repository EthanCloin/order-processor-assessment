import { Number, String, Array, Record } from "runtypes";

export const Address = Record({
  street: String,
  city: String,
  state: String,
  zip: String,
});

export const Item = Record({
  id: Number,
  quantity: Number,
});

export const Order = Record({
  address: Address,
  items: Array(Item),
});

// maybe i can regex to validate this?
// export type Address = {
//   street: string;
//   city: string;
//   state: string;
//   zip: string;
// };

// export type Item = {
//   id: number;
//   quantity: number;
// };

// export type Order = {
//   address: Address;
//   items: Item[];
// };
