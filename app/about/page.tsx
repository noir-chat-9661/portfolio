"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { useCheckAge } from "@/lib/useCheckAge";

import "@/lib/i18n";

interface Activity {
	date: string;
	title: {
		ja: string;
		en: string;
	};
	description?: {
		ja: string;
		en: string;
	};
	link?: string;
}

export default function About() {
	const { t, i18n } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);
	const [activities, setActivities] = useState<Activity[]>([]);
	const [loading, setLoading] = useState(true);
	const checkAge = useCheckAge();

	useEffect(() => {
		setIsMounted(true);
		fetch(`/data/activities.json?t=${Date.now()}`, { cache: "no-store" })
			.then((res) => res.json())
			.then((data) => {
				setActivities(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load activities:", err);
				setLoading(false);
			});
	}, []);

	const currentLang = i18n.language === "en" ? "en" : "ja";

	return (
		<div className="bg-zinc-50 dark:bg-gray-900">
			<div className="min-h-[calc(100dvh-var(--spacing)*16)] flex items-center content-center justify-center text-center flex-col gap-10 py-10 px-4 sm:px-6 md:px-8">
				<h1 className="font-bold text-3xl select-none mb-4">{isMounted ? t("about.title") : <>&nbsp;</>}</h1>
				<Table className="max-w-[calc(100vw-var(--spacing)*20)] mx-auto text-md">
					<TableBody>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{isMounted ? t("about.attribute.name") : <>&nbsp;</>}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{isMounted ? t("about.value.name") : <>&nbsp;</>}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{isMounted ? t("about.attribute.age") : <>&nbsp;</>}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{isMounted ? `${checkAge()}` : <>&nbsp;</>}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{isMounted ? t("about.attribute.location") : <>&nbsp;</>}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{isMounted ? t("about.value.location") : <>&nbsp;</>}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{isMounted ? t("about.attribute.occupation") : <>&nbsp;</>}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{isMounted ? t("about.value.occupation") : <>&nbsp;</>}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{isMounted ? t("about.attribute.technologies") : <>&nbsp;</>}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{isMounted ? t("about.value.technologies") : <>&nbsp;</>}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{isMounted ? t("about.attribute.specialities") : <>&nbsp;</>}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{isMounted ? t("about.value.specialities") : <>&nbsp;</>}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5 flex flex-col md:table-row py-2 md:py-0">
							<TableCell className="font-medium w-full md:w-40 md:border-r pb-1 md:pb-0 block md:table-cell align-top pt-3 text-left md:text-right pr-4 shrink-0">
								{isMounted ? t("about.attribute.activities") : <>&nbsp;</>}
							</TableCell>
							<TableCell className="whitespace-normal break-words w-full pt-1 md:pt-3 block md:table-cell pl-0 md:pl-2">
								{isMounted ? (
									loading ? (
										<span className="text-gray-500 dark:text-gray-400">Loading...</span>
									) : (
										<div className="space-y-4 max-w-xl mx-auto">
											{activities.map((activity, index) => (
												<div
													key={activity.date + index}
													className="flex flex-col sm:flex-row items-start gap-1 sm:gap-4 border-b border-zinc-200 dark:border-gray-800 pb-3 last:border-none last:pb-0"
												>
													<span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 sm:shrink-0 sm:w-28 text-left sm:text-right pt-0.5 whitespace-nowrap">
														{activity.date}
													</span>
													<div className="flex-1 flex flex-col text-left w-full">
														<span className="font-semibold text-zinc-800 dark:text-zinc-200">
															{activity.link ? (
																<a
																	href={activity.link}
																	target="_blank"
																	rel="noopener noreferrer"
																	className="text-blue-600 dark:text-blue-400 hover:underline"
																>
																	{activity.title[currentLang]}
																</a>
															) : (
																activity.title[currentLang]
															)}
														</span>
														{activity.description && (
															<span className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
																{activity.description[currentLang]}
															</span>
														)}
													</div>
												</div>
											))}
										</div>
									)
								) : (
									<>&nbsp;</>
								)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
