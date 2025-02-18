import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { signIn } from "./utils/auth";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      Hello D3Invoice user
    </div>
  );
}
