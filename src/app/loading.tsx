import { Sparkles } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-accent to-[#00B8D9] animate-pulse">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <p className="text-sm text-text-secondary">Loading...</p>
      </div>
    </div>
  );
}
