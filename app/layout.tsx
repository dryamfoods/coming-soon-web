import type { Metadata, Viewport } from "next";
import { Fraunces, Archivo, DM_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-archivo",
});

const dmMono = DM_Mono({
  subsets: ["latin"],
  weight: ["300", "400"],
  variable: "--font-dm-mono",
});

const LOGO_URL = "/dryam-logo.png";

export const metadata: Metadata = {
  title: "DRYAM FOODS — Pure. Organic. Ingredients. Coming Soon.",
  description:
    "DRYAM FOODS — manufacturer & exporter of dehydrated garlic, onion & fried onion, vegetable powders, and ground spices & herbs from Surat, Gujarat, India. Pure, organic ingredients for global food manufacturers. Launching soon.",
  icons: {
    icon: LOGO_URL,
    apple: LOGO_URL,
  },
  openGraph: {
    type: "website",
    siteName: "DRYAM FOODS",
    title: "DRYAM FOODS — Pure. Organic. Ingredients.",
    description:
      "The new DRYAM FOODS experience is being crafted — garlic, onion & fried products, vegetable powders, and ground spices & herbs, exported from Surat, Gujarat.",
    images: [LOGO_URL],
    url: "https://dryamfoods-web.vercel.app/",
  },
  twitter: {
    card: "summary",
    title: "DRYAM FOODS — Pure. Organic. Ingredients.",
    description:
      "Something pure is on its way. Dehydrated garlic, onion, vegetable powders & ground spices — exported from Surat, Gujarat.",
    images: [LOGO_URL],
  },
};

export const viewport: Viewport = {
  themeColor: "#0E0B08",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${archivo.variable} ${dmMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
