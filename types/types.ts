import { LucideIcon } from "lucide-react";

export type StatCardProps = {
  title: string;
  value: string;
  change: string;
  positive?: boolean;
  icon: LucideIcon;
  iconClr: string;
  iconBg: string;
};

export type NavItemType = {
  label: string;
  href: string;
  icon: LucideIcon;
};

export type NavGroupType = {
  heading?: string;
  items: NavItemType[];
};

export type FarmStatus = "Growing" | "Harvested" | "Completed";

export type FarmCrop = {
  id: string;
  crop: string;
  plantingDate: string;
  qtyPlanted: number;
  expected: number;
  actual: number | null;
  status: FarmStatus;
};

export type FashionStatus = "Active" | "Inactive";

export type Designer = {
  id: string;
  name: string;
  agreement: "Fixed Payment" | "Commission";
  amount: string;
  frequency: "Weekly" | "Monthly";
  status: FashionStatus;
};

export type TenantStatus = "Paid" | "Due Soon" | "Overdue";

export type Tenant = {
  id: string;
  name: string;
  property: string;
  rent: string;
  nextPayment: string;
  status: TenantStatus;
};

