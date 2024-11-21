"use client";

import { ShortenedURL } from "@/components/shortened-url";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { URLForm } from "@/components/url-form";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

interface URLShortenerState {
  shortUrl: string;
  isLoading: boolean;
  error: string | null;
}

export function URLShortener() {
  const [state, setState] = useState<URLShortenerState>({
    shortUrl: "",
    isLoading: false,
    error: null,
  });
  const { toast } = useToast();

  const isValidUrl = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const generateShortUrl = (): string => {
    const timestamp = Date.now().toString(36);
    const randomStr = Math.random().toString(36).substring(2, 4);
    return `https://short.url/${timestamp}${randomStr}`;
  };

  async function onSubmit(url: string) {
    if (!isValidUrl(url)) {
      toast({
        title: "Invalid URL",
        description: "Please enter a valid URL including http:// or https://",
        variant: "destructive",
      });
      return;
    }

    setState((prev) => ({ ...prev, isLoading: true, error: null }));

    try {
      // Simulate API call with error handling
      await new Promise<void>((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.1) {
            resolve();
          } else {
            reject(new Error("Network error"));
          }
        }, 1000);
      });

      const shortened = generateShortUrl();
      setState((prev) => ({ ...prev, shortUrl: shortened }));

      toast({
        title: "Success!",
        description: "Your URL has been shortened successfully.",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "An unknown error occurred";
      setState((prev) => ({ ...prev, error: errorMessage }));

      toast({
        title: "Error",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setState((prev) => ({ ...prev, isLoading: false }));
    }
  }

  return (
    <Card className="w-full max-w-2xl shadow-lg">
      <CardHeader>
        <CardTitle>Shorten Your URL</CardTitle>
        <CardDescription>
          Enter a long URL below to create a shortened version.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <URLForm onSubmit={onSubmit} isLoading={state.isLoading} />
        {state.shortUrl && <ShortenedURL url={state.shortUrl} />}
        {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      </CardContent>
    </Card>
  );
}
