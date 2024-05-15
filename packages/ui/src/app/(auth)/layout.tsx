"use client";

import "@app/globals.css";
import { Inter, Montserrat } from "next/font/google";
import Header from "@app/(auth)/_components/Header/";
import Footer from "@app/(auth)/_components/Footer";
import styles from "@app/(auth)/layout.module.css";
import StoreProvider from "@app/StoreProvider";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--Inter",
});

/* export const metadata = {
 *   title: "Tape stick",
 *   description: "The CRM you stick with",
 * };
 *  */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${styles.body} ${inter.variable}`}>
        <StoreProvider>
          <Header />

          <main className={styles.main}>{children}</main>
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
