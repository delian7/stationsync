import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ModalProvider } from "./contexts/ModalContext";
import Modal from "./components/Modal";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Eurotex StationSync",
  description: "Interactive visualization of the Eurotex warehouse layout",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ModalProvider>
          <Modal />
          {children}
        </ModalProvider>
      </body>
    </html>
  );
}
