import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import "./globals.css";
import { Room } from "./Room";

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  weight: ["400", "500", "600", "700"]
});

export const metadata: Metadata = {
  title: "Figma clone",
  description:
    "A minimalist Figma clone using fabric.js and Liveblocks for realtime collaboration"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${workSans.className} bg-primary-grey-200`}>
        <Room> {children}</Room>
      </body>
    </html>
  );
}
