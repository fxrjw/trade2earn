import "./globals.css";
import Nav from "@/components/Nav";

export const metadata = {
  title: "Trade2Earn",
  description: "Signals + Risk + Tracking"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Nav />
        <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
