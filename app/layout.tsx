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
	title: "NoirChat - Web Developer & Designer Portfolio",
	description:
		"Web開発者兼デザイナーのNoirChatのポートフォリオサイトです。制作実績やプロフィール、各種SNSリンク、コンタクトフォームを掲載しています。",
	alternates: {
		canonical: "/",
	},
};

const jsonLd = {
	"@context": "https://schema.org",
	"@type": "WebSite",
	name: "NoirChat",
	url: siteUrl,
	description: "Web開発者兼デザイナーのNoirChatのポートフォリオサイトです。",
	author: {
		"@type": "Person",
		name: "NoirChat",
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
