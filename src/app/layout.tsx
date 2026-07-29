import { fontMono, fontSans, fontSerif } from "~/components/ui/fonts";
import { getSEOTags, renderSchemaTags } from "~/lib/seo";
import { cn } from "~/lib/utils";
import RootProviders from "~/providers";
import "../styles/globals.css";

export const viewport = {
  viewportFit: "cover",
  width: "device-width",
  initialScale: 1,
  maximumScale: 3,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "black" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export const metadata = getSEOTags();

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(fontSans.variable, fontSerif.variable, fontMono.variable)}
    >
      <head>
        <link rel="alternate" type="text/plain" title="LLM-friendly summary" href="/llms.txt" />
      </head>
      <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.className)}>
        {renderSchemaTags()}

        <RootProviders>{children}</RootProviders>
      </body>
    </html>
  );
}
