import { ModeToggle } from "@/components/mode-toggle";
import { URLShortener } from "@/components/url-shortener";
import { Link } from "lucide-react";
import { getDictionary, Locale } from "./dictionaries";

interface HomeProps {
  params: {
    lang: Locale;
  };
}

export default async function Home({ params }: HomeProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <main className="min-h-screen bg-gradient-to-b from-background to-muted">
      <div className="absolute right-4 top-4">
        <ModeToggle />
      </div>
      <div className="container mx-auto px-4 py-16">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="flex items-center space-x-2">
            <Link className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">
              {dict.app_title as string}
            </h1>
          </div>
          <p className="text-lg text-muted-foreground text-center max-w-2xl">
            {dict.doc as string}
          </p>
          <URLShortener dict={dict} />
        </div>
      </div>
    </main>
  );
}
