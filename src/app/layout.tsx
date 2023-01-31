"use client";
import "./globals.css";
import ProtectedRoute from "./ProtectedRoute";
import { Poppins } from "@next/font/google";

export const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  subsets: ["latin"],
  display: "optional",
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
