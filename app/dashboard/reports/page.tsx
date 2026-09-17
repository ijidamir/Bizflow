import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart3 } from "lucide-react";

export default function ReportsPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Reports</CardTitle>
          <CardDescription>
            Detailed reports across Farm, Fashion House, and Properties.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-center gap-2 py-16 text-center text-muted-foreground">
            <BarChart3 className="h-8 w-8" />
            <p className="text-sm">
              Reports are coming soon - this page is ready to build once the
              backend and data are wired in.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
