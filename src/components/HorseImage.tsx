import React from "react";

const IMAGE_MAP: Record<string, string> = {
  Chestnut: "/horse/chestnut.svg",
  Bay: "/horse/bay.svg",
  Black: "/horse/black.svg",
  "Amber Champagne": "/horse/Amber Champagne.svg",
  "Classic Champagne": "/horse/Classic Champagne.svg",
  Cremello: "/horse/Classic Champagne.svg",
};

function getImage(colorName?: string, tags: string[] = []) {
  if (!colorName) return undefined;
  if (colorName === "Bay Dun") {
    if (tags.includes("Roan")) return "/horse/Dun roan.svg";
    return "/horse/Dun.svg";
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
