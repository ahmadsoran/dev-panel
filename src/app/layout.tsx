"use client";
import "./globals.css";
import ProtectedRoute from "./ProtectedRoute";
import { Poppins } from "@next/font/google";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: "block",
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.className}>
      <head />
      <body>
        {/* @ts-ignore */}
        <ProtectedRoute>{children}</ProtectedRoute>
      </body>
    </html>
  );
}
