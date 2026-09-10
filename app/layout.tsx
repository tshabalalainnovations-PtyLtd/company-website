import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Tshabalala Innovations",
  description:
    "Custom software, web and mobile applications, and intelligent business systems. Tshabalala Innovations turns complex challenges into practical digital solutions.",
  // Keep one browser icon source; the version refreshes cached starter icons.
  icons: {
    icon: { url: "/tshabalala-logo.png?v=2", type: "image/png" },
    apple: "/tshabalala-logo.png",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
