"use client";

import { Dictionary } from "@/app/[lang]/dictionaries";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

type ShortenedURLProps = {
  url: string;
  dict: Dictionary;
};

export function ShortenedURL({ url, dict }: ShortenedURLProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    if (!navigator?.clipboard) {
      toast({
        title: dict.error_title.toString(),
        description: dict.clipboard_error.toString(),
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: dict.success_title.toString(),
        description: dict.success_description.toString(),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : dict.error_description.toString();

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
      console.error("Clipboard error:", error);
    }
  };

  return (
    <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div className="truncate mr-4">
          <p className="text-sm font-medium text-muted-foreground">
            {dict.app_title as string}:
          </p>
          <p className="text-primary font-medium">{url}</p>
        </div>
        <Button
          size="icon"
          variant="outline"
          onClick={copyToClipboard}
          className="hover:bg-primary hover:text-primary-foreground transition-colors"
        >
          <Copy className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}
