import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { StatCardProps } from "@/types/types";

export default function StatCard({
  title,
  value,
  change,
  positive = true,
  icon: Icon,
  iconClr,
  iconBg,
}: StatCardProps) {
  return (
    <Card className="shadow-none">
      <CardContent className="flex min-w-0 items-center gap-4 p-5">
        <div
          className={cn(
            "flex size-12 shrink-0 items-center justify-center rounded-xl",
            iconBg
          )}
        >
          <Icon className={cn("size-5", iconClr)} />
        </div>

        <div className="flex min-w-0 flex-col gap-1.5">
          <p className="truncate text-sm text-muted-foreground">{title}</p>
          <p className="truncate text-2xl font-bold">{value}</p>
          <Badge
            variant="outline"
            className={cn(
              "w-fit text-[11px] font-semibold",
              positive
                ? "border-emerald-100 bg-emerald-50 text-emerald-600"
                : "border-red-100 bg-red-50 text-red-500"
            )}
          >
            {change}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
