import type { Metadata } from "next";

export const metadata: Metadata = {
	title: "Links | NoirChat - Portfolios & Socials",
	description:
		"GitHub、Twitter(X)、DiscordなどのSNSアカウントや、関連サイトへのリンクをまとめたページです。お気軽にフォローやコンタクトをどうぞ。",
	alternates: {
		canonical: "/links",
	},
};

export default function LinksLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
