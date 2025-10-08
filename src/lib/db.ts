// src/lib/db.ts
import { demoSignals } from "./demo";

// DEMO mode is default. Set DEMO_MODE=false to use Prisma.
export const DEMO_MODE = process.env.DEMO_MODE !== "false";

// Lazy/conditional Prisma load so builds don't break in demo mode
let prisma: any = null;

async function getPrisma() {
  if (DEMO_MODE) {
    throw new Error("Prisma is disabled in DEMO_MODE.");
  }
  if (!prisma) {
    // Only import when DEMO_MODE is false (prevents requiring generated client)
    const { PrismaClient } = await import("@prisma/client");
    prisma = new PrismaClient();
  }
  return prisma;
}

export const Data = {
  async listSignals() {
    if (DEMO_MODE) return demoSignals;

    const db = await getPrisma();
    const rows = await db.signal.findMany({ orderBy: { createdAt: "desc" } });
    return rows.map((r: any) => ({
      id: r.id,
      symbol: r.symbol,
      market: r.market,
      direction: r.direction as "BUY" | "SELL",
      entry: r.entry,
      stop: r.stop,
      takeProfit: r.takeProfit,
      riskPct: r.riskPct,
      note: r.note ?? undefined,
      createdAt: r.createdAt.toISOString(),
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
      // Demo: return a fake row (no persistence)
      return {
        id: "demo-new-" + Math.random().toString(36).slice(2, 8),
        createdAt: new Date().toISOString(),
        riskPct: input.riskPct ?? 1,
        ...input,
      };
    }

    const db = await getPrisma();
    const author =
      (await db.user.findFirst()) ??
      (await db.user.create({ data: { email: "creator@example.com" } }));

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
        authorId: author.id,
      },
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
      createdAt: row.createdAt.toISOString(),
    };
  },
};
