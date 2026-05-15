import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { AuthProvider } from "@/components/auth/AuthProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Framework - AI Interior Design",
  description: "Transform your rooms with AI-powered interior design. Generate stunning 2D layouts, 3D renders, and walkthrough videos.",
  keywords: "AI interior design, room design, 3D rendering, home design",
  openGraph: {
    title: "Framework - AI Interior Design",
    description: "Transform your rooms with AI-powered interior design",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" data-scroll-behavior="smooth">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#101018",
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.1)",
              },
            }}
          />
        </AuthProvider>
      </body>
    </html>
  );
}
