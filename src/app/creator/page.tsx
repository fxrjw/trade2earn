"use client";

import { useState } from "react";
import { Button, Card, Input, Label } from "@/components/ui";

export default function CreatorPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    symbol: "EUR/USD",
    market: "FX",
    direction: "BUY",
    entry: "1.0700",
    stop: "1.0670",
    takeProfit: "1.0750",
    riskPct: "2",
    note: "Breakout with volume"
  });

  async function submit() {
    setLoading(true);
    try {
      const res = await fetch("/api/signals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          symbol: form.symbol,
          market: form.market,
          direction: form.direction,
          entry: Number(form.entry),
          stop: Number(form.stop),
          takeProfit: Number(form.takeProfit),
          riskPct: Number(form.riskPct),
          note: form.note || undefined
        })
      });
      const data = await res.json();
      alert(data.ok ? "Signal created (in demo: not persisted)" : "Error: " + data.error);
    } finally {
      setLoading(false);
    }
  }

  function onChange<K extends keyof typeof form>(k: K, v: string) {
    setForm({ ...form, [k]: v });
  }

  const isDemo = process.env.NEXT_PUBLIC_DEMO === "true" || process.env.DEMO_MODE === "true";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold">Creator</h1>
        <p className="text-white/70">Post a new signal.</p>
      </div>
      {isDemo && (
        <Card className="p-4 text-sm text-white/80">
          <b>DEMO MODE:</b> Posts will not be persisted. Set <code>DEMO_MODE=false</code> and add <code>DATABASE_URL</code> to use Prisma.
        </Card>
      )}
      <Card className="p-6 space-y-4">
        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <Label>Symbol</Label>
            <Input value={form.symbol} onChange={e => onChange("symbol", e.target.value)} />
          </div>
          <div>
            <Label>Market</Label>
            <Input value={form.market} onChange={e => onChange("market", e.target.value)} placeholder="FX / EQUITY / CRYPTO" />
          </div>
          <div>
            <Label>Direction</Label>
            <Input value={form.direction} onChange={e => onChange("direction", e.target.value)} placeholder="BUY or SELL" />
          </div>
          <div>
            <Label>Entry</Label>
            <Input type="number" value={form.entry} onChange={e => onChange("entry", e.target.value)} />
          </div>
          <div>
            <Label>Stop</Label>
            <Input type="number" value={form.stop} onChange={e => onChange("stop", e.target.value)} />
          </div>
          <div>
            <Label>Take Profit</Label>
            <Input type="number" value={form.takeProfit} onChange={e => onChange("takeProfit", e.target.value)} />
          </div>
          <div>
            <Label>Risk %</Label>
            <Input type="number" value={form.riskPct} onChange={e => onChange("riskPct", e.target.value)} />
          </div>
          <div className="md:col-span-2">
            <Label>Note</Label>
            <Input value={form.note} onChange={e => onChange("note", e.target.value)} />
          </div>
        </div>
        <Button onClick={submit} disabled={loading}>{loading ? "Posting..." : "Post Signal"}</Button>
      </Card>
    </div>
  );
}
