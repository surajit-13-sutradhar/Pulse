import { NextSSRPlugin } from "@uploadthing/react/next-ssr-plugin";
import { extractRouterConfig } from "uploadthing/server";

import { ourFileRouter } from "./api/uploadthing/core";

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/ThemeProvider";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pulse",
  description: "A Social Media App- Powered by Next Js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    return (
        <ClerkProvider>
            <html lang="en" suppressHydrationWarning>
                <body
                    className={`${geistSans.variable} ${geistMono.variable} antialiased`}
                >   
                    <NextSSRPlugin 
                        routerConfig={extractRouterConfig(ourFileRouter)}
                    />
                    <ThemeProvider
                        attribute="class"
                        defaultTheme="system"
                        enableSystem
                    >   
                        <div className="w-full min-h-screen">
                            <Navbar />
                            <main className="py-8">
                            {/* container to center the content */}
                                <div className="max-w-7xl mx-auto px-4">
                                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                                        <div className="hidden lg:block lg:col-span-3">
                                        <Sidebar />
                                        {/* sidebar */}
                                        </div>
                                        <div className="lg:col-span-9">{children}</div>
                                    </div>
                                </div>
                            </main>
                        </div>
                        <Toaster />
                    </ThemeProvider>
                </body>
            </html>
        </ClerkProvider>
    );
}
