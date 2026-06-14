import "./globals.css";
import Sidebar from "./components/Sidebar";
import { Toaster } from "react-hot-toast";

export const metadata = {
  title: "MarketHub AI",
  description: "AI Powered Marketplace",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white">

        <div className="flex min-h-screen">
          <Toaster />

          <Sidebar />

          <main className="flex-1 overflow-auto">
            {children}
          </main>

        </div>

      </body>
    </html>
  );
}
