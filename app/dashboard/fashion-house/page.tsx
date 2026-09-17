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
import { designers } from "@/app/data";
import { Designer, FashionStatus } from "@/types/types";

const statusStyles: Record<FashionStatus, string> = {
  Active: "bg-emerald-50 text-emerald-600 border-emerald-100",
  Inactive: "bg-gray-100 text-gray-500 border-gray-200",
};

const emptyForm = {
  name: "",
  agreement: "Fixed Payment" as Designer["agreement"],
  amount: "",
  frequency: "Monthly" as Designer["frequency"],
  status: "Active" as FashionStatus,
};

export default function FashionHousePage() {
  const [rows, setRows] = useState<Designer[]>(designers);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  function handleAdd() {
    if (!form.name || !form.amount) return;

    const newDesigner: Designer = {
      id: crypto.randomUUID(),
      name: form.name,
      agreement: form.agreement,
      amount: form.amount,
      frequency: form.frequency,
      status: form.status,
    };

    setRows((prev) => [newDesigner, ...prev]);
    setForm(emptyForm);
    setOpen(false);
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Fashion House / Designers</CardTitle>
          <CardAction>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <Plus className="h-4 w-4" />
                  Add Designer
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Designer</DialogTitle>
                  <DialogDescription>
                    Add a new designer agreement. Stored in the browser for now.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="name">Designer Name</Label>
                    <Input
                      id="name"
                      placeholder="e.g. Stella Creative"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <Label>Agreement</Label>
                      <Select
                        value={form.agreement}
                        onValueChange={(v) =>
                          setForm({ ...form, agreement: v as Designer["agreement"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Fixed Payment">Fixed Payment</SelectItem>
                          <SelectItem value="Commission">Commission</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="grid gap-1.5">
                      <Label>Frequency</Label>
                      <Select
                        value={form.frequency}
                        onValueChange={(v) =>
                          setForm({ ...form, frequency: v as Designer["frequency"] })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Weekly">Weekly</SelectItem>
                          <SelectItem value="Monthly">Monthly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="amount">
                      Amount {form.agreement === "Commission" && "(%)"}
                    </Label>
                    <Input
                      id="amount"
                      placeholder={form.agreement === "Commission" ? "e.g. 15%" : "e.g. ₦120,000"}
                      value={form.amount}
                      onChange={(e) => setForm({ ...form, amount: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label>Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) => setForm({ ...form, status: v as FashionStatus })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAdd}>Add Designer</Button>
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
                  <TableHead>Designer</TableHead>
                  <TableHead>Agreement</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Frequency</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {rows.map((d) => (
                  <TableRow key={d.id}>
                    <TableCell className="font-medium">{d.name}</TableCell>
                    <TableCell>{d.agreement}</TableCell>
                    <TableCell>{d.amount}</TableCell>
                    <TableCell>{d.frequency}</TableCell>
                    <TableCell>
                      <Badge variant="outline" className={statusStyles[d.status]}>
                        {d.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="space-y-2 sm:hidden">
            {rows.map((d) => (
              <div key={d.id} className="rounded-lg border p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{d.name}</p>
                  <Badge variant="outline" className={statusStyles[d.status]}>
                    {d.status}
                  </Badge>
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {d.agreement} · {d.frequency}
                </p>
                <p className="mt-2 text-sm font-medium">{d.amount}</p>
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
