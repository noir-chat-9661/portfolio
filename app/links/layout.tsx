import type { Metadata } from "next";

export const metadata: Metadata = {
	description:
		"GitHub、Twitter(X)、DiscordなどのSNSアカウントや、関連サイトへのリンクをまとめたページです。気軽にフォローしてください！",
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
