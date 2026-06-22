import type { Metadata } from "next";

export const metadata: Metadata = {
	description:
		"凶兆の黒猫へのお問い合わせ・ご相談フォームです。こちらからお気軽にお問い合わせください。",
	alternates: {
		canonical: "/contact",
	},
};

export default function ContactLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>{children}</>;
}
