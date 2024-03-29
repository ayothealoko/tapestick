import "@/globals.css";
import { Inter, Montserrat } from "next/font/google";
import Header from "@/(auth)/_components/Header/";
import Footer from "@/(auth)/_components/Footer";
import styles from "@/(auth)/layout.module.css";

const inter = Inter({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--Inter",
});

export const metadata = {
  title: "Tape stick",
  description: "The CRM you stick with",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${styles.body} ${inter.variable}`}>
        <Header />
        <main className={styles.main}>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
