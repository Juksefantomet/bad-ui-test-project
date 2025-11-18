// components/Product.tsx
import { useState } from "react";
import type { Product } from "./Types"; // adjust path if Types is elsewhere

export type ProductProps = {
  productItem: Product;
};

export function Product({ productItem }: ProductProps) {
  const [size, setSize] = useState<string>("");

  return (
    <div>
      <h3>{productItem.name}</h3>
      <p>{productItem.description}</p>
      <strong>{productItem.price}</strong>
      <p>{productItem.availableSizes.join(", ")}</p>

      <div>
        {productItem.availableSizes[Math.floor(Math.random() * productItem.availableSizes.length)]}
      </div>
    </div>
  );
}
