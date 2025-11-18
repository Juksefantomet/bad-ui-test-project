import React, { useEffect, useRef, useState } from "react";
import type { Product } from "./Types";

export type ProductProps = {
  productItem: Product;
};

const CART_KEY = "cart";

export function Product({ productItem }: ProductProps) {
  const [size, setSize] = useState<number>(
    productItem.availableSizes?.[0] ?? 1
  );
  const [shoeType, setShoeType] = useState<string>(
    (productItem.availableTypes?.[0] as string) ?? "left"
  );
  const [shoePrice, setShoePrice] = useState<number>(
    productItem.prices?.[0] ?? 0
  );

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Only set random values once after mount (like your original behavior).
  useEffect(() => {
  function pickRandom() {
    const sizes = productItem.availableSizes || [size];
    const types = productItem.availableTypes || [shoeType];
    const prices = productItem.prices || [shoePrice];

    setSize(sizes[Math.floor(Math.random() * sizes.length)]);
    setShoeType(types[Math.floor(Math.random() * types.length)]);
    setShoePrice(prices[Math.floor(Math.random() * prices.length)]);

    timerRef.current = setTimeout(pickRandom, Math.random() * 1000);
  }

  pickRandom();

  return () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };
  // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);


  function addToCart() {
    try {
      const existing = JSON.parse(localStorage.getItem(CART_KEY) || "[]");
      const entry = {
        name: productItem.name,
        selected: { size, shoeType, shoePrice },
        // include any props you want to persist
        meta: {
          availableSizes: productItem.availableSizes,
          availableTypes: productItem.availableTypes,
        },
        addedAt: new Date().toISOString(),
      };
      existing.push(entry);
      localStorage.setItem(CART_KEY, JSON.stringify(existing));
      // optional: trigger a storage event for other windows/components
      window.dispatchEvent(new Event("storage"));
    } catch (e) {
      console.error("failed to add to cart", e);
    }
  }

  const animalBySize =[
   'mouse',      
   'hamster',
   'rat',
   'rabbit',
   'cat',
   'dog',
   'goat',
   'horse',
   'elephant',   
   'unknown/variable'
  ];

  return (
    <div style={{ border: "1px solid #ddd", padding: 12, marginBottom: 12 }}>
      <h3>{productItem.name}</h3>
      <p>{productItem.description}</p>
      <strong>{shoePrice}</strong>

      <div>
        Selected shoe size: <strong>{animalBySize[size]}</strong>
      </div>
      <div>
        Selected shoe type: <strong>{shoeType}</strong>
      </div>

      <div style={{ marginTop: 8 }}>
        <button onClick={addToCart}>Add to cart</button>
      </div>
    </div>
  );
}
