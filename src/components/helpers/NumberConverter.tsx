// utils/numberToNorwegianWords.ts

const UNITS: { [key: number]: string } = {
  0: "null",
  1: "en",
  2: "to",
  3: "tre",
  4: "fire",
  5: "fem",
  6: "seks",
  7: "syv",   // or "sju" if you prefer
  8: "åtte",
  9: "ni",
  10: "ti",
  11: "elleve",
  12: "tolv",
  13: "tretten",
  14: "fjorten",
  15: "femten",
  16: "seksten",
  17: "sytten",
  18: "atten",
  19: "nitten",
};

const TENS: { [key: number]: string } = {
  20: "tjue",
  30: "tretti",
  40: "førti",
  50: "femti",
  60: "seksti",
  70: "sytti",
  80: "åtti",
  90: "nitti",
};

function toWordsBelow100(n: number): string {
  if (n < 20) {
    return UNITS[n];
  }

  const tens = Math.floor(n / 10) * 10;
  const rest = n % 10;

  if (rest === 0) {
    return TENS[tens];
  }

  // e.g. "seksti tre"
  return `${TENS[tens]} ${UNITS[rest]}`;
}

function toWordsBelow1000(n: number): string {
  if (n < 100) return toWordsBelow100(n);

  const hundreds = Math.floor(n / 100);
  const rest = n % 100;

  const hundredPart =
    hundreds === 1 ? "ett hundre" : `${UNITS[hundreds]} hundre`;

  if (rest === 0) return hundredPart;

  // "fire hundre og seksti"
  return `${hundredPart} og ${toWordsBelow100(rest)}`;
}

export function numberToNorwegianWords(n: number): string {
  if (!Number.isInteger(n)) {
    throw new Error("Only integers are supported.");
  }

  if (n === 0) return "NULL";

  if (n < -9999 || n > 9999) {
    throw new Error("Only numbers between -9999 and 9999 are supported.");
  }

  const isNegative = n < 0;
  const abs = Math.abs(n);

  let words: string;

  if (abs < 1000) {
    words = toWordsBelow1000(abs);
  } else {
    const thousands = Math.floor(abs / 1000);
    const rest = abs % 1000;

    const thousandPart =
      thousands === 1 ? "ett tusen" : `${UNITS[thousands]} tusen`;

    if (rest === 0) {
      words = thousandPart;
    } else if (rest < 100) {
      // "ett tusen og tretti fire"
      words = `${thousandPart} og ${toWordsBelow100(rest)}`;
    } else {
      // "ett tusen to hundre og tretti fire"
      words = `${thousandPart} ${toWordsBelow1000(rest)}`;
    }
  }

  if (isNegative) {
    words = `minus ${words}`;
  }

  // Return in ALL CAPS as you wanted: "FIRE HUNDRE OG SEKSTI"
  return words.toUpperCase();
}