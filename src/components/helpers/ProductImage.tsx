import redShoe from "../../assets/shoe-red.png";
import blueShoe from "../../assets/shoe-blue.png";
import pinkShoe from "../../assets/shoe-yellow.png";
import yellowShoe from "../../assets/shoe-pink.png";

export interface ProductImageProps {
    color: 'red' | 'blue' | 'pink' | 'yellow';
}

export function getShoeImageByColor({ color }: ProductImageProps) {
    switch (color) {
        case "red":
            return redShoe;
        case "blue":
            return blueShoe;
        case "pink":
            return pinkShoe;
        case "yellow":
            return yellowShoe;
        default:
            return redShoe; // Fallback image
    }
}