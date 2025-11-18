// App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./components/Product";
import type { Product as ProductType } from "./components/Types";
import { Footer } from "./components/footer";

const CART_KEY = "cart";

function CartViewer() {
  const [items, setItems] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  });

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

  useEffect(() => {
    const onStorage = () => {
      try {
        setItems(JSON.parse(localStorage.getItem(CART_KEY) || "[]"));
      } catch {
        setItems([]);
      }
    };
    window.addEventListener("storage", onStorage);
    // also update on same-window changes
    const interval = setInterval(onStorage, 300);
    return () => {
      window.removeEventListener("storage", onStorage);
      clearInterval(interval);
    };
  }, []);

  return (
    <div style={{ marginBottom: 20 }}>
      <h4>Cart ({items.length})</h4>
      <ul>
        {items.map((it, i) => (
          <li key={i}>
            {it.name} — size {animalBySize[it.selected.size]} — {it.selected.shoeType} —{" "}
            {it.selected.shoePrice} ({new Date(it.addedAt).toLocaleString()})
          </li>
        ))}
      </ul>
      <button
        onClick={() => {
          localStorage.removeItem(CART_KEY);
          setItems([]);
        }}
      >
        Clear cart
      </button>
    </div>
  );
}

function App() {
  const products: ProductType[] = [
    {
      name: "storsko",
      description: "A big shoe",
      availableSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9],
      availableTypes: ["left", "right", "pair", "two pairs", "three pairs", "ten pairs"],
      prices: [75, 75, 150, 300, 450, 4500],
      available: 1,
      availableColors: ['red', 'blue', 'pink', 'yellow'],
    },
  ];

  return (
    <>
      <div style={{ padding: 16 }}>
        <CartViewer />
        <div>
          {products.map((product) => (
            <Product key={product.name} productItem={product} />
          ))}
        </div>
      </div>
      <Footer price={1234} />
    </>
  );
}

export default App;
