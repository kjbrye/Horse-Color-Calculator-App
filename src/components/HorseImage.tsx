import React from "react";

const IMAGE_MAP: Record<string, string> = {
  Chestnut: "/horse/chestnut.svg",
  Bay: "/horse/bay.svg",
  Black: "/horse/black.svg",
  "Amber Champagne": "/horse/amber-champagne.svg",
  "Classic Champagne": "/horse/classic-champagne.svg",
  Cremello: "/horse/cremello.svg",
  Buckskin: "/horse/buckskin.svg",
  Palomino: "/horse/palomino.svg",
  "Silver Buckskin": "/horse/silver buckskin.svg",
  "Silver Bay": "/horse/Silver bay.svg",
};

function getImage(colorName?: string, tags: string[] = []) {
  if (!colorName) return undefined;
  if (colorName === "Cremello") {
    return "/horse/cremello.svg";
  }
  if (colorName === "Bay Dun") {
    if (tags.includes("Frame Overo")) return "/horse/bay-dun-overo.svg";
    if (tags.includes("Roan")) return "/horse/bay-dun-roan.svg";
    return "/horse/bay-dun.svg";
  }
  if (colorName === "Grullo") {
    if (tags.includes("Frame Overo")) return "/horse/grullo-overo.svg";
    if (tags.includes("Roan")) return "/horse/grullo-roan.svg";
    return "/horse/grullo.svg";
  }
  if (colorName === "Bay") {
    const hasSplash = tags.includes("Splashed White");
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    if (hasRoan) {
      if (hasOvero) {
        if (hasSplash) return "/horse/bay-overo-splash.svg";
        return "/horse/overo bay.svg";
      }
      if (hasSplash) return "/horse/bay-roan-splash.svg";
      return "/horse/bay roan.svg";
    }
    if (hasSplash && hasOvero) return "/horse/bay-overo-splash.svg";
    if (hasSplash) return "/horse/bay-splash.svg";
    if (hasOvero) return "/horse/overo bay.svg";
  }
  if (colorName === "Chestnut") {
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    const hasSplash = tags.includes("Splashed White");
    if (hasRoan) return "/horse/chestnut roan.svg";
    if (hasOvero) return "/horse/Overo chestnut.svg";
    if (hasSplash) return "/horse/chestnut-splash.svg";
    return "/horse/chestnut.svg";
  }
  if (colorName === "Black") {
    const hasOvero = tags.includes("Frame Overo");
    const hasRoan = tags.includes("Roan");
    const hasSplash = tags.includes("Splashed White");
    if (hasRoan) return "/horse/black roan.svg";
    if (hasOvero && hasSplash) return "/horse/black-overo-splash.svg";
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
    const hasOvero = tags.includes("Frame Overo");
    const hasSplash = tags.includes("Splashed White");
    if (hasOvero && hasSplash) return "/horse/cream-pearl-overo-splash.svg";
    if (hasOvero) return "/horse/cream-pearl-overo.svg";
    return "/horse/cream-pearl.svg";
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
