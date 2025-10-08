import { PrismaClient } from "@prisma/client";
import { demoSignals } from "./demo";

export const DEMO_MODE = process.env.DEMO_MODE === "true";

let prisma: PrismaClient | null = null;

export function getPrisma() {
  if (!prisma) prisma = new PrismaClient();
  return prisma;
}

// Unified API the rest of the app can call
export const Data = {
  async listSignals() {
    if (DEMO_MODE) return demoSignals;
    const db = getPrisma();
    const rows = await db.signal.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map(r => ({
      id: r.id,
      symbol: r.symbol,
      market: r.market,
      direction: r.direction as "BUY" | "SELL",
      entry: r.entry,
      stop: r.stop,
      takeProfit: r.takeProfit,
      riskPct: r.riskPct,
      note: r.note ?? undefined,
      createdAt: r.createdAt.toISOString()
    }));
  },

  async createSignal(input: {
    symbol: string;
    market: string;
    direction: "BUY" | "SELL";
    entry: number;
    stop: number;
    takeProfit: number;
    riskPct?: number;
    note?: string;
  }) {
    if (DEMO_MODE) {
      // In demo, we DO NOT persist; return a fake row
      return {
        id: "demo-new-" + Math.random().toString(36).slice(2, 8),
        createdAt: new Date().toISOString(),
        riskPct: input.riskPct ?? 1,
        ...input
      };
    }
    const db = getPrisma();
    const author = await db.user.findFirst();
    const row = await db.signal.create({
      data: {
        symbol: input.symbol,
        market: input.market,
        direction: input.direction,
        entry: input.entry,
        stop: input.stop,
        takeProfit: input.takeProfit,
        riskPct: input.riskPct ?? 1,
        note: input.note,
        authorId: author?.id ?? (await db.user.create({
          data: { email: "creator@example.com" }
        })).id
      }
    });
    return {
      id: row.id,
      symbol: row.symbol,
      market: row.market,
      direction: row.direction as "BUY" | "SELL",
      entry: row.entry,
      stop: row.stop,
      takeProfit: row.takeProfit,
      riskPct: row.riskPct,
      note: row.note ?? undefined,
      createdAt: row.createdAt.toISOString()
    };
  }
};
