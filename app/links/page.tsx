"use client";
import { FileText, Mail, MessageCircleMore } from "lucide-react";
import NextLink from "next/link";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	FaDiscord as Discord,
	FaGithub as GitHub,
	FaInstagram as Instagram,
	FaTwitter as Twitter,
} from "react-icons/fa";
import { Button } from "@/components/ui/button";

import "@/lib/i18n";

export default function LinksPage() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);
	const [nowHovered, setNowHovered] = useState<string | null>(null);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className="min-h-[calc(100dvh-var(--spacing)*16)] bg-zinc-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-start py-10 font-sans select-none">
				<h1 className="text-3xl font-bold">{isMounted ? t("links.title") : <>&nbsp;</>}</h1>
				<div className="h-10" />

				<div className="flex flex-col gap-12 w-full px-5">
					<section className="flex flex-col items-center">
						<h2 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-300 mb-4 px-8 tracking-wider">
							{t("links.activity")}
						</h2>
						<div className="flex flex-row flex-wrap justify-center gap-4">
							<NextLink href="https://blog.noirch.at" target="_blank" rel="noopener noreferrer">
								<Button
									title={t("links.blog")}
									asChild
									variant="outline"
									className="text-xl px-8 py-5 flex items-center w-32"
									onMouseOver={() => setNowHovered("blog")}
									onMouseLeave={() => setNowHovered(null)}
								>
									<div>
										<FileText className="mr-2 h-10 w-10" />
										{t("links.blog")}
									</div>
								</Button>
							</NextLink>
							<NextLink
								href="https://github.com/noir-chat-9661"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									title="GitHub"
									asChild
									variant="outline"
									className="text-xl px-8 py-5 flex items-center w-54"
									onMouseOver={() => setNowHovered("github")}
									onMouseLeave={() => setNowHovered(null)}
								>
									<div>
										<GitHub className="mr-2 h-10 w-10" />
										{nowHovered === "github" ? "noir-chat-9661" : "GitHub"}
									</div>
								</Button>
							</NextLink>
						</div>
					</section>

					<section className="flex flex-col items-center">
						<h2 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-300 mb-4 px-8 tracking-wider">
							{t("links.social")}
						</h2>
						<div className="flex flex-row flex-wrap justify-center gap-4">
							<NextLink href="https://twitter.com/sgr_9661_ea" target="_blank" rel="noopener noreferrer">
								<Button
									title="Twitter"
									asChild
									variant="outline"
									onMouseOver={() => setNowHovered("twitter")}
									onMouseLeave={() => setNowHovered(null)}
									className="text-xl px-8 py-5 flex items-center w-48"
								>
									<div>
										<Twitter className="mr-2 h-10 w-10" />
										{nowHovered === "twitter" ? "sgr_9661_ea" : "Twitter"}
									</div>
								</Button>
							</NextLink>
							<NextLink
								href="https://www.instagram.com/sgr_9661_ea/"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									title="Instagram"
									asChild
									variant="outline"
									onMouseOver={() => setNowHovered("instagram")}
									onMouseLeave={() => setNowHovered(null)}
									className="text-xl px-8 py-5 flex items-center w-48"
								>
									<div>
										<Instagram className="mr-2 h-10 w-10" />
										{nowHovered === "instagram" ? "sgr_9661_ea" : "Instagram"}
									</div>
								</Button>
							</NextLink>
							<NextLink
								href="https://discordapp.com/users/noir_chat_9661"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									title="Discord"
									asChild
									variant="outline"
									onMouseOver={() => setNowHovered("discord")}
									onMouseLeave={() => setNowHovered(null)}
									className="text-xl px-8 py-5 flex items-center w-52"
								>
									<div>
										<Discord className="mr-2 h-10 w-10" />
										{nowHovered === "discord" ? "noir_chat_9661" : "Discord"}
									</div>
								</Button>
							</NextLink>
						</div>
					</section>

					<section className="flex flex-col items-center">
						<h2 className="text-2xl font-semibold text-zinc-600 dark:text-zinc-300 mb-4 px-8 tracking-wider">
							{t("links.contact")}
						</h2>
						<div className="flex flex-row flex-wrap justify-center gap-4">
							<NextLink href="mailto:contact@noirch.at">
								<Button
									title={t("links.email")}
									asChild
									variant="outline"
									onMouseOver={() => setNowHovered("email")}
									onMouseLeave={() => setNowHovered(null)}
									className="text-xl px-8 py-5 flex items-center w-64"
								>
									<div>
										<Mail className="mr-2 h-10 w-10" />
										{nowHovered === "email" ? "contact@noirch.at" : t("links.email")}
									</div>
								</Button>
							</NextLink>
							<NextLink
								href="https://marshmallow-qa.com/tg8kevxghde2956"
								target="_blank"
								rel="noopener noreferrer"
							>
								<Button
									title={t("links.ask")}
									asChild
									variant="outline"
									onMouseOver={() => setNowHovered("ask")}
									onMouseLeave={() => setNowHovered(null)}
									className="text-xl px-4 py-5 flex items-center w-52"
								>
									<div>
										<MessageCircleMore className="mr-2 h-10 w-10" />
										{t("links.ask")}
									</div>
								</Button>
							</NextLink>
						</div>
					</section>
				</div>
			</div>
		</div>
	);
}
