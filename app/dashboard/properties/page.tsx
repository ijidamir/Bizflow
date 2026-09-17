"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { tenants } from "@/app/data";
import { Tenant, TenantStatus } from "@/types/types";

const statusStyles: Record<TenantStatus, string> = {
  Paid: "bg-emerald-50 text-emerald-600 border-emerald-100",
  "Due Soon": "bg-amber-50 text-amber-600 border-amber-100",
  Overdue: "bg-red-50 text-red-500 border-red-100",
};

const emptyForm = {
  name: "",
  property: "",
  rent: "",
  nextPayment: "",
  status: "Paid" as TenantStatus,
};

export default function PropertiesPage() {
  const [rows, setRows] = useState<Tenant[]>(tenants);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function handleAdd() {
    if (!form.name || !form.property) return;

    const newTenant: Tenant = {
      id: crypto.randomUUID(),
      name: form.name,
      property: form.property,
      rent: form.rent,
      nextPayment: form.nextPayment,
      status: form.status,
    };

    setRows((prev) => [newTenant, ...prev]);
    setForm(emptyForm);
    setOpen(false);
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Properties / Tenants</CardTitle>
          <CardAction>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <Plus className="h-4 w-4" />
                  Add Tenant
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Tenant</DialogTitle>
                  <DialogDescription>
                    Add a new tenant. Stored in the browser for now.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Tenant Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="property">Property / Unit</Label>
                    <Input
                      id="property"
                      placeholder="e.g. House A / A1"
                      value={form.property}
                      onChange={(e) => setForm({ ...form, property: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor="rent">Rent</Label>
                      <Input
                        id="rent"
                        placeholder="e.g. ₦500,000"
                        value={form.rent}
                        onChange={(e) => setForm({ ...form, rent: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="next">Next Payment</Label>
                      <Input
                        id="next"
                        type="date"
                        value={form.nextPayment}
                        onChange={(e) => setForm({ ...form, nextPayment: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label>Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) => setForm({ ...form, status: v as TenantStatus })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Paid">Paid</SelectItem>
                        <SelectItem value="Due Soon">Due Soon</SelectItem>
                        <SelectItem value="Overdue">Overdue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAdd}>Add Tenant</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>

        <CardContent>
          <div className="hidden sm:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tenant</TableHead>
                  <TableHead>Property / Unit</TableHead>
                  <TableHead>Rent</TableHead>
                  <TableHead>Next Payment</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((t) => (
                  <TableRow key={t.id}>
                    <TableCell className="font-medium">{t.name}</TableCell>
                    <TableCell>{t.property}</TableCell>
                    <TableCell>{t.rent}</TableCell>
                    <TableCell>{t.nextPayment}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[t.status]}>
                        {t.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 sm:hidden">
            {rows.map((t) => (
              <div key={t.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{t.name}</p>
                  <Badge variant="outline" className={statusStyles[t.status]}>
                    {t.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">{t.property}</p>
                <div className="mt-2 flex justify-between text-sm">
                  <span className="font-medium">{t.rent}</span>
                  <span className="text-muted-foreground">Due {t.nextPayment}</span>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-3 text-xs text-muted-foreground">
            Showing 1 to {rows.length} of {rows.length} results
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
