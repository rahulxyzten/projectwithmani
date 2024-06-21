import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/Providers";

export const metadata: Metadata = {
  title: "Project With Mani",
  description: "Project With Mani",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="dark min-h-screen bg-black-100 font-poppins">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
