// App.tsx
import { useEffect, useState } from "react";
import "./App.css";
import { Product } from "./components/Product";
import type { Product as ProductType } from "./components/Types";
import { Footer } from "./components/footer";
import { getShoeImageByColor } from "./components/helpers/ProductImage";
import { numberToNorwegianWords } from "./components/helpers/NumberConverter";

export const CART_KEY = "cart";

function CartViewer() {
  const [items, setItems] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  });

  const animalBySize = [
    "mouse",
    "hamster",
    "rat",
    "rabbit",
    "cat",
    "dog",
    "goat",
    "horse",
    "elephant",
    "unknown/variable",
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
    <div className="p-2 flex flex-col gap-2">
      <div className="p-4 w-full bg-[#d0f0c9] text-[#364a32] border-2 border-[#364a32]">
        <p className="text-xl">Din handlekurv ({items.length})</p>
      </div>

      {items.map((it, i) => (
        <div key={i} className="border-b border-gray-300 p-2 flex gap-8">
          <img
            src={getShoeImageByColor({ color: it.selected.color })}
            alt="Shoe"
            className="w-32 h-32 object-contain border border-gray-300 p-1"
          />
          <div className="flex flex-col w-full">
            <div className="flex items-center justify-between">
              <strong className="text-2xl">{it.name}</strong>
              <span className="font-[digital] text-xl">
                {numberToNorwegianWords(it.selected.shoePrice)} KR
              </span>
            </div>
            <span>Size: {animalBySize[it.selected.size]}</span>
            <span>Type: {it.selected.shoeType}</span>
            <span>Color: {it.selected.color}</span>
          </div>
        </div>
      ))}
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
      availableTypes: [
        "left",
        "right",
        "pair",
        "two pairs",
        "three pairs",
        "ten pairs",
      ],
      prices: [75, 75, 150, 300, 450, 4500],
      available: 1,
      availableColors: ["red", "blue", "pink", "yellow"],
    },
  ];

  return (
    <>
      <div className="p-8">
        <div>
          {products.map((product) => (
            <Product key={product.name} productItem={product} />
          ))}
        </div>
        <CartViewer />
      </div>
      <Footer price={1234} />
    </>
  );
}

export default App;
