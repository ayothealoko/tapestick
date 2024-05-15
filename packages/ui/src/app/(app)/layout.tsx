"use client";

import "@app/globals.css";
import { Inter } from "next/font/google";
import Header from "@app/(app)/_components/Header/";
import styles from "@app/(app)/layout.module.css";
import Sidebar from "@app/(app)/_components/Sidebar";
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
          <div className={styles.container}>
            <Sidebar />
            <main className={styles.main}>{children}</main>
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
