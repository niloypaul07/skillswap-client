import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import { AuthProvider } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SkillSwap — Peer-to-Peer Skill Sharing & Tutoring",
    template: "%s | SkillSwap",
  },
  description:
    "Connect with expert mentors and learn coding, design, languages, music, and business in real-time personalized 1-on-1 sessions.",
  keywords: [
    "skills",
    "tutoring",
    "mentorship",
    "online learning",
    "peer-to-peer",
    "programming",
    "education",
    "coding mentor",
  ],
  authors: [{ name: "SkillSwap Team" }],
  creator: "SkillSwap",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://skillswap.app",
    siteName: "SkillSwap",
    title: "SkillSwap — Peer-to-Peer Skill Sharing & Tutoring",
    description:
      "Connect with expert mentors for 1-on-1 live sessions in coding, design, languages, and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "SkillSwap — Peer-to-Peer Skill Sharing & Tutoring",
    description:
      "Connect with expert mentors for 1-on-1 live sessions in coding, design, languages, and more.",
    creator: "@skillswap",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#090a0f] text-gray-100 font-sans">
        <AuthProvider>
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: "#131520",
                color: "#f3f4f6",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "12px",
                fontSize: "13px",
                fontWeight: "500",
              },
              success: {
                iconTheme: {
                  primary: "#10b981",
                  secondary: "#131520",
                },
              },
              error: {
                iconTheme: {
                  primary: "#ef4444",
                  secondary: "#131520",
                },
              },
            }}
          />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
