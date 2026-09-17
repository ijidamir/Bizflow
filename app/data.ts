// Central place for dashboard mock data.
// Swap any of these arrays for real API/database data later -
// just keep the same field names, since the charts read these keys directly.

import { FarmCrop, Designer, Tenant } from "@/types/types";

export const performanceChart = [
  { business: "Farm", income: 2400000, fill: "var(--color-farm)" },
  { business: "Fashion House", income: 1800000, fill: "var(--color-fashionHouse)" },
  { business: "Properties", income: 1700000, fill: "var(--color-properties)" },
];

export const incomeVsExpenses = [
  { month: "May", income: 1600000, expenses: 900000 },
  { month: "Jun", income: 1750000, expenses: 1000000 },
  { month: "Jul", income: 2100000, expenses: 1300000 },
  { month: "Aug", income: 3900000, expenses: 1500000 },
];

export const incomeDistribution = [
  { business: "Farm", value: 2400000, fill: "var(--color-farm)" },
  { business: "Fashion House", value: 1800000, fill: "var(--color-fashionHouse)" },
  { business: "Properties", value: 1650000, fill: "var(--color-properties)" },
];

export const statCards = [
  {
    title: "Total Income",
    value: "₦5,850,000",
    change: "+12.5%",
    positive: true,
  },
  {
    title: "Total Expenses",
    value: "₦2,310,000",
    change: "+8.3%",
    positive: false,
  },
  {
    title: "Net Profit",
    value: "₦3,540,000",
    change: "+18.7%",
    positive: true,
  },
  {
    title: "Outstanding Payments",
    value: "₦1,240,000",
    change: "-5.2%",
    positive: false,
  },
];

export const recentActivity = [
  {
    title: "Farm expense recorded",
    subtitle: "Fertilizer purchase",
    date: "Aug 19, 2026",
    amount: "-₦250,000",
    positive: false,
  },
  {
    title: "Payment received from John Doe",
    subtitle: "House A rent for August",
    date: "Aug 19, 2026",
    amount: "+₦500,000",
    positive: true,
  },
  {
    title: "Designer payment recorded",
    subtitle: "Stella Creative - Weekly payment",
    date: "Aug 18, 2026",
    amount: "+₦120,000",
    positive: true,
  },
  {
    title: "Maintenance added",
    subtitle: "House B - Plumbing work",
    date: "Aug 18, 2026",
    amount: "-₦75,000",
    positive: false,
  },
];

export const farmProduction: FarmCrop[] = [
  { id: "1", crop: "Maize", plantingDate: "2026-05-10", qtyPlanted: 10000, expected: 8000, actual: null, status: "Growing" },
  { id: "2", crop: "Cassava", plantingDate: "2026-04-15", qtyPlanted: 5000, expected: 12000, actual: null, status: "Growing" },
  { id: "3", crop: "Tomatoes", plantingDate: "2026-06-01", qtyPlanted: 2000, expected: 4000, actual: 1200, status: "Growing" },
  { id: "4", crop: "Pepper", plantingDate: "2026-03-20", qtyPlanted: 1500, expected: 2500, actual: 2300, status: "Harvested" },
  { id: "5", crop: "Watermelon", plantingDate: "2026-02-10", qtyPlanted: 1000, expected: 2000, actual: 2000, status: "Completed" },
];

export const designers: Designer[] = [
  { id: "1", name: "Stella Creative", agreement: "Fixed Payment", amount: "₦120,000", frequency: "Weekly", status: "Active" },
  { id: "2", name: "Trendify", agreement: "Commission", amount: "15%", frequency: "Monthly", status: "Active" },
  { id: "3", name: "Elegant Stitches", agreement: "Fixed Payment", amount: "₦250,000", frequency: "Monthly", status: "Active" },
  { id: "4", name: "Moda House", agreement: "Commission", amount: "10%", frequency: "Monthly", status: "Inactive" },
];

export const tenants: Tenant[] = [
  { id: "1", name: "John Doe", property: "House A / A1", rent: "₦500,000", nextPayment: "Aug 25, 2026", status: "Paid" },
  { id: "2", name: "Mary Smith", property: "House A / A2", rent: "₦500,000", nextPayment: "Aug 25, 2026", status: "Due Soon" },
  { id: "3", name: "Peter Obi", property: "House B / B1", rent: "₦350,000", nextPayment: "Aug 10, 2026", status: "Overdue" },
  { id: "4", name: "James Brown", property: "House C / C1", rent: "₦400,000", nextPayment: "Aug 25, 2026", status: "Paid" },
];
