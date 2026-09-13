export interface IProduct {
   id: number;
   title: string;
   description: string;
   thumbnail: string;
   price: number;
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
