"use client"
import { FolderXIcon } from "lucide-react"
import NextLink from "next/link"
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty"
import { Button } from "@/components/ui/button"
import { useTranslation } from "react-i18next"
import { useState, useEffect } from "react";

import "@/lib/i18n";
import { Separator } from "@/components/ui/separator"

export default function NotFound() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<Empty className="bg-zinc-50 dark:bg-gray-900 min-h-[100cqh] flex flex-col justify-center items-center select-none">
			<EmptyHeader>
				<EmptyMedia variant="icon">
					<FolderXIcon />
				</EmptyMedia>
				<EmptyTitle className="text-md flex items-center gap-2 sm:text-xl">
					<div>404</div>
					<Separator orientation="vertical" className="h-6 border-gray-50" />
					<div>{isMounted ? t("notFound.title") : <>&nbsp;</>}</div>
				</EmptyTitle>
				<EmptyDescription className="text-xs w-max sm:text-lg">
					{isMounted ? t("notFound.description") : <>&nbsp;</>}
				</EmptyDescription>
			</EmptyHeader>
			<EmptyContent>
				<Button
					asChild
					variant="outline"
					className="mt-4 text-md px-4 py-2"
				>
					<NextLink href="/">
						{isMounted ? t("notFound.back") : <>&nbsp;</>}
					</NextLink>
				</Button>
			</EmptyContent>
		</Empty>
	)
}
