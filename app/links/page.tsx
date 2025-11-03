"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { FaTwitter as Twitter, FaGithub as GitHub, FaInstagram as Instagram, FaDiscord as Discord } from "react-icons/fa";
import NextLink from "next/link"; 

import "@/lib/i18n";

export default function LinksPage() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className="min-h-[calc(100vh-var(--spacing)*16)] bg-zinc-50 dark:bg-gray-900">
			<div className="flex flex-col items-center justify-start py-10 font-sans select-none">
				<h1 className="text-3xl font-bold">{isMounted ? t("links.title") : <>&nbsp;</>}</h1>
				<div className="h-10" />
				<NextLink
					href="https://github.com/noir-chat-9661"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button
						asChild
						variant="outline"
						className="mt-4 text-xl px-5 py-5 flex items-center"
					>
						<div>
							<GitHub className="mr-2 h-10 w-10" />
							noir-chat-9661
						</div>
					</Button>
				</NextLink>
				<NextLink
					href="https://twitter.com/sgr_9661_ea"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button
						asChild
						variant="outline"
						className="mt-4 text-xl px-4 py-5 flex items-center"
					>
						<div>
							<Twitter className="mr-2 h-10 w-10" />
							sgr_9661_ea
						</div>
					</Button>
				</NextLink>
				<NextLink
					href="https://www.instagram.com/sgr_9661_ea/"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button
						asChild
						variant="outline"
						className="mt-4 text-xl px-4 py-5 flex items-center"
					>
						<div>
							<Instagram className="mr-2 h-10 w-10" />
							sgr_9661_ea
						</div>
					</Button>
				</NextLink>
				<NextLink
					href="https://discordapp.com/users/noir_chat_9661"
					target="_blank"
					rel="noopener noreferrer"
				>
					<Button
						asChild
						variant="outline"
						className="mt-4 text-xl px-4 py-5 flex items-center"
					>
						<div>
							<Discord className="mr-2 h-10 w-10" />
							noir_chat_9661
						</div>
					</Button>
				</NextLink>
			</div>
		</div>
	);
}
