import type { Metadata } from "next";

export const metadata: Metadata = {
	description:
		"難解プログラミング言語「Brainfuck」を用いて計算を実行する電卓ツールです。Webアプリケーションとして動作します。",
	alternates: {
		canonical: "/products/brainfuck-calculator",
	},
};

export default function BrainfuckCalculatorLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
