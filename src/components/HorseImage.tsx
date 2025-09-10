import React from "react";

// SVG path from Material Design Icons (Apache License 2.0)
const HORSE_PATH = "M22 6V9.5L20.5 10L18.96 7.54C18.83 7.33 18.5 7.42 18.5 7.67V11.25C18.5 12.23 18.11 13.11 17.5 13.78V21H15V15C14.92 15 14.84 15 14.75 15C14.54 15 14.33 14.97 14.13 14.94L9.69 14.2L8.57 16.21L9.53 21H7L6 16.25C5.97 15.95 6 15.65 6.16 15.39L7.18 13.58C6.2 13.03 5.53 12 5.5 10.81C5.46 10.96 5.44 11.18 5.47 11.5C5.5 11.94 5.61 12.59 5.54 13.31C5.5 14.03 5.17 14.77 4.75 15.26C4.32 15.75 3.85 16.09 3.35 16.35L2.65 15.65C2.84 15.18 3.03 14.76 3.07 14.37C3.13 14 3.06 13.7 2.95 13.43L2.42 12.3C2.21 11.79 1.95 11.05 2 10.18C2.03 9.33 2.5 8.22 3.39 7.61C4.29 7 5.26 6.92 6.05 7.08C6.55 7.18 7.06 7.42 7.5 7.76C7.87 7.59 8.3 7.5 8.75 7.5H14.5V7C14.5 4.79 16.29 3 18.5 3H22L21.11 4.34C21.65 4.7 22 5.31 22 6Z";

const COLOR_MAP: Record<string, string> = {
  "Chestnut": "#b87333",
  "Bay": "#8b4513",
  "Black": "#000000",
  "Palomino": "#e6b877",
  "Buckskin": "#c19a6b",
  "Smoky Black": "#100c08",
  "Cremello": "#fffdd0",
  "Perlino": "#e5d3b3",
  "Smoky Cream": "#f5f5dc",
  "Gold Champagne": "#f2c074",
  "Amber Champagne": "#d2a46c",
  "Classic Champagne": "#8c7853",
  "Red Dun": "#d26f4b",
  "Bay Dun": "#a16d4f",
  "Grullo": "#3f3f3f",
  "Mushroom": "#d4b5a2",
  "Silver Black": "#4d4d4d",
  "Silver Bay": "#7f5e3e"
};

function getColor(name?: string) {
  if (!name) return "#999999";
  return COLOR_MAP[name] ?? "#999999";
}

export default function HorseImage({ colorName }: { colorName?: string }) {
  const fill = getColor(colorName);
  return (
    <div className="w-full mb-4 flex items-center justify-center rounded-2xl border bg-white/80 shadow-sm p-4">
      <svg
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="w-32 h-32"
        fill={fill}
      >
        <path d={HORSE_PATH} />
      </svg>
    </div>
  );
}
