"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import "@/lib/i18n";

export default function About() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className="bg-zinc-50 dark:bg-gray-900">
			<div className="min-h-[calc(100vh-var(--spacing)*16)] flex items-center content-center justify-center text-center flex-col gap-10 py-10">
				<h1 className="font-bold text-3xl select-none mb-4">
					{isMounted ? t("about.title") : <>&nbsp;</>}
				</h1>
				<Table className="max-w-[calc(100vw-var(--spacing)*20)] mx-auto text-md">
					<TableBody>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">{isMounted ? t("about.attribute.name") : <>&nbsp;</>}</TableCell>
							<TableCell className="whitespace-normal break-words">{isMounted ? t("about.value.name") : <>&nbsp;</>}</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">{isMounted ? t("about.attribute.age") : <>&nbsp;</>}</TableCell>
							<TableCell className="whitespace-normal break-words">
								{
									new Date().getFullYear() - 2006 - (new Date().getMonth() < 4 || (new Date().getMonth() === 4 && new Date().getDate() < 22) ? 1 : 0)
								}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">{isMounted ? t("about.attribute.location") : <>&nbsp;</>}</TableCell>
							<TableCell className="whitespace-normal break-words">{isMounted ? t("about.value.location") : <>&nbsp;</>}</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">{isMounted ? t("about.attribute.occupation") : <>&nbsp;</>}</TableCell>
							<TableCell className="whitespace-normal break-words">{isMounted ? t("about.value.occupation") : <>&nbsp;</>}</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">{isMounted ? t("about.attribute.technologies") : <>&nbsp;</>}</TableCell>
							<TableCell className="whitespace-normal break-words">{isMounted ? t("about.value.technologies") : <>&nbsp;</>}</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">{isMounted ? t("about.attribute.specialities") : <>&nbsp;</>}</TableCell>
							<TableCell className="whitespace-normal break-words">{isMounted ? t("about.value.specialities") : <>&nbsp;</>}</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
