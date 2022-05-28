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
