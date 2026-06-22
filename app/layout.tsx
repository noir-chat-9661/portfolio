import "./globals.css";
import type { Metadata } from "next";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import { Header } from "@/components/header";

const zenKurenaido = localFont({
	src: "../public/fonts/ZenKurenaido.ttf",
	variable: "--font-zen-kurenaido",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://noirch.at";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: "Cat Tower",
	description:
		"凶兆の黒猫のポートフォリオです。プロフィールや各種SNSリンクの置き場。また、連絡用のフォームも置いています。",
	alternates: {
		canonical: "/",
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "Cat Tower",
	url: siteUrl,
	description: "凶兆の黒猫のポートフォリオです。",
	author: {
		"@type": "Person",
		name: "Cat Tower",
		url: siteUrl,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning={true}>
			<head>
				{/* biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD schema markup */}
				<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			</head>
			<body className={`${zenKurenaido.variable} antialiased`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
					<div className="fixed inset-0 flex flex-col">
						<Header />
						<div className="flex-1 overflow-y-auto">{children}</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
