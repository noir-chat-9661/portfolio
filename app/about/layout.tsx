import type { Metadata } from "next";

export const metadata: Metadata = {
	description:
		"凶兆の黒猫のプロフィールと活動実績を紹介するページです。これまでの実績や技術の情報について掲載しています。",
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
