// Types.ts
export type PairType = "left" | "right" | "pair" | "two pairs" | "three pairs" | "ten pairs";

export interface Product {
  id?: string;
  name: string;
  description?: string;
  price?: number | string;
  availableSizes: number[];
  availableTypes: PairType[];
  prices: number[];
  available: boolean | number;
  meta?: Record<string, unknown>;
}
