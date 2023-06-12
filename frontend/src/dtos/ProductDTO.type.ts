export type ProductDTO = {
  readonly code: string;
  readonly description: string;
  readonly stock: string;
  readonly price: number;
  readonly unit: string;
  readonly group: string;
  readonly obs?: string;
};
