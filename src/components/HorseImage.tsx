import React from "react";

// Path shared by the simplified horse silhouette assets
const HORSE_PATH =
  "M22 6V9.5L20.5 10L18.96 7.54C18.83 7.33 18.5 7.42 18.5 7.67V11.25C18.5 12.23 18.11 13.11 17.5 13.78V21H15V15C14.92 15 14.84 15 14.75 15C14.54 15 14.33 14.97 14.13 14.94L9.69 14.2L8.57 16.21L9.53 21H7L6 16.25C5.97 15.95 6 15.65 6.16 15.39L7.18 13.58C6.2 13.03 5.53 12 5.5 10.81C5.46 10.96 5.44 11.18 5.47 11.5C5.5 11.94 5.61 12.59 5.54 13.31C5.5 14.03 5.17 14.77 4.75 15.26C4.32 15.75 3.85 16.09 3.35 16.35L2.65 15.65C2.84 15.18 3.03 14.76 3.07 14.37C3.13 14 3.06 13.7 2.95 13.43L2.42 12.31C2.21 11.79 1.95 11.05 2 10.18C2.03 9.33 2.5 8.22 3.39 7.61C4.29 7 5.26 6.92 6.05 7.08C6.55 7.18 7.06 7.42 7.5 7.76C7.87 7.59 8.3 7.5 8.75 7.5H14.5V7C14.5 4.79 16.29 3 18.5 3H22L21.11 4.34C21.65 4.7 22 5.31 22 6Z";

const COLOR_HEX: Record<string, string> = {
  Bay: "#8b4513",
  Black: "#000000",
  Chestnut: "#b87333",
  Palomino: "#f4c28a",
  Buckskin: "#d4a350",
  "Smoky Black": "#100c08",
  Cremello: "#fffdd0",
  Perlino: "#fff4c6",
  "Smoky Cream": "#f6f0e0",
  "Gold Champagne": "#f7e0b5",
  "Amber Champagne": "#e3b270",
  "Classic Champagne": "#bfa6a0",
  Mushroom: "#d8c8b0",
  "Red Dun": "#e1a95f",
  "Bay Dun": "#b8860b",
  Grullo: "#5a5a5a",
};

function getAsset(baseColor?: string, tags: string[] = []) {
  if (!baseColor) return undefined;

  if (baseColor === "Bay") {
    const hasOvero = tags.includes("Frame Overo");
    const hasSplash = tags.includes("Splashed White");
    const hasRoan = tags.includes("Roan");
    if (hasOvero) {
      return hasSplash
        ? "/horse/bay-splash-white-overo.svg"
        : "/horse/bay-overo.svg";
    }
    if (hasRoan) return "/horse/bay-roan.svg";
    return "/horse/bay.svg";
  }

  if (baseColor === "Chestnut") return "/horse/chestnut.svg";
  if (baseColor === "Black") return "/horse/black.svg";
  return undefined;
}

export default function HorseImage({
  baseColor,
  colorName,
  tags = [],
}: {
  baseColor?: string;
  colorName?: string;
  tags?: string[];
}) {
  const asset = getAsset(baseColor, tags);
  const fill = COLOR_HEX[colorName || ""];

  if (!asset && !fill) return null;

  return (
    <div className="w-full mb-4 flex items-center justify-center rounded-2xl border bg-white/80 shadow-sm p-4">
      {asset ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={asset} alt={`${colorName || baseColor} horse`} className="w-32 h-32" />
      ) : (
        <svg viewBox="0 0 24 24" className="w-32 h-32">
          <path d={HORSE_PATH} fill={fill} />
        </svg>
      )}
    </div>
  );
}
