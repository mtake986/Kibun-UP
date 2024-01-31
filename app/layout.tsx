import "./globals.css";
import { Inter } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { QuoteProvider } from "../context/QuoteContext";
import { EventProvider } from "../context/EventContext";
import Footer from "@/components/footer/Footer";
import Header from "@/components/header/Header";
import { fontRaleway } from "@/components/utils/fonts";
import { ThemeProvider } from "./theme-provider";

// const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Kibun UP",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
        <AuthProvider>
          <QuoteProvider>
            <EventProvider>
              <body className={`${fontRaleway.className}`}>
                <ThemeProvider
                  attribute="class"
                  defaultTheme="system"
                  enableSystem
                >
                  <main className="relative min-h-screen dark:bg-slate-950">
                    <Header />
                    <div className="relative mx-auto max-w-2xl text-slate-800 dark:text-slate-100 sm:p-12">
                      {children}
                    </div>
                    <Footer />
                  </main>
                  <Toaster />
                </ThemeProvider>
              </body>
            </EventProvider>
          </QuoteProvider>
        </AuthProvider>
    </html>
  );
}
