"use client";

import React, { useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Info, Eraser, AlertTriangle, Sparkles, ChevronDown, ChevronRight } from "lucide-react";
import HorseImage from "./HorseImage";

/*
  Horse Coat Color Calculator — glam edition (fixed)
  ----------------------------------------------------
  • Blue gradient background, soft glass cards
  • Collapsible sections with chevrons
  • Active chips show pretty short names ("Cream", "Agouti", "SW1")
  • Dropdown titles use written names (e.g., "Mushroom") but choices remain genetic codes
  • Keeps all genetics logic and health advisories intact
  • Summary hides n/n and D: nd2/nd2
*/

// ---------- Option helpers ----------
const GG = (opts) => opts.map((v) => ({ label: v, value: v }));
function pairGenotypes(alleles) {
  const opts = [];
  for (let i = 0; i < alleles.length; i++) {
    for (let j = i; j < alleles.length; j++) {
      opts.push(`${alleles[i]}/${alleles[j]}`);
    }
  }
  return GG(opts);
}

// ---------- Genotype options ----------
const GENO_OPTIONS = {
  E: GG(["E/E", "E/e", "e/e"]),
  A: GG(["A/A", "A/a", "a/a"]),
  Z: GG(["Z/Z", "Z/n", "n/n"]),
  CR: GG(["CR/CR", "CR/n", "n/n"]),
  D: GG(["D/D", "D/nd1", "D/nd2", "nd1/nd1", "nd1/nd2", "nd2/nd2"]),
  CH: GG(["CH/CH", "CH/n", "n/n"]),
  PRL: GG(["PRL/PRL", "PRL/n", "n/n"]),
  MU: GG(["MU/MU", "MU/n", "n/n"]),
  G: GG(["G/G", "G/n", "n/n"]),
  RN: GG(["RN/RN", "RN/n", "n/n"]),
  SW1: GG(["SW1/SW1", "SW1/n", "n/n"]),
  SW2: GG(["SW2/SW2", "SW2/n", "n/n"]),
  SW3: GG(["SW3/SW3", "SW3/n", "n/n"]),
  TO: GG(["TO/TO", "TO/n", "n/n"]),
  O: GG(["O/O", "O/n", "n/n"]),
  SB1: GG(["SB1/SB1", "SB1/n", "n/n"]),
  W: pairGenotypes(["W3", "W10", "W19", "W20", "n"]),
  LP: GG(["LP/LP", "LP/n", "n/n"]),
  PATN1: GG(["PATN1/PATN1", "PATN1/n", "n/n"]),
};

// ---------- Genetics helpers ----------
function splitAB(val) {
  const parts = String(val || "n/n").split("/");
  return [parts[0] || "n", parts[1] || "n"];
}
function hasAllele(val, allele) { const [a, b] = splitAB(val); return a === allele || b === allele; }
function hasDominant(val, dom) { const [a, b] = splitAB(val); return (a || "").startsWith(dom) || (b || "").startsWith(dom); }
function countAllele(val, allele) { const [a, b] = splitAB(val); return Number(a === allele) + Number(b === allele); }
function countPrefix(val, prefix) { const [a, b] = splitAB(val); return Number((a || "").startsWith(prefix)) + Number((b || "").startsWith(prefix)); }

function baseCoat(E, A) {
  const hasE = hasDominant(E, "E");
  if (!hasE) return "Chestnut";
  const hasA = hasDominant(A, "A");
  return hasA ? "Bay" : "Black";
}

function applyDilutions(base, Z, CR, D, CH, PRL, MU) {
  let b = base;
  const notes = [];

  const chCopies = countAllele(CH, "CH");
  const prlCopies = countAllele(PRL, "PRL");
  const crCopies = countAllele(CR, "CR");
  const muCopies = countAllele(MU, "MU");

  // Champagne overrides base naming
  if (chCopies > 0) {
    if (base === "Chestnut") b = "Gold Champagne";
    else if (base === "Bay") b = "Amber Champagne";
    else b = "Classic Champagne";
  }

  // Cream (no rename if champagne already applied)
  if (chCopies === 0) {
    if (crCopies === 2) {
      if (base === "Chestnut") b = "Cremello";
      else if (base === "Bay") b = "Perlino";
      else b = "Smoky Cream";
    } else if (crCopies === 1) {
      if (base === "Chestnut") b = "Palomino";
      else if (base === "Bay") b = "Buckskin";
      else b = "Smoky Black";
    }
  } else if (crCopies > 0) {
    notes.push("with Cream");
  }

  // Pearl effects
  const hasPearlEffect = prlCopies === 2 || (prlCopies === 1 && crCopies === 1);
  if (hasPearlEffect && chCopies === 0) {
    if (prlCopies === 2) b = `Pearl (${base})`;
    else if (prlCopies === 1 && crCopies === 1) b = `Pearl-Cream (${base})`;
  }

  // Silver affects black pigment only
  if (hasDominant(Z, "Z")) {
    if (b.includes("Black") || b === "Black") b = b.replace("Black", "Silver Black");
    else if (b.includes("Bay") || b === "Bay" || b === "Buckskin") b = b.replace("Bay", "Silver Bay");
  }

  // Mushroom shows mostly on red bases
  if (muCopies > 0 && base === "Chestnut") b = "Mushroom";

  // Dun / nd1 / nd2
  if (hasAllele(D, "D")) {
    if (b.includes("Chestnut")) b = "Red Dun";
    else if (b.includes("Black")) b = "Grullo";
    else if (b.includes("Bay")) b = "Bay Dun";
    else b = `${b} Dun`;

    const lower = b.toLowerCase();
    if (lower.includes("buckskin") && lower.includes("dun")) b = `${b} (Dunskin)`;
    if (lower.includes("palomino") && lower.includes("dun")) b = `${b} (Dunalino)`;
  } else if (hasAllele(D, "nd1")) {
    notes.push("Primitive markings (non-dun1)");
  }

  return { base: b.trim(), notes };
}

function anySplash(g) { return ["SW1", "SW2", "SW3"].some((k) => hasDominant(g[k], k)); }

function wLabel(val) {
  const [a, b] = splitAB(val);
  const ws = [a, b].filter((x) => (x || "").startsWith("W"));
  if (ws.length === 0) return "";
  const uniq = Array.from(new Set(ws));
  return uniq.join("+");
}

function patternDescriptors(g) {
  const { RN, TO, O, SB1, W, LP, PATN1 } = g;
  const tags = [];
  const framePresent = hasDominant(O, "O");

  if (hasDominant(RN, "RN")) tags.push("Roan");

  if (hasDominant(TO, "TO") && framePresent) tags.push("Tobiano Overo (Tovero)");
  else if (hasDominant(TO, "TO")) tags.push("Tobiano");

  if (framePresent) tags.push("Frame Overo");
  if (hasDominant(SB1, "SB1")) tags.push("Sabino 1");
  if (anySplash(g)) tags.push("Splashed White");

  if (countPrefix(W, "W") >= 1) {
    const lab = wLabel(W);
    tags.push(`Dominant White (${lab})`);
  }

  if (hasDominant(LP, "LP")) {
    if (hasDominant(PATN1, "PATN1")) tags.push("Leopard Appaloosa");
    else tags.push("Appaloosa Complex");
  }
  return tags;
}

function applyGray(gray, phenotype) {
  if (!hasDominant(gray, "G")) return phenotype;
  return `Gray (born ${phenotype})`;
}

function alertNotes(g) {
  const alerts = [];
  if (countAllele(g.O, "O") === 2) alerts.push("OLW/OLW (lethal white) — non-viable");
  if (hasDominant(g.Z, "Z")) alerts.push("Silver → MCOA risk (ocular anomalies)");
  if (countAllele(g.LP, "LP") === 2) alerts.push("LP/LP → night blindness (CSNB) risk");
  if (countPrefix(g.W, "W") >= 2) alerts.push("Dominant White (DW/DW) — some alleles non‑viable (allele‑specific)");
  if (anySplash(g)) alerts.push("Splashed White / Macchiato lines may associate with deafness");
  if (hasDominant(g.TO, "TO") && hasDominant(g.O, "O")) alerts.push("Tobiano Overo (Tovero)");
  return alerts;
}

function computePhenotype(g) {
  const base = baseCoat(g.E, g.A);
  const { base: diluted, notes } = applyDilutions(base, g.Z, g.CR, g.D, g.CH, g.PRL, g.MU);
  const tags = patternDescriptors(g);
  const main = [diluted, ...tags].filter(Boolean).join(" ");
  const withNotes = notes.length ? `${main} ${notes.map((n) => `(${n})`).join(" ")}` : main;
  const text = applyGray(g.G, withNotes);
  const alerts = alertNotes(g);
  return { text, alerts, tags, notes, colorName: diluted };
}

// ---------- UI bits ----------
function Field({ label, value, onChange, options }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="text-xs uppercase tracking-wide text-gray-500">{label}</span>
      <select
        className="rounded-xl border px-3 py-2 bg-white/80 hover:bg-white transition shadow-sm focus:outline-none focus:ring w-full"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function Chip({ children, tone = "base" }: { children: React.ReactNode; tone?: string }) {
  const toneClass = (
    tone === "base" ? "border-sky-300/60 bg-sky-50/60" :
    tone === "dilution" ? "border-amber-300/60 bg-amber-50/60" :
    tone === "white" ? "border-indigo-300/60 bg-indigo-50/60" :
    "border-gray-300 bg-white/70"
  );
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs shadow-sm capitalize ${toneClass}`}>
      {children}
    </span>
  );
}

function Section({ title, subtitle, children, defaultOpen = true }: { title: string; subtitle?: string; children: React.ReactNode; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <Card className="rounded-2xl shadow-sm border-0 bg-white/80 backdrop-blur">
      <CardContent className="p-0">
        <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-6 py-4 text-left">
          <div>
            <div className="text-sm uppercase tracking-wider text-gray-500">{title}</div>
            {subtitle ? <div className="text-xs text-gray-500 mt-0.5">{subtitle}</div> : null}
          </div>
          {open ? <ChevronDown className="h-5 w-5 text-gray-400"/> : <ChevronRight className="h-5 w-5 text-gray-400"/>}
        </button>
        {open ? <div className="px-6 pb-6">{children}</div> : null}
      </CardContent>
    </Card>
  );
}

export default function HorseColorCalculator() {
  const defaultG = () => ({
    E: "E/E", A: "A/a", Z: "n/n", CR: "n/n", D: "nd2/nd2", CH: "n/n", PRL: "n/n", MU: "n/n",
    G: "n/n", RN: "n/n",
    SW1: "n/n", SW2: "n/n", SW3: "n/n",
    TO: "n/n", O: "n/n", SB1: "n/n", W: "n/n",
    LP: "n/n", PATN1: "n/n"
  });

  const [g, setG] = useState(defaultG());
  const phenotype = useMemo(() => computePhenotype(g), [g]);

  // Locus display names for prettier chips and dropdown titles
  const locusPretty = {
    E: "Extension", A: "Agouti", Z: "Silver", CR: "Cream", D: "Dun", CH: "Champagne", PRL: "Pearl", MU: "Mushroom",
    G: "Gray", RN: "Roan", SW1: "SW1", SW2: "SW2", SW3: "SW3", TO: "Tobiano", O: "Frame", SB1: "Sabino 1",
    W: "Dominant White", LP: "Leopard", PATN1: "PATN1",
  };

  // Summary: hide n/n and hide D: nd2/nd2
  const summary = useMemo(() => {
    const order = ["E","A","Z","CR","D","CH","PRL","MU","G","RN","SW1","SW2","SW3","TO","O","SB1","W","LP","PATN1"];
    const items = [];
    for (const k of order) {
      const v = g[k];
      if (!v || v === "n/n") continue;
      if (k === "D" && v === "nd2/nd2") continue;
      items.push(`${locusPretty[k]}: ${v}`);
    }
    return items;
  }, [g]);

  function setGene(key, val) { setG((prev) => ({ ...prev, [key]: val })); }
  function resetAll() { setG(defaultG()); }
  function loadExample() { setG({ ...defaultG(), E: "E/E", A: "A/a", Z: "Z/n", RN: "RN/n", SW1: "SW1/n" }); }

  // Chips per section (use pretty names only)
  function activeChips(keys, tone) {
    const list = [];
    for (const k of keys) {
      const v = g[k];
      if (!v || v === "n/n") continue;
      if (k === "D" && v === "nd2/nd2") continue;
      list.push(<Chip key={`${k}-${v}`} tone={tone}>{locusPretty[k]}</Chip>);
    }
    if (list.length === 0) return <span className="text-xs text-gray-400">No active selections</span>;
    return <div className="flex flex-wrap gap-2">{list}</div>;
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-50 via-white to-white py-10">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-3xl tracking-tight flex items-center gap-2">
              <Sparkles className="h-6 w-6"/> Horse Coat Color Calculator
            </h1>
            <p className="text-sm text-gray-600">Predict phenotype from genotypes, with health advisories.</p>
          </div>
          <div className="flex gap-2">
            <Button onClick={loadExample} className="rounded-2xl">Load Example</Button>
            <Button variant="secondary" onClick={resetAll} className="rounded-2xl"><Eraser className="h-4 w-4 mr-2"/>Reset</Button>
          </div>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Section title="Base & Modifiers" subtitle="Extension, Agouti, Gray" defaultOpen={true}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[["E", GENO_OPTIONS.E], ["A", GENO_OPTIONS.A], ["G", GENO_OPTIONS.G]].map(([gene, options]) => (
                  <Field key={gene} label={locusPretty[gene]} value={g[gene]} options={options} onChange={(v) => setGene(gene, v)} />
                ))}
              </div>
              <div className="mt-3 text-xs uppercase tracking-wide text-gray-500">Active in this section</div>
              {activeChips(["E","A","G"], "base")}
            </Section>

            <Section title="Dilutions" subtitle="Cream, Champagne, Pearl, Silver, Dun, Mushroom" defaultOpen={true}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[["CR", GENO_OPTIONS.CR], ["CH", GENO_OPTIONS.CH], ["PRL", GENO_OPTIONS.PRL], ["Z", GENO_OPTIONS.Z], ["D", GENO_OPTIONS.D], ["MU", GENO_OPTIONS.MU]].map(([gene, options]) => (
                  <Field key={gene} label={locusPretty[gene]} value={g[gene]} options={options} onChange={(v) => setGene(gene, v)} />
                ))}
              </div>
              <div className="mt-3 text-xs uppercase tracking-wide text-gray-500">Active in this section</div>
              {activeChips(["CR","CH","PRL","Z","D","MU"], "dilution")}
            </Section>

            <Section title="White & Spotting" subtitle="Roan, Splash (SW1–SW3), Tobiano, Frame, Sabino, Dominant White, Appaloosa" defaultOpen={true}>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {[["RN", GENO_OPTIONS.RN], ["SW1", GENO_OPTIONS.SW1], ["SW2", GENO_OPTIONS.SW2], ["SW3", GENO_OPTIONS.SW3], ["TO", GENO_OPTIONS.TO], ["O", GENO_OPTIONS.O], ["SB1", GENO_OPTIONS.SB1], ["W", GENO_OPTIONS.W], ["LP", GENO_OPTIONS.LP], ["PATN1", GENO_OPTIONS.PATN1]].map(([gene, options]) => (
                  <Field key={gene} label={locusPretty[gene]} value={g[gene]} options={options} onChange={(v) => setGene(gene, v)} />
                ))}
              </div>
              <div className="mt-3 text-xs uppercase tracking-wide text-gray-500">Active in this section</div>
              {activeChips(["RN","SW1","SW2","SW3","TO","O","SB1","W","LP","PATN1"], "white")}
            </Section>
          </div>

          <div className="lg:col-span-1 space-y-6">
            <Section title="Predicted phenotype" defaultOpen={true}>
              <HorseImage colorName={phenotype.colorName} />
              <div className="text-2xl leading-snug text-center">{phenotype.text || "—"}</div>

              {phenotype.tags && phenotype.tags.length > 0 ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  {phenotype.tags.map((t, i) => (
                    <Chip key={i}>{t}</Chip>
                  ))}
                </div>
              ) : null}

              {phenotype.alerts.length > 0 ? (
                <div className="mt-5 space-y-2">
                  {phenotype.alerts.map((h, i) => (
                    <div key={i} className="flex items-start gap-2 text-sm text-rose-700 bg-rose-50/70 border border-rose-200 rounded-xl px-3 py-2">
                      <AlertTriangle className="h-4 w-4 mt-0.5"/>
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              ) : null}

              <div className="mt-6 text-xs text-gray-500 flex gap-2">
                <Info className="h-4 w-4 mt-0.5"/>
                <p>Gray is shown as “Gray (born …)”. Silver affects black pigment; nd1 adds primitive markings only.</p>
              </div>
            </Section>

            <Section title="Summary" subtitle="Only loci with non‑n/n values are shown; D: nd2/nd2 hidden" defaultOpen={true}>
              {summary.length === 0 ? (
                <div className="text-sm text-gray-500">No variant alleles selected yet.</div>
              ) : (
                <ul className="text-sm text-gray-700 space-y-1">
                  {summary.map((s, i) => (<li key={i}>• {s}</li>))}
                </ul>
              )}
            </Section>
          </div>
        </div>

        <footer className="mt-10 text-center text-xs text-gray-400">Crafted for quick stable-side checks. Tweak genes, watch the phenotype update.</footer>
      </div>
    </div>
  );
}
