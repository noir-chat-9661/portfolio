import type { Metadata } from "next";

export const metadata: Metadata = {
	description:
		"TRPGなどのゲームプレイで利用できる多機能なオンラインダイス（サイコロ）ツールです。NoirChatが開発したWebアプリケーションとして動作します。",
	alternates: {
		canonical: "/products/trpg-dice-roller",
	},
};

export default function TRPGDiceRollerLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
