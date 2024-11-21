"use client";

import { Dictionary } from "@/app/[lang]/dictionaries";
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

export function URLShortener({ dict }: { dict: Dictionary }) {
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
        title: dict.toast_invalid_url_title.toString(),
        description: dict.toast_invalid_url_description.toString(),
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
        title: dict.success_title.toString(),
        description: dict.success_description.toString(),
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : `${dict.toast_invalid_url_title}`;
      setState((prev) => ({ ...prev, error: errorMessage }));

      toast({
        title: dict.toast_invalid_url_title.toString(),
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
        <CardTitle>{dict.card_title as string}</CardTitle>
        <CardDescription>{dict.card_description as string}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <URLForm onSubmit={onSubmit} isLoading={state.isLoading} dict={dict} />
        {state.shortUrl && <ShortenedURL url={state.shortUrl} dict={dict} />}
        {state.error && <p className="text-sm text-red-500">{state.error}</p>}
      </CardContent>
    </Card>
  );
}
