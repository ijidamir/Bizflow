"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
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
import { farmProduction } from "@/app/data";
import { FarmCrop, FarmStatus } from "@/types/types";

const statusStyles: Record<FarmStatus, string> = {
  Growing: "bg-blue-50 text-blue-600 border-blue-100",
  Harvested: "bg-amber-50 text-amber-600 border-amber-100",
  Completed: "bg-emerald-50 text-emerald-600 border-emerald-100",
};

const emptyForm = {
  crop: "",
  plantingDate: "",
  qtyPlanted: "",
  expected: "",
  status: "Growing" as FarmStatus,
};

export default function FarmPage() {
  const [crops, setCrops] = useState<FarmCrop[]>(farmProduction);
  const [tab, setTab] = useState("all");
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const filtered =
    tab === "all" ? crops : crops.filter((c) => c.status.toLowerCase() === tab);

  function handleAdd() {
    if (!form.crop || !form.plantingDate) return;

    const newCrop: FarmCrop = {
      id: crypto.randomUUID(),
      crop: form.crop,
      plantingDate: form.plantingDate,
      qtyPlanted: Number(form.qtyPlanted) || 0,
      expected: Number(form.expected) || 0,
      actual: null,
      status: form.status,
    };

    setCrops((prev) => [newCrop, ...prev]);
    setForm(emptyForm);
    setOpen(false);
  }

  return (
    <div className="space-y-4 p-4 sm:p-6">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Farm / Production</CardTitle>
          <CardAction>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" className="gap-1.5">
                  <Plus className="h-4 w-4" />
                  Add Production
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add Production</DialogTitle>
                  <DialogDescription>
                    Add a new crop to track. Stored in the browser for now.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-3">
                  <div className="grid gap-1.5">
                    <Label htmlFor="crop">Crop</Label>
                    <Input
                      id="crop"
                      placeholder="e.g. Maize"
                      value={form.crop}
                      onChange={(e) => setForm({ ...form, crop: e.target.value })}
                    />
                  </div>

                  <div className="grid gap-1.5">
                    <Label htmlFor="date">Planting Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={form.plantingDate}
                      onChange={(e) => setForm({ ...form, plantingDate: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="grid gap-1.5">
                      <Label htmlFor="qty">Qty Planted</Label>
                      <Input
                        id="qty"
                        type="number"
                        placeholder="0"
                        value={form.qtyPlanted}
                        onChange={(e) => setForm({ ...form, qtyPlanted: e.target.value })}
                      />
                    </div>
                    <div className="grid gap-1.5">
                      <Label htmlFor="expected">Expected</Label>
                      <Input
                        id="expected"
                        type="number"
                        placeholder="0"
                        value={form.expected}
                        onChange={(e) => setForm({ ...form, expected: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="grid gap-1.5">
                    <Label>Status</Label>
                    <Select
                      value={form.status}
                      onValueChange={(v) => setForm({ ...form, status: v as FarmStatus })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Growing">Growing</SelectItem>
                        <SelectItem value="Harvested">Harvested</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button onClick={handleAdd}>Add Production</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardAction>
        </CardHeader>

        <CardContent>
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="growing">Growing</TabsTrigger>
              <TabsTrigger value="harvested">Harvested</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
            </TabsList>

            <TabsContent value={tab}>
              <div className="hidden sm:block">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Crop</TableHead>
                      <TableHead>Planting Date</TableHead>
                      <TableHead>Qty Planted</TableHead>
                      <TableHead>Expected</TableHead>
                      <TableHead>Actual</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filtered.map((c) => (
                      <TableRow key={c.id}>
                        <TableCell className="font-medium">{c.crop}</TableCell>
                        <TableCell>{c.plantingDate}</TableCell>
                        <TableCell>{c.qtyPlanted.toLocaleString()}</TableCell>
                        <TableCell>{c.expected.toLocaleString()}</TableCell>
                        <TableCell>{c.actual ? c.actual.toLocaleString() : "-"}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={statusStyles[c.status]}>
                            {c.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              <div className="space-y-2 sm:hidden">
                {filtered.map((c) => (
                  <div key={c.id} className="rounded-lg border p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{c.crop}</p>
                      <Badge variant="outline" className={statusStyles[c.status]}>
                        {c.status}
                      </Badge>
                    </div>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Planted {c.plantingDate}
                    </p>
                    <div className="mt-2 flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        Planted: {c.qtyPlanted.toLocaleString()}
                      </span>
                      <span className="text-muted-foreground">
                        Expected: {c.expected.toLocaleString()}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {filtered.length === 0 && (
                <p className="py-8 text-center text-sm text-muted-foreground">
                  No crops in this category yet.
                </p>
              )}
            </TabsContent>
          </Tabs>

          <p className="mt-3 text-xs text-muted-foreground">
            Showing {filtered.length} of {crops.length} results
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
