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
  title: "DRYAM FOODS",
  description:
    "DRYAM FOODS — manufacturer & exporter of premium garlic, onion & fried onion, and vegetable powders from Surat, Gujarat, India. Organic ingredients for global food manufacturers. Launching soon.",
  icons: {
    icon: [
      { url: "/favicon.ico?v=3", sizes: "any" },
      { url: "/favicon-32x32.png?v=3", type: "image/png", sizes: "32x32" },
      { url: "/dryam-logo.png?v=3", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png?v=3", sizes: "180x180", type: "image/png" },
    ],
    shortcut: ["/favicon.ico?v=3"],
  },
  openGraph: {
    type: "website",
    siteName: "DRYAM FOODS",
    title: "DRYAM FOODS",
    description:
      "The new DRYAM FOODS experience is being crafted — premium garlic, onion, fried products & vegetable powders, exported from Surat, Gujarat.",
    images: [LOGO_URL],
    url: "https://dryamfoods-web.vercel.app/",
  },
  twitter: {
    card: "summary",
    title: "DRYAM FOODS",
    description:
      "COMING SOON. Premium garlic, onion & vegetable powders — exported from Surat, Gujarat.",
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
