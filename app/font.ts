import { Cedarville_Cursive, Playfair_Display, Geist, Lobster, Anton, Patrick_Hand } from "next/font/google";

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});
export const anton = Anton({
  weight:"400",
  subsets:["latin"],
  display:"swap"
})
export const cedarville = Cedarville_Cursive({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
});
export const lobster = Lobster({
   weight: "400",
  subsets: ["latin"],
  display: "swap",
})
export const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  display: "swap",
});
export const patrickHand = Patrick_Hand({
  variable:"--font-patrick-hand",
  subsets:["latin"],
  display:"swap",
  weight:"400"
})
