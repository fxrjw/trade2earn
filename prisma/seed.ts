import { PrismaClient, RiskMode } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  const rory = await prisma.user.upsert({
    where: { email: "rory@example.com" },
    update: {},
    create: {
      email: "rory@example.com",
      name: "Rory Wilson",
      riskMode: RiskMode.NORMAL,
      accountSize: 5000
    }
  });

  const s1 = await prisma.signal.create({
    data: {
      symbol: "EUR/USD",
      market: "FX",
      direction: "BUY",
      entry: 1.0700,
      stop: 1.0670,
      takeProfit: 1.0750,
      riskPct: 2,
      note: "Breakout with volume",
      authorId: rory.id
    }
  });

  await prisma.result.create({
    data: { signalId: s1.id, status: "WIN", pnlPct: 1.5 }
  });

  console.log("Seed complete");
}

main().finally(() => prisma.$disconnect());
