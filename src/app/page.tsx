import { Card } from "@/components/ui";
import RiskCalculator from "@/components/RiskCalculator";

export default async function Page() {
  return (
    <div className="space-y-6">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-white/70">Your quick overview and tools</p>
        </div>
      </div>

      <Card className="grid lg:grid-cols-3 gap-6 p-6">
        <div className="col-span-2 space-y-2">
          <div className="text-xl font-semibold">Equity Curve Simulator</div>
          <p className="text-sm text-white/70">Play with risk assumptions to see compounding effect.</p>
          <RiskCalculator />
        </div>
        <div className="space-y-2">
          <div className="text-xl font-semibold">Quick Tips</div>
          <ul className="list-disc list-inside text-white/80 text-sm">
            <li>Set risk per trade based on your plan (e.g., 1–2%).</li>
            <li>Track results (Win/Loss/BE) for better feedback loops.</li>
            <li>Only take A+ setups aligned with your edge.</li>
          </ul>
        </div>
      </Card>
    </div>
  );
}
