import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppinsSans = Poppins({
  variable:"--font-poppins-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "100", "200", "300", "700", "800", "900"],
});


export const metadata: Metadata = {
  title: "Next application",
  description: "welcome to my next application",
  openGraph: {
    title: "Next application",
    description: "welcome to my next application",
    url: "",
    images: [],
    type: "website",
  },
  twitter: { 
    title: "Next application",
    description: "welcome to my next application",
    images: [],
    card: "summary_large_image",
  },
  
};

export default function RootLayout({children,}: Readonly<{ children: React.ReactNode;}>) {
  return (
    <html
      lang="en"
      className={`${poppinsSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
