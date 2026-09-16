export interface IProduct {
   id: number;
   title: string;
   description: string;
   thumbnail: string;
   price: number;
}

export type IProductInput = Omit<IProduct, 'id'>;

export interface IProductUpdate {
   id: number;
   product: Partial<IProduct>;
}

export interface IProductResponse {
   limit: number;
   products: IProduct[];
   skip: number;
   total: number;
}

export interface IProductCart {
   id: number;
   title: string;
   price: number;
   quantity: number;
   total: number;
   discountPercentage: number;
   discountedTotal: number;
   thumbnail: string;
}

export interface ICart {
   id: number;
   products: IProductCart[];
   total: number;
   discountedTotal: number;
   userId: number;
   totalProducts: number;
   totalQuantity: number;
}

export interface IErrorResponse {
   status: number;
   data: {
      message: string;
   };
}
