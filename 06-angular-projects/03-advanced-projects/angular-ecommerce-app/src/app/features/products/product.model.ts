export interface StoreProduct {
  readonly id: number;
  readonly name: string;
  readonly category: string;
  readonly price: number;
  readonly description: string;
  readonly color: string;
}
export interface CartLine { readonly product: StoreProduct; readonly quantity: number; }
