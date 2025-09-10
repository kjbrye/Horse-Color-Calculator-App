import React from "react";

const IMAGE_MAP: Record<string, string> = {
  Chestnut: "/horse/chestnut.svg",
  Bay: "/horse/bay.svg",
  Black: "/horse/black.svg",
};

function getImage(name?: string) {
  if (!name) return undefined;
  return IMAGE_MAP[name];
}

export default function HorseImage({ baseColor }: { baseColor?: string }) {
  const src = getImage(baseColor);
  if (!src) return null;
  return (
    <div className="w-full mb-4 flex items-center justify-center rounded-2xl border bg-white/80 shadow-sm p-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={`${baseColor} horse`} className="w-32 h-32" />
    </div>
  );
}
