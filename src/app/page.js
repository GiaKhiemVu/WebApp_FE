"use client";
import { dashboardRoute } from "@/route/route";
import { useEffect } from "react";
import "@/app/globals.css";

export default function Home() {
  useEffect(() => {
    window.location.href = dashboardRoute.home;
  }, []);
}
