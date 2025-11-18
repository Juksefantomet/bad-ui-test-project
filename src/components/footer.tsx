import { numberToNorwegianWords } from "./helpers/NumberConverter";
import burger from "../assets/burger.png";
import { useEffect, useState } from "react";
import { CART_KEY } from "../App";

interface FooterProps {
  // Price to display in the footer
  price: number;
}

export function Footer({ price }: FooterProps) {
  const [items, setItems] = useState<any[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(CART_KEY) || "[]");
    } catch {
      return [];
    }
  });
  const [totalPrice, setTotalPrice] = useState<number>(price);

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

  useEffect(() => {
    const price = items.reduce((sum, it) => sum + (it.selected.shoePrice || 0), 0);
    // Update the price prop if needed
    setTotalPrice(price);
  }, [items]);
  
  return (
    <div className="bg-[#364a32] text-[#d0f0c9] flex justify-between items-center p-4 fixed bottom-0 w-full">
      <img className="w-12 h-12" src={burger} alt="Burger menu icon" />
      <h1 className="text-2xl">Sko-pa-fot.com</h1>
      <div className="border-[#d0f0c9] border p-1 text-2xl font-[digital]">
        {numberToNorwegianWords(totalPrice) + " KR"}
      </div>
    </div>
  );
}
