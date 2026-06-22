import type { Metadata } from "next";

export const metadata: Metadata = {
	description: "凶兆の黒猫がこれまでに制作したWebアプリケーションや開発ツールの一覧ページです。",
	alternates: {
		canonical: "/products",
	},
};

export default function ProductsLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
