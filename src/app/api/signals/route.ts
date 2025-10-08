// src/app/api/signals/route.ts
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { Data } from "@/lib/db";

export async function GET() {
  const signals = await Data.listSignals();
  return NextResponse.json({ signals });
}

const schema = z.object({
  symbol: z.string(),
  market: z.string(),
  direction: z.enum(["BUY", "SELL"]),
  entry: z.number(),
  stop: z.number(),
  takeProfit: z.number(),
  riskPct: z.number().optional(),
  note: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = schema.parse(body);
    const created = await Data.createSignal(input);
    return NextResponse.json({ ok: true, signal: created });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: e.message }, { status: 400 });
  }
}
