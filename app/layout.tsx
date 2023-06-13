"use client"
import AppBar from "@/components/AppBar";
import "./globals.css";
import Providers from "@/components/Providers";
import Footer from "@/components/Footer";
import {ThemeProvider} from "next-themes";

// export const metadata = {
//     title: "You-Pod",
//     description: "A podcast about the things we love to hate.",
// };

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (

        <html lang="en">
        <body className="bg-white dark:bg-gray-900">
        <Providers>
            <ThemeProvider attribute="class">
                <AppBar/>
                {children}
            </ThemeProvider>
            <Footer/>
        </Providers>
        </body>
        </html>

    );
}
