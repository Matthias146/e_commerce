

export interface Product {
  sku: string;
  name: string;
  description: string;
  unitPrice: number;
  imageUrl: string;
  active: boolean;
  unitsInStock: number;
  dateCreated: Date;
  lastUpdated: Date;
}

export interface GetResponse {
  _embedded: {
    products: Product[];
  }
}
