import type { Metadata } from "next";
import "./globals.css";

// Import your client component
import LayoutClient from "@/components/LayoutClient";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";

export const metadata: Metadata = {
  title: "Clouds",
  description: "Clouds at your fingertips.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Remember, no "use client" here
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <LayoutClient>
            {children}
          </LayoutClient>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
