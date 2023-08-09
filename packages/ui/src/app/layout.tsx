import "./globals.css";
import { Roboto_Mono, Montserrat } from "next/font/google";

const robotMono = Roboto_Mono({
  weight: ["400"],
  subsets: ["latin"],
  variable: "--montserrat",
});
const monteserrat = Montserrat({
  weight: ["400", "500"],
  subsets: ["latin"],
});

export const metadata = {
  title: "Calulator Press",
  description: "Quality calculators for your businesses",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${monteserrat.className} ${robotMono.variable} `}>
        {children}
      </body>
    </html>
  );
}
