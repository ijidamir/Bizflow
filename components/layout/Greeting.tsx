"use client";

import { useEffect, useState } from "react";
import { getOwnerName } from "@/lib/auth";

function getGreeting(hour: number) {
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
}

export default function Greeting() {
  // Start with null so the server and first client render match (avoids
  // a hydration mismatch), then fill in the real time once mounted.
  const [now, setNow] = useState<Date | null>(null);
  const [ownerName, setOwnerNameState] = useState("Lucy");

  useEffect(() => {
    setNow(new Date());
    setOwnerNameState(getOwnerName());
    const timer = setInterval(() => setNow(new Date()), 60 * 1000);
    return () => clearInterval(timer);
  }, []);

  const greeting = now ? getGreeting(now.getHours()) : "Welcome";
  const dateLabel = now
    ? now.toLocaleDateString("en-US", {
        weekday: "long",
        month: "long",
        day: "numeric",
      })
    : "";
  const timeLabel = now
    ? now.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : "";

  return (
    <div>
      <h1 className="text-2xl font-bold tracking-tight">
        {greeting}, {ownerName}
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {dateLabel} {timeLabel && `· ${timeLabel}`}
      </p>
    </div>
  );
}
