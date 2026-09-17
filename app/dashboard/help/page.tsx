import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { HelpCircle } from "lucide-react";

export default function HelpPage() {
  return (
    <div className="p-4 sm:p-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Help & Support</CardTitle>
          <CardDescription>Quick answers for using BizFlow.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <p className="text-sm font-medium">How do I add a new record?</p>
            <p className="text-sm text-muted-foreground">
              Open Farm, Fashion House, or Properties from the sidebar and use
              the "Add" button at the top right of the page.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">Why did my new entry disappear after refresh?</p>
            <p className="text-sm text-muted-foreground">
              There's no database connected yet - everything you add lives only
              in this browser tab until the backend is set up.
            </p>
          </div>
          <div>
            <p className="text-sm font-medium">How do I change my password?</p>
            <p className="text-sm text-muted-foreground">
              Go to Settings from the sidebar and update it under the
              Password section.
            </p>
          </div>
          <div className="flex items-center gap-2 pt-2 text-xs text-muted-foreground">
            <HelpCircle className="h-3.5 w-3.5" />
            More help topics will appear here as the app grows.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
