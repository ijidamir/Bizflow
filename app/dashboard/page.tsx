"use client";

import { motion } from "motion/react";
import { Wallet, TrendingDown, TrendingUp, Clock } from "lucide-react";
import StatCard from "@/components/Helper/StatCard";
import Greeting from "@/components/layout/Greeting";
import RevenueChart from "@/components/Charts/RevenueChart";
import IncomeVsExpenses from "@/components/Charts/IncomeVsExpenses";
import IncomeDistributionChart from "@/components/Charts/DonutChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { statCards, recentActivity } from "@/app/data";

const icons = [Wallet, TrendingDown, TrendingUp, Clock];
const iconColors = [
  { clr: "text-emerald-600", bg: "bg-emerald-50" },
  { clr: "text-red-500", bg: "bg-red-50" },
  { clr: "text-emerald-600", bg: "bg-emerald-50" },
  { clr: "text-amber-500", bg: "bg-amber-50" },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-6 p-4 sm:p-6"
    >
      <motion.div variants={item}>
        <Greeting />
      </motion.div>

      {/* Stat cards */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4"
      >
        {statCards.map((stat, i) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            positive={stat.positive}
            icon={icons[i]}
            iconClr={iconColors[i].clr}
            iconBg={iconColors[i].bg}
          />
        ))}
      </motion.div>

      {/* Charts row */}
      <motion.div
        variants={item}
        className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-3"
      >
        <RevenueChart />
        <IncomeVsExpenses />
        <IncomeDistributionChart />
      </motion.div>

      {/* Recent activity */}
      <motion.div variants={item}>
        <Card className="shadow-none">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent className="space-y-1">
            {recentActivity.map((activity) => (
              <div
                key={activity.title}
                className="flex items-center justify-between gap-3 rounded-lg px-2 py-2.5 hover:bg-accent/50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">
                    {activity.title}
                  </p>
                  <p className="truncate text-xs text-muted-foreground">
                    {activity.subtitle}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p
                    className={
                      activity.positive
                        ? "text-sm font-semibold text-emerald-600"
                        : "text-sm font-semibold text-red-500"
                    }
                  >
                    {activity.amount}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {activity.date}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  );
}
