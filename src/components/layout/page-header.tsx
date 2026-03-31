import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function PageHeader({ title, description, action, className }: PageHeaderProps) {
  return (
    <div className={cn("flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between mb-10", className)}>
      <div>
        <h1 className="text-[28px] font-bold tracking-[-0.03em] text-text-primary">{title}</h1>
        {description && (
          <p className="mt-2 text-[15px] text-text-secondary">{description}</p>
        )}
      </div>
      {action && <div className="mt-4 sm:mt-0">{action}</div>}
    </div>
  );
}
