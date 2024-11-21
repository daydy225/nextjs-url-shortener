"use client";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Copy } from "lucide-react";

type ShortenedURLProps = {
  url: string;
};

export function ShortenedURL({ url }: ShortenedURLProps) {
  const { toast } = useToast();

  const copyToClipboard = async () => {
    if (!navigator?.clipboard) {
      toast({
        title: "Error",
        description: "Clipboard access not available in your browser.",
        variant: "destructive",
      });
      return;
    }

    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Success",
        description: "The shortened URL has been copied to your clipboard.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "Failed to copy URL to clipboard.";

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
            Shortened URL:
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
