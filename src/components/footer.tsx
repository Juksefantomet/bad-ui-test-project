import { numberToNorwegianWords } from "./helpers/NumberConverter";
import burger from "../assets/burger.png";

interface FooterProps {
    // Price to display in the footer
    price: number;
}

export function Footer({ price }: FooterProps) {
  return (
    <div className="bg-[#364a32] text-[#d0f0c9] flex justify-between items-center p-4 absolute bottom-0 w-full">
      <img className="w-12 h-12" src={burger} alt="Burger menu icon" />
      <h1 className="text-2xl">Sko-pa-fot.com</h1>
      <div className="border-[#d0f0c9] border p-1 text-2xl font-[digital]">
        {numberToNorwegianWords(price) + " KR"}
      </div>
    </div>
  );
}
