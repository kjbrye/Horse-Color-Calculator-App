import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Sprout, Sun, ThermometerSun, FlaskConical, Leaf, TreePine } from "lucide-react";
import type React from "react";

type PlantStatTier = "primary" | "standard";

type PlantStat = {
  key: string;
  label: string;
  value: string;
  description?: string;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  tier: PlantStatTier;
};

type PlantProfile = {
  name: string;
  botanicalName: string;
  nickname: string;
  description: string;
  stats: PlantStat[];
  notes: string[];
};

const defaultIcon = Leaf;

export const plantProfileData: PlantProfile = {
  name: "Monstera deliciosa",
  botanicalName: "Monstera deliciosa",
  nickname: "Swiss Cheese Plant",
  description:
    "A climbing aroid prized for its fenestrated foliage. Provide warm, humid conditions and plenty of vertical support for mature growth.",
  stats: [
    {
      key: "sunlight",
      label: "Sunlight",
      value: "Bright, indirect light",
      description: "Avoid harsh afternoon sun to prevent leaf scorch.",
      icon: Sun,
      tier: "primary",
    },
    {
      key: "watering",
      label: "Watering",
      value: "Moderate — when top 2\u2033 of soil is dry",
      description: "Use lukewarm water and ensure thorough drainage.",
      icon: Droplets,
      tier: "primary",
    },
    {
      key: "humidity",
      label: "Humidity",
      value: "60%+ preferred",
      description: "Supplement with a pebble tray or humidifier in dry climates.",
      icon: ThermometerSun,
      tier: "primary",
    },
    {
      key: "fertilizerPlan",
      label: "Fertilizer plan",
      value: "Balanced 20-20-20 every 4 weeks in spring/summer",
      description: "Switch to a half-strength feed during fall and pause in winter.",
      icon: FlaskConical,
      tier: "standard",
    },
    {
      key: "soil",
      label: "Soil mix",
      value: "Chunky aroid blend (orchid bark, perlite, coco coir)",
      description: "Aim for a light mix that drains quickly but retains moisture.",
      icon: Sprout,
      tier: "standard",
    },
    {
      key: "support",
      label: "Support",
      value: "Train onto a moss pole or trellis for larger foliage",
      description: "Mist the pole to encourage aerial root attachment.",
      icon: TreePine,
      tier: "standard",
    },
  ],
  notes: [
    "Rotate the pot monthly so new leaves face different directions.",
    "Clean foliage with a damp cloth to keep pores clear.",
    "Inspect aerial roots — tuck them into the support or trim if unruly.",
  ],
};

function HighlightStat({ stat }: { stat: PlantStat }) {
  const Icon = stat.icon ?? defaultIcon;
  return (
    <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/80 p-5">
      <Icon className="h-6 w-6 text-emerald-500" />
      <div className="mt-4 text-xs font-semibold uppercase tracking-wide text-emerald-600">
        {stat.label}
      </div>
      <div className="mt-1 text-lg font-semibold text-emerald-900">{stat.value}</div>
      {stat.description ? (
        <p className="mt-2 text-sm text-emerald-700/90">{stat.description}</p>
      ) : null}
    </div>
  );
}

function StandardStat({ stat }: { stat: PlantStat }) {
  const Icon = stat.icon ?? defaultIcon;
  return (
    <li className="flex gap-3 rounded-2xl border border-slate-200/70 bg-white/80 p-4">
      <span className="mt-1 flex h-9 w-9 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <div className="text-sm font-semibold text-slate-900">{stat.label}</div>
        <div className="text-sm text-slate-600">{stat.value}</div>
        {stat.description ? (
          <p className="mt-1 text-xs text-slate-500">{stat.description}</p>
        ) : null}
      </div>
    </li>
  );
}

export default function PlantProfile() {
  const highlightStats = plantProfileData.stats.filter((stat) => stat.tier === "primary");
  const standardStats = plantProfileData.stats.filter((stat) => stat.tier === "standard");

  return (
    <section className="mx-auto flex w-full max-w-4xl flex-col gap-6">
      <Card className="border-none bg-gradient-to-br from-emerald-50 via-white to-white p-8 shadow-sm">
        <CardHeader className="mb-0">
          <CardTitle className="flex flex-col gap-2 text-3xl text-emerald-900">
            <span>{plantProfileData.name}</span>
            <span className="text-base font-normal text-emerald-600">
              {plantProfileData.nickname} · <em className="not-italic text-emerald-500">{plantProfileData.botanicalName}</em>
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="space-y-6">
            <p className="text-sm text-slate-600">{plantProfileData.description}</p>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
              {highlightStats.map((stat) => (
                <HighlightStat key={stat.key} stat={stat} />
              ))}
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Care stats
            </h4>
            <ul className="space-y-3">
              {standardStats.map((stat) => (
                <StandardStat key={stat.key} stat={stat} />
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-emerald-100/70 bg-white/80 p-6">
        <CardHeader className="mb-2">
          <CardTitle className="text-lg text-emerald-800">Pro tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc space-y-2 pl-5 text-sm text-slate-600">
            {plantProfileData.notes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </section>
  );
}
