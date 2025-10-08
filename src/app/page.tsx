// src/app/signals/page.tsx
import SignalCard from "@/components/SignalCard";
import { Data } from "@/lib/db";

export const dynamic = "force-dynamic";   // don't pre-render

export default async function SignalsPage() {
  const signals = await Data.listSignals(); // demo data in DEMO_MODE=true
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
