export type DemoSignal = {
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

export const demoSignals: DemoSignal[] = [
  {
    id: "demo-1",
    symbol: "EUR/USD",
    market: "FX",
    direction: "BUY",
    entry: 1.0700,
    stop: 1.0670,
    takeProfit: 1.0750,
    riskPct: 2,
    note: "Breakout with volume (demo)",
    createdAt: new Date().toISOString()
  },
  {
    id: "demo-2",
    symbol: "SPY",
    market: "EQUITY",
    direction: "SELL",
    entry: 534.2,
    stop: 538.5,
    takeProfit: 525.0,
    riskPct: 1,
    note: "Rejection at ATH zone (demo)",
    createdAt: new Date().toISOString()
  }
];
