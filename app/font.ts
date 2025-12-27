import { Cedarville_Cursive, Playfair_Display, Geist } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const cedarville = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});

export const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});
