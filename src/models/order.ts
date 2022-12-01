// maybe i can regex to validate this?
export interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
}

export interface Item {
  id: number;
  quantity: number;
}

export interface Order {
  address: Address;
  items: Item[];
}
