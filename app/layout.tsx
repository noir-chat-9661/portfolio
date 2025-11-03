import "./globals.css";
import type { Metadata } from "next";
import { Zen_Kurenaido } from "next/font/google";
import { ThemeProvider } from "next-themes"
import { Header } from "@/components/header";

const geistZenKurenaido = Zen_Kurenaido({
	subsets: ["latin"],
	weight: ["400"],
	variable: "--font-zen-kurenaido",
});

export const metadata: Metadata = {
	title: "My Page",
	description: "This is my personal page.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ja" suppressHydrationWarning={true}>
			<body
				className={`${geistZenKurenaido.variable} antialiased`}
			>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem={true}>
					<div className="fixed inset-0 flex flex-col">
						<Header />
						<div className="flex-1 overflow-y-auto">
							{children}
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	);
}
