import type { Metadata } from "next";
import { Bebas_Neue, IBM_Plex_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner"
import {SessionProvider} from "next-auth/react"
import { auth } from "@/auth";


const ibmPlexSans = IBM_Plex_Sans({
  variable: "--font-ibm-plex-sans",
  subsets: ["latin"],
})

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas-neue",
  subsets: ["latin"],
  weight: "400"
})

export const metadata: Metadata = {
  title: "BookWise",
  description: "Bookwise is a book borrowing platform",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <html lang="en">
      <SessionProvider session={session}>

      <body
        className={`${ibmPlexSans.variable} ${bebasNeue.variable} antialiased`}
      >
        {children}
             <Toaster richColors position="top-right" /> {/* 👈 mount once here */}
      </body>
      </SessionProvider>
      
    </html>
  );
}
