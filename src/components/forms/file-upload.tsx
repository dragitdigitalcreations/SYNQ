"use client";

import { useState, useCallback } from "react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  preview?: string | null;
  onRemove?: () => void;
  className?: string;
  label?: string;
}

export function FileUpload({
  onFileSelect,
  accept = "image/*",
  preview,
  onRemove,
  className,
  label = "Upload file",
}: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(e.type === "dragenter" || e.type === "dragover");
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect]
  );

  if (preview) {
    return (
      <div className={cn("relative inline-block", className)}>
        <img src={preview} alt="Preview" className="h-24 w-24 rounded-xl object-cover border border-border" />
        {onRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="absolute -top-2 -right-2 rounded-full bg-error p-1 text-white shadow-sm hover:bg-error/90 transition-colors"
            aria-label="Remove file"
          >
            <X className="h-3 w-3" />
          </button>
        )}
      </div>
    );
  }

  return (
    <label
      className={cn(
        "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border p-8 cursor-pointer",
        "transition-all duration-200",
        "hover:border-accent/50 hover:bg-accent/5",
        isDragging && "border-accent bg-accent/5",
        className
      )}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <div className="rounded-full bg-surface-elevated p-3">
        <Upload className="h-5 w-5 text-text-secondary" />
      </div>
      <div className="text-center">
        <p className="text-sm font-medium text-text-primary">{label}</p>
        <p className="text-xs text-text-secondary mt-1">Drag & drop or click to browse</p>
      </div>
      <input
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onFileSelect(file);
        }}
      />
    </label>
  );
}
