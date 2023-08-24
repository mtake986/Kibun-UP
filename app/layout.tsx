'use client';
import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
// import Header from "../components/Header/Header";
// import Footer from "@/components/Footer/Footer";
import { AuthProvider, useAuth } from "../context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { QuoteProvider } from "../context/QuoteContext";
import { EventProvider } from "../context/EventContext";
import FtrFolder from "@/components/footerFolder/FtrFolder";
import Hdr from "@/components/hdrFolder/Hdr";
import { useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// export const metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();

  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <QuoteProvider>
            <EventProvider>
              <body className={poppins.className}>
                <main className="relative min-h-screen">
                  <Hdr />
                  <div className="container relative mx-auto max-w-2xl p-5 text-slate-800 sm:p-12">
                    {children}
                  </div>
                  <FtrFolder />
                </main>
                <Toaster />
              </body>
            </EventProvider>
          </QuoteProvider>
        </AuthProvider>
      </QueryClientProvider>
    </html>
  );
}
