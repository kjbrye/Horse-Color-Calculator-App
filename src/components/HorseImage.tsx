import React from "react";

const IMAGE_MAP: Record<string, string> = {
  Chestnut: "/horse/chestnut.svg",
  Bay: "/horse/bay.svg",
  Black: "/horse/black.svg",
  "Amber Champagne": "/horse/amber-champagne.svg",
  "Classic Champagne": "/horse/classic-champagne.svg",
  Cremello: "/horse/Cremello.svg",
  Buckskin: "/horse/buckskin.svg",
  Palomino: "/horse/palomino.svg",
  "Silver Buckskin": "/horse/silver buckskin.svg",
  "Silver Bay": "/horse/Silver bay.svg",
};

function getImage(colorName?: string, tags: string[] = []) {
  if (!colorName) return undefined;
  if (colorName === "Cremello") {
    return "/horse/Cremello.svg";
  }
  if (colorName === "Bay Dun") {
    if (tags.includes("Frame Overo")) return "/horse/Overo Dun.svg";
    if (tags.includes("Roan")) return "/horse/bay-dun-roan.svg";
    return "/horse/Dun.svg";
  }
  if (colorName === "Grullo") {
    if (tags.includes("Frame Overo")) return "/horse/Overo Grullo.svg";
    if (tags.includes("Roan")) return "/horse/Grullo Roan.svg";
    return "/horse/Grullo.svg";
  }
  if (colorName === "Bay") {
    const hasSplash = tags.includes("Splashed White");
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    if (hasRoan) {
      if (hasOvero) {
        if (hasSplash) return "/horse/SW1 overo bay.svg";
        return "/horse/overo bay.svg";
      }
      if (hasSplash) return "/horse/SW1 bay roan.svg";
      return "/horse/bay roan.svg";
    }
    if (hasSplash && hasOvero) return "/horse/SW1 overo bay.svg";
    if (hasSplash) return "/horse/SW1 bay.svg";
    if (hasOvero) return "/horse/overo bay.svg";
  }
  if (colorName === "Chestnut") {
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    if (hasRoan) return "/horse/chestnut roan.svg";
    if (hasOvero) return "/horse/Overo chestnut.svg";
    return "/horse/chestnut.svg";
  }
  if (colorName === "Black") {
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    if (hasRoan) return "/horse/black roan.svg";
    if (hasOvero) return "/horse/overo black.svg";
    return "/horse/black.svg";
  }
  if (colorName === "Buckskin") {
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    if (hasRoan) return "/horse/buckskin roan.svg";
    if (hasOvero) return "/horse/overo buckskin.svg";
    return "/horse/buckskin.svg";
  }
  if (colorName === "Palomino") {
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    if (hasRoan) return "/horse/palomino roan.svg";
    if (hasOvero) return "/horse/overo palomino.svg";
    return "/horse/palomino.svg";
  }
  if (colorName === "Silver Buckskin") {
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    if (hasRoan) return "/horse/silver buckskin roan.svg";
    if (hasOvero) return "/horse/silver overo buckskin.svg";
    return "/horse/silver buckskin.svg";
  }
  if (colorName === "Silver Bay") {
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    if (hasOvero) return "/horse/overo Silver bay.svg";
    if (hasRoan) return "/horse/Silver bay roan.svg";
    return "/horse/Silver bay.svg";
  }
  if (colorName === "Silver Black") {
    if (tags.includes("Frame Overo")) return "/horse/silver overo black.svg";
    return "/horse/black.svg";
  }
  if (colorName.includes("Pearl")) {
    if (tags.includes("Frame Overo")) return "/horse/Overo Pearl or Cream pearl.svg";
    return "/horse/Pearl or Cream pearl.svg";
  }
  return IMAGE_MAP[colorName];
}

export default function HorseImage({ colorName, tags = [] }: { colorName?: string; tags?: string[] }) {
  const src = getImage(colorName, tags);
  if (!src) return null;
  return (
    <div className="w-full mb-4 flex items-center justify-center rounded-2xl border bg-white/80 shadow-sm p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${colorName} horse`} className="w-64 h-64" />
    </div>
  );
}
