import SignalCard from "@/components/SignalCard";

async function fetchSignals() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL ?? ""}/api/signals`, {
    // In Next.js 14 server components, this is fine; route is on same host
    cache: "no-store"
  });
  if (!res.ok) throw new Error("Failed to load signals");
  const data = await res.json();
  return data.signals as any[];
}

export default async function SignalsPage() {
  const signals = await fetchSignals();
  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Signals</h1>
          <p className="text-white/70">Live feed of posted setups</p>
        </div>
      </div>

      <div className="grid gap-4">
        {signals.map((s) => (
          <SignalCard key={s.id} s={s} />
        ))}
      </div>
    </div>
  );
}
