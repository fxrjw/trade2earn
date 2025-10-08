"use client";

import { useMemo, useState } from "react";
import { Card, Input, Label } from "@/components/ui";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export default function RiskCalculator() {
  const [balance, setBalance] = useState(5000);
  const [risk, setRisk] = useState(2);
  const [rr, setRR] = useState(2);

  const data = useMemo(() => {
    const arr = [];
    let b = balance;
    for (let i = 1; i <= 30; i++) {
      const r = (risk / 100) * (Math.random() < 0.5 ? -1 : rr);
      b = b * (1 + r / 100);
      arr.push({ day: i, equity: Number(b.toFixed(2)) });
    }
    return arr;
  }, [balance, risk, rr]);

  return (
    <Card className="space-y-4">
      <div className="grid md:grid-cols-3 gap-3">
        <div>
          <Label>Account Size ($)</Label>
          <Input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} />
        </div>
        <div>
          <Label>Risk per Trade (%)</Label>
          <Input type="number" value={risk} onChange={e => setRisk(Number(e.target.value))} />
        </div>
        <div>
          <Label>Reward : Risk</Label>
          <Input type="number" value={rr} onChange={e => setRR(Number(e.target.value))} />
        </div>
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="equity" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
