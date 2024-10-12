import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { decrypt } from "@/lib/decrypt";
import { cookies } from "next/headers";
import { Toaster } from "@/components/ui/toaster";
import { useSession } from "@/hooks/useSession";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import Navbar from "@/components/elements/navbar";
import { JwtPayload } from "jsonwebtoken";

const poppinsRegular = localFont({
  src: "./fonts/Poppins-Regular.ttf",
  variable: "--font-poppins-regular",
  weight: "300",
});

const poppinsBold = localFont({
  src: "./fonts/Poppins-Bold.ttf",
  variable: "--font-poppins-bold",
  weight: "700",
});

export const metadata: Metadata = {
  title: "Sick Predection",
  description: "Generated by create next app",
  icons: "",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = cookies().get("session") as RequestCookie | undefined;
  let userData;
  if (session?.value) {
    userData = await decrypt(session?.value as string);
  }
  return (
    <html lang="en">
      <body
        className={`${poppinsBold.variable} ${poppinsRegular.variable} antialiased`}
      >
        <header>
          <Navbar userData={userData as JwtPayload} />
        </header>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
