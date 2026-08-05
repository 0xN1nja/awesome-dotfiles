import type { Metadata } from "next";
import Script from "next/script";
import config from "~/config";

export const getSEOTags = ({
  title,
  description,
  keywords,
  images,
  canonicalUrlRelative,
  extraTags,
}: {
  title?: string;
  description?: string;
  keywords?: string[];
  images?: string[];
  canonicalUrlRelative?: string;
  extraTags?: Record<string, unknown>;
} = {}): Metadata => {
  const resolvedTitle = title || config.appName;
  const resolvedDescription = description || config.appDescription;
  const url = canonicalUrlRelative
    ? `https://${config.domainName}${canonicalUrlRelative}`
    : `https://${config.domainName}/`;

  return {
    title: resolvedTitle,
    description: resolvedDescription,
    keywords: keywords || [
      "dotfiles",
      "rice",
      "unixporn",
      "linux customization",
      "window manager",
      "desktop environment",
      "colorscheme",
      "terminal setup",
    ],
    applicationName: config.appName,

    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/"
        : `https://${config.domainName}/`,
    ),

    openGraph: {
      title: resolvedTitle,
      description: resolvedDescription,
      url,
      siteName: config.appName,
      locale: "en_US",
      type: "website",
      ...(images && images.length > 0 && { images }),
    },

    twitter: {
      title: resolvedTitle,
      description: resolvedDescription,
      card: "summary_large_image",
      ...(images && images.length > 0 && { images }),
    },

    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative },
    }),

    ...extraTags,
  };
};

export const renderSchemaTags = () => {
  return (
    <Script
      id="schemaTags"
      strategy="afterInteractive"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org",
          "@type": "WebSite",
          name: config.appName,
          description: config.appDescription,
          url: `https://${config.domainName}/`,
        }),
      }}
    />
  );
};
