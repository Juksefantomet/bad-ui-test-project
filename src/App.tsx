// App.tsx
import "./App.css";
import { BadButton } from "bad-ui-fonanf";
import { Product } from "./components/Product";
import type { Product as ProductType } from "./components/Types"; // alias so it doesn't clash with component
import burger from "./assets/burger.png";
import { numberToNorwegianWords } from "./components/helpers/NumberConverter";

function App() {
  const availableColors = ["red", "yellow", "blue"];
  const advancedColors = [
    { color: "green", combo: [2, 3] },
    { color: "orange", combo: [1, 2] },
    { color: "purple", combo: [1, 3] },
  ];

  const products: ProductType[] = [
    {
      name: "storsko",
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
      </div>
    </>
  );
}

export default App;
