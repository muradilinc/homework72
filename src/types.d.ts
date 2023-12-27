export interface Pizza {
  name: string;
  price: number;
  image: string;
}

export interface ApiPizza {
  [id: string]: Pizza;
}

export interface PizzaList extends Pizza {
  id: string;
}

export interface PizzaUpdate {
  id: string;
  pizza: Pizza;
}

export interface Order {
  id: string;
  order: PizzaList;
  amount: number;
}

export interface ApiOrder {
  [id: string]: number;
}

export interface Person {
  name: string;
  address: string;
  phone: string;
}

export interface NewOrder {
  orders: ApiOrder;
  person: Person;
}

export interface ApiOrders {
  [id: string]: NewOrder;
}

interface OrderPizza {
  id: string;
  pizzaDetail: Pizza;
  amount: number;
}

export interface ResponseOrders {
  id: string;
  person: Person;
  pizzas: OrderPizza[];
}