"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Mail, Lock, User, ArrowRight, Palette, Building2 } from "lucide-react";
import Image from "next/image";
import { useTheme } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function RegisterPage() {
  const router = useRouter();
  const { theme } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"CREATOR" | "BUSINESS">("CREATOR");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, role }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Registration failed");
        setLoading(false);
        return;
      }

      router.push(role === "CREATOR" ? "/onboarding/creator" : "/onboarding/business");
    } catch {
      setError("Something went wrong");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-2">
        <div className="flex justify-center">
          <Image
            src={theme === "dark" ? "/synq logo night mode.png" : "/synq logo light mode.png"}
            alt="SYNQ"
            width={120}
            height={38}
            className="h-9 w-auto object-contain"
          />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="text-sm text-text-secondary">Join SYNQ and start collaborating</p>
      </div>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg bg-error/10 px-4 py-3 text-sm text-error">{error}</div>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">I am a...</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRole("CREATOR")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200",
                  role === "CREATOR"
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-border text-text-secondary hover:border-accent/50"
                )}
              >
                <Palette className="h-6 w-6" />
                <span className="text-sm font-medium">Creator</span>
              </button>
              <button
                type="button"
                onClick={() => setRole("BUSINESS")}
                className={cn(
                  "flex flex-col items-center gap-2 rounded-xl border-2 p-4 transition-all duration-200",
                  role === "BUSINESS"
                    ? "border-accent bg-accent/5 text-accent"
                    : "border-border text-text-secondary hover:border-accent/50"
                )}
              >
                <Building2 className="h-6 w-6" />
                <span className="text-sm font-medium">Business</span>
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Full Name</label>
            <Input
              type="text"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={<User className="h-4 w-4" />}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Email</label>
            <Input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              icon={<Mail className="h-4 w-4" />}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-text-primary">Password</label>
            <Input
              type="password"
              placeholder="Min. 6 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={<Lock className="h-4 w-4" />}
              minLength={6}
              required
            />
          </div>

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? "Creating account..." : "Create account"}
            {!loading && <ArrowRight className="h-4 w-4" />}
          </Button>
        </form>
      </Card>

      <p className="text-center text-sm text-text-secondary">
        Already have an account?{" "}
        <Link href="/login" className="text-accent hover:underline font-medium">
          Sign in
        </Link>
      </p>
    </div>
  );
}
