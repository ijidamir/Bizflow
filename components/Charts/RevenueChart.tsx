"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from "recharts";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import { performanceChart } from "@/app/data";

const chartConfig = {
  income: { label: "Income" },
  farm: { label: "Farm", color: "hsl(var(--chart-1))" },
  fashionHouse: { label: "Fashion House", color: "hsl(var(--chart-2))" },
  properties: { label: "Properties", color: "hsl(var(--chart-3))" },
} satisfies ChartConfig;

function formatNaira(value: number) {
  if (value >= 1_000_000) return `₦${(value / 1_000_000).toFixed(1)}M`;
  if (value >= 1_000) return `₦${(value / 1_000).toFixed(0)}k`;
  return `₦${value}`;
}

export default function RevenueChart() {
  return (
    <Card className="flex h-full min-w-0 flex-col shadow-none">
      <CardHeader>
        <CardTitle>Business Performance</CardTitle>
        <CardDescription>Monthly revenue by business</CardDescription>
        <CardAction>
          <Select defaultValue="this-month">
            <SelectTrigger>
              <SelectValue placeholder="This Month" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="this-month">This Month</SelectItem>
              <SelectItem value="last-month">Last Month</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
            </SelectContent>
          </Select>
        </CardAction>
      </CardHeader>

      <CardContent className="flex-1">
        <ChartContainer config={chartConfig} className="h-[260px] w-full">
          <BarChart
            data={performanceChart}
            margin={{ top: 8, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="business"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              fontSize={12}
              tickFormatter={formatNaira}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  formatter={(value) => formatNaira(Number(value))}
                />
              }
            />
            <Bar dataKey="income" radius={[6, 6, 0, 0]} barSize={48}>
              {performanceChart.map((entry) => (
                <Cell key={entry.business} fill={entry.fill} />
              ))}
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
