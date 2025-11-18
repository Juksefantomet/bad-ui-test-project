import { useEffect, useRef, useState } from "react";
import type { Product } from "./Types";
import { numberToNorwegianWords } from "./helpers/NumberConverter";
import { getShoeImageByColor, type ProductImageProps } from "./helpers/ProductImage";

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
  const [color, setColor] = useState<string>(
    productItem.availableColors?.[0] ?? "red"
  );

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Only set random values once after mount (like your original behavior).
  useEffect(() => {
    function pickRandom() {
      const sizes = productItem.availableSizes || [size];
      const types = productItem.availableTypes || [shoeType];
      const prices = productItem.prices || [shoePrice];
      const colors = productItem.availableColors || [color];

      setSize(sizes[Math.floor(Math.random() * sizes.length)]);
      setShoeType(types[Math.floor(Math.random() * types.length)]);
      setShoePrice(prices[Math.floor(Math.random() * prices.length)]);
      setColor(colors[Math.floor(Math.random() * colors.length)]);

      timerRef.current = setTimeout(pickRandom, Math.random() * 5000);
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
        selected: { size, shoeType, shoePrice, color },
        // include any props you want to persist
        meta: {
          availableSizes: productItem.availableSizes,
          availableTypes: productItem.availableTypes,
          availableColors: productItem.availableColors,
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
  ];

  return (
    <div className="w-full border border-gray-300 p-4 mb-4 flex items-center gap-4">
      <img
        src={getShoeImageByColor({ color: color as ProductImageProps["color"] })}
        alt={`${color} shoe`}
        className="w-1/2 h-80 object-contain border border-gray-300 p-2"
      />

      <div className="flex flex-col gap-4 w-1/2">
        <h1 className="text-6xl">{productItem.name}</h1>
        <p>{productItem.description}</p>
        <div className="bg-[#364a32] text-[#d0f0c9] border-2 border-[#d0f0c9] w-fit p-2 font-[digital]">
          {numberToNorwegianWords(shoePrice)} KR
        </div>

        <div className="p-2 flex flex-col bg-[#d0f0c9]">
          <p>
            Selected shoe size: <strong>{animalBySize[size]}</strong>
          </p>
          <p>
            Selected shoe type: <strong>{shoeType}</strong>
          </p>
        </div>

        <div className="flex justify-end w-full">
          <button
            className="hover:bg-[#364a32] bg-[#d0f0c9] py-4 px-8"
            onClick={addToCart}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  );
}
