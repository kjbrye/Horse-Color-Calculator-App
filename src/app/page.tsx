import HorseColorCalculator from "@/components/HorseColorCalculator";
import PlantProfile from "@/components/PlantProfile";

export default function Page() {
  return (
    <main className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Horse Coat Color Calculator</h1>
        <p className="mt-2 opacity-80">Explore genotypes and visualize the resulting phenotypes.</p>
      </div>
      <HorseColorCalculator />

      <section className="mt-16">
        <div className="mb-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-emerald-900">
            Featured Plant Profile
          </h2>
          <p className="mt-2 text-sm text-emerald-700">
            Quick-glance care metrics with fertilizer folded into the core stats.
          </p>
        </div>
        <PlantProfile />
      </section>
      <footer className="mt-12 text-sm opacity-60 text-center">
        Built with Next.js + Tailwind. Install to your phone via “Add to Home Screen”.
      </footer>
    </main>
  );
}
