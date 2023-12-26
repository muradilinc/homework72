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