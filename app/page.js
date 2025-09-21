"use client"
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function Home() {
  const { setTheme } = useTheme();
  return (
    <div>
      <h2>Subscribe </h2>
      <Button>Subscribe</Button>
      <Button onClick={() => setTheme("dark")}>DarkMode</Button>
      <Button onClick={() => setTheme("light")}>LightMode</Button>
    </div>
  );
}
