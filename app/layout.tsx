import AppBar from "@/components/AppBar";
import "./globals.css";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Not-You-Pod",
  description: "A podcast about the things we love to hate.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AppBar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
