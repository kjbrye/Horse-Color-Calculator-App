import HorseColorCalculator from "@/components/HorseColorCalculator";

export default function Page() {
  return (
    <main className="container py-10">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Horse Coat Color Calculator</h1>
        <p className="mt-2 opacity-80">Explore genotypes and visualize the resulting phenotypes.</p>
      </div>
      <HorseColorCalculator />
      <footer className="mt-12 text-sm opacity-60 text-center">
        Built with Next.js + Tailwind. Install to your phone via “Add to Home Screen”.
      </footer>
    </main>
  );
}
