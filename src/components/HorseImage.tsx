import React from "react";

function getImage(baseColor?: string, tags: string[] = []) {
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
  tags = [],
}: {
  baseColor?: string;
  tags?: string[];
}) {
  const src = getImage(baseColor, tags);
  if (!src) return null;
  return (
    <div className="w-full mb-4 flex items-center justify-center rounded-2xl border bg-white/80 shadow-sm p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${baseColor} horse`} className="w-32 h-32" />
    </div>
  );
}
