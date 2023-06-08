import "./globals.css";
import { Inter } from "next/font/google";
import { Poppins } from "next/font/google";
import Header from "../components/Header";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import { QuoteProvider } from "./context/QuoteContext";

const inter = Inter({ subsets: ["latin"] });

const poppins = Poppins({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
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
        <body className={inter.className}>
          <Header />
          <main className="container mx-auto max-w-2xl p-5 sm:p-12">
            {children}
          </main>
          <Toaster />
        </body>
        </QuoteProvider>
      </AuthProvider>
    </html>
  );
}
