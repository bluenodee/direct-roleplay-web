import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Direct Roleplay",
  description: "Direct Roleplay - MTA:SA Roleplay Server",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-1 pt-16">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
