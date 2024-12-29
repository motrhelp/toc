import type { Metadata } from "next";
import "./globals.css";

// Import your client component
import LayoutClient from "@/components/LayoutClient";

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
        {/* Render your client layout */}
        <LayoutClient>
          {children}
        </LayoutClient>
      </body>
    </html>
  );
}
