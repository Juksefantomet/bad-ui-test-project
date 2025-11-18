// App.tsx
import React, { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./components/Product";
import type { Product as ProductType } from "./components/Types"; // alias so it doesn't clash with component
import burger from "./assets/burger.png";
import { numberToNorwegianWords } from "./components/helpers/NumberConverter";
import type { Product as ProductType } from "./components/Types";

const CART_KEY = "cart";

function CartViewer() {
  const [items, setItems] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  });

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
            {it.name} — size {it.selected.size} — {it.selected.shoeType} —{" "}
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
  const animalBySize = {
  1: 'mouse',       // smallest
  2: 'hamster',
  3: 'rat',
  4: 'rabbit',
  5: 'cat',
  6: 'dog',
  7: 'goat',
  8: 'horse',
  9: 'elephant',    // largest
  0: 'unknown/variable'
};
  const products: ProductType[] = [
    {
      name: "storsko",
      description: "A big shoe",
      availableSizes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 0],
      availableTypes: [
        "left",
        "right",
        "pair",
        "two pairs",
        "three pairs",
        "family deal",
      ],
      prices: [75, 75, 150, 300, 450, 2000],
      availableTypes: ["left", "right", "pair", "two pairs", "three pairs", "ten pairs"],
      prices: [75, 75, 150, 300, 450, 4500],
      available: 1,
    },
  ];

  return (
    <>
      <div>
        {products.map((product) => (
          <Product key={product.name} productItem={product} />
        ))}

        {/*
          <BadButton level="mild">Mildly annoying button</BadButton>
        <BadButton level="annoying">Annoying button</BadButton>
        <BadButton level="unusable" onClick={() => alert("Why did you click this?")}>
          Completely unusable button
        </BadButton>
          */}
        <div className="bg-[#364a32] text-[#d0f0c9] flex justify-between items-center p-4 absolute bottom-0 w-full">
          <img className="w-12 h-12" src={burger} alt="Burger menu icon" />
          <h1 className="text-2xl">Sko-pa-fot.com</h1>
          <div className="border-[#d0f0c9] border p-1 text-2xl font-[digital]">
            {numberToNorwegianWords(243) + " KR"}
          </div>
        </div>
      <div style={{ padding: 16 }}>
        <CartViewer />
        <div>
          {products.map((product) => (
            <Product key={product.name} productItem={product} />
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
