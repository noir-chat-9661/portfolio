import type { Metadata } from "next";

export const metadata: Metadata = {
	description:
		"NoirChatへのお問い合わせ・ご相談フォームです。Web開発やデザインのご依頼など、こちらからお気軽にお問い合わせください。",
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
