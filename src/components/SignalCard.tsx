import { Card } from "@/components/ui";

export type Signal = {
  id: string;
  symbol: string;
  market: string;
  direction: "BUY" | "SELL";
  entry: number;
  stop: number;
  takeProfit: number;
  riskPct: number;
  note?: string;
  createdAt: string;
};

export default function SignalCard({ s }: { s: Signal }) {
  return (
    <Card className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="text-lg font-semibold">{s.symbol}</div>
        <div className="text-xs px-2 py-1 rounded-full border border-white/15">
          {s.market}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
        <div><span className="text-white/60">Direction</span><div className="font-medium">{s.direction}</div></div>
        <div><span className="text-white/60">Entry</span><div className="font-medium">{s.entry}</div></div>
        <div><span className="text-white/60">Stop</span><div className="font-medium">{s.stop}</div></div>
        <div><span className="text-white/60">Take Profit</span><div className="font-medium">{s.takeProfit}</div></div>
      </div>
      <div className="text-sm">
        <span className="text-white/60">Risk %</span>{" "}
        <span className="font-medium">{s.riskPct}</span>
      </div>
      {s.note && <div className="text-sm text-white/80">{s.note}</div>}
      <div className="text-xs text-white/50">{new Date(s.createdAt).toLocaleString()}</div>
    </Card>
  );
}
