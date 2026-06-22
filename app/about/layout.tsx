import type { Metadata } from "next";

export const metadata: Metadata = {
	description:
		"Web開発者兼デザイナーのNoirChatのプロフィールと活動実績を紹介するページです。これまでの経歴やスキルについて掲載しています。",
	alternates: {
		canonical: "/about",
	},
};

export default function AboutLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
