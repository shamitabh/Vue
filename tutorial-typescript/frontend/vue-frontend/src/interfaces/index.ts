export interface productType {
  id?: number;
  name?: string;
  absolute_url?: string;
  description?: string;
  price?: number;
  image?: string;
  thumbnail?: string;
}

export interface cartItemType {
  product: productType;
  quantity: number;
}

export interface cartType {
  items: cartItemType[];
}

export interface authType {
  username: string;
  password: string;
}

export interface orderItemType {
  product?: number;
  quantity?: number;
  price?: number;
}

export interface orderType {
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  zipcode: string;
  place: string;
  phone: string;
  items: orderItemType[];
  stripe_token: string;
}
