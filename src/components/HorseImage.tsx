import React from "react";

const BASE_PATH = "/horse/base";
const PATTERN_PATH = "/horse/patterns";

function toSlug(name: string): string {
  let n = name.toLowerCase();
  n = n.replace(/\s*\(.*?\)/g, "");
  let suffix = "";
  if (n.startsWith("silver ")) {
    n = n.replace(/^silver\s+/, "");
    suffix = "-silver";
  }
  if (n.startsWith("pearl-cream")) {
    n = n.replace("pearl-cream", "cream-pearl");
  } else if (n.startsWith("pearl")) {
    n = n.replace("pearl", "cream-pearl");
  }
  n = n.replace(/[^a-z0-9\s-]/g, "").trim().replace(/\s+/g, "-");
  return n + suffix;
}

function getBaseSrc(colorName?: string, tags: string[] = []) {
  if (!colorName) return undefined;
  let slug = toSlug(colorName);
  if (slug === "smoky-black") {
    slug = "black";
  }
  const base = tags.includes("Roan") ? `${slug}-roan` : slug;
  return `${BASE_PATH}/${base}.svg`;
}

function patternSlug(tag: string) {
  if (tag === "Roan") return undefined; // handled in base
  if (tag === "Tobiano Overo (Tovero)") return "tobiano";
  if (tag.startsWith("Dominant White")) return "dominant-white";
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function getPatternSrcs(tags: string[]) {
  return tags
    .map(patternSlug)
    .filter(Boolean)
    .map((slug) => `${PATTERN_PATH}/${slug}.svg`);
}

export default function HorseImage({
  colorName,
  tags = [],
}: {
  colorName?: string;
  tags?: string[];
}) {
  const base = getBaseSrc(colorName, tags);
  const overlays = getPatternSrcs(tags);
  if (!base) return null;
  return (
    <div className="w-full mb-4 flex items-center justify-center rounded-2xl border bg-white/80 shadow-sm p-4">
      <div className="relative w-64 h-64">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={base} alt={`${colorName} base`} className="absolute inset-0 w-full h-full" />
        {overlays.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={src} src={src} alt="" className="absolute inset-0 w-full h-full" />
        ))}
      </div>
    </div>
  );
}

