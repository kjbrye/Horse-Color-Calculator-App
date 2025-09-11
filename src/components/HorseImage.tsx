import React from "react";

const IMAGE_MAP: Record<string, string> = {
  Chestnut: "/horse/chestnut.svg",
  Bay: "/horse/bay.svg",
  Black: "/horse/black.svg",
};

function getImage(baseColor?: string, tags: string[] = []) {
  if (!baseColor) return undefined;
  if (baseColor === "Bay") {
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
  return IMAGE_MAP[baseColor];
}

export default function HorseImage({ baseColor, tags = [] }: { baseColor?: string; tags?: string[] }) {
  const src = getImage(baseColor, tags);
  if (!src) return null;
  return (
    <div className="w-full mb-4 flex items-center justify-center rounded-2xl border bg-white/80 shadow-sm p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${baseColor} horse`} className="w-64 h-64" />
    </div>
  );
}
