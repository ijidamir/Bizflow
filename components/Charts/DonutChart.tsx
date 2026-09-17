"use client";

import { useMemo } from "react";
import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { incomeDistribution } from "@/app/data";

const chartConfig = {
  value: { label: "Income" },
  farm: { label: "Farm", color: "hsl(var(--chart-1))" },
  fashionHouse: { label: "Fashion House", color: "hsl(var(--chart-2))" },
  properties: { label: "Properties", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

function formatNairaShort(value: number) {
  return `₦${(value / 1_000_000).toFixed(2)}M`;
}

// Maps each business to its chartConfig key, so the legend outside the
// chart (which can't see the chart's scoped --color-* variables) can use
// the same colors via the global --chart-N variables instead.
const legendColorKey: Record<string, "farm" | "fahion House" | "properties"> = {
  Farm: "farm",
  "Fashion House": "fashionHouse",
  Properties: "properties",
};

export default function IncomeDistributionChart() {
  const total = useMemo(
    () => incomeDistribution.reduce((sum, d) => sum + d.value, 0),
    []
  );

  return (
    <Card className="flex h-full min-w-0 flex-col shadow-none">
      <CardHeader>
        <CardTitle>Income Distribution</CardTitle>
        <CardDescription>Share of total income</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col items-center gap-4 sm:flex-row">
        <ChartContainer
          config={chartConfig}
          className="aspect-square h-[200px] w-[200px] shrink-0"
        >
          <PieChart>
            <ChartTooltip
              content={
                <ChartTooltipContent
                  formatter={(value) => formatNairaShort(Number(value))}
                  hideLabel
                />
              }
            />
            <Pie
              data={incomeDistribution}
              dataKey="value"
              nameKey="business"
              innerRadius={58}
              outerRadius={84}
              strokeWidth={2}
            >
              {incomeDistribution.map((entry) => (
                <Cell key={entry.business} fill={entry.fill} />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>

        <div className="flex min-w-0 flex-1 flex-col gap-3">
          <div>
            <p className="truncate text-xl font-bold leading-none">
              {formatNairaShort(total)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">Total Income</p>
          </div>
          {incomeDistribution.map((d) => (
            <div
              key={d.business}
              className="flex items-center justify-between gap-2 text-sm"
            >
              <div className="flex min-w-0 items-center gap-2">
                <span
                  className="h-2.5 w-2.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor: chartConfig[legendColorKey[d.business]].color,
                  }}
                />
                <span className="truncate text-muted-foreground">
                  {d.business}
                </span>
              </div>
              <span className="shrink-0 font-medium">
                {Math.round((d.value / total) * 100)}%
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
