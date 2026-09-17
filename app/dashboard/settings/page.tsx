"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import { Check, Moon, Sun, LogOut } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  getOwnerName,
  setOwnerName as saveOwnerName,
  getStoredPassword,
  setStoredPassword,
  logout,
} from "@/lib/auth";

export default function SettingsPage() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  const [name, setName] = useState("");
  const [nameSaved, setNameSaved] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSaved, setPasswordSaved] = useState(false);

  useEffect(() => {
    setMounted(true);
    setName(getOwnerName());
  }, []);

  function handleSaveName() {
    if (!name.trim()) return;
    saveOwnerName(name.trim());
    setNameSaved(true);
    setTimeout(() => setNameSaved(false), 2000);
  }

  function handleChangePassword() {
    setPasswordError("");
    if (currentPassword !== getStoredPassword()) {
      setPasswordError("Current password is incorrect.");
      return;
    }
    if (newPassword.length < 4) {
      setPasswordError("New password must be at least 4 characters.");
      return;
    }
    setStoredPassword(newPassword);
    setCurrentPassword("");
    setNewPassword("");
    setPasswordSaved(true);
    setTimeout(() => setPasswordSaved(false), 2000);
  }

  function handleLogout() {
    logout();
    router.push("/login");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4 p-4 sm:p-6">
      <div>
        <h1 className="text-xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">
          Manage your profile and app preferences.
        </p>
      </div>

      {/* Profile */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Profile</CardTitle>
          <CardDescription>
            This is the name shown in your dashboard greeting.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-1.5">
            <Label htmlFor="ownerName">Your Name</Label>
            <div className="flex gap-2">
              <Input
                id="ownerName"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <Button onClick={handleSaveName} className="shrink-0 gap-1.5">
                {nameSaved ? <Check className="h-4 w-4" /> : null}
                Save
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Appearance */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Appearance</CardTitle>
          <CardDescription>Choose how BizFlow looks on this device.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={mounted && theme === "light" ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={() => setTheme("light")}
            >
              <Sun className="h-4 w-4" />
              Light
            </Button>
            <Button
              variant={mounted && theme === "dark" ? "default" : "outline"}
              size="sm"
              className="gap-1.5"
              onClick={() => setTheme("dark")}
            >
              <Moon className="h-4 w-4" />
              Dark
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Password */}
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle className="text-base">Password</CardTitle>
          <CardDescription>
            Stored in this browser only, since there's no backend yet - change it
            from the default as soon as you can.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid gap-1.5">
            <Label htmlFor="currentPassword">Current Password</Label>
            <Input
              id="currentPassword"
              type="password"
              value={currentPassword}
              onChange={(e) => {
                setCurrentPassword(e.target.value);
                setPasswordError("");
              }}
            />
          </div>
          <div className="grid gap-1.5">
            <Label htmlFor="newPassword">New Password</Label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => {
                setNewPassword(e.target.value);
                setPasswordError("");
              }}
            />
          </div>
          {passwordError && (
            <p className="text-xs text-destructive">{passwordError}</p>
          )}
          <Button onClick={handleChangePassword} className="gap-1.5">
            {passwordSaved ? <Check className="h-4 w-4" /> : null}
            Update Password
          </Button>
        </CardContent>
      </Card>

      <Separator />

      <Button
        variant="outline"
        onClick={handleLogout}
        className="w-full gap-1.5 text-destructive hover:text-destructive sm:w-auto"
      >
        <LogOut className="h-4 w-4" />
        Log Out
      </Button>
    </div>
  );
}
