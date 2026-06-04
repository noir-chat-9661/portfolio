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
	const { t, i18n, ready } = useTranslation();
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

	if (!isMounted || !ready) {
		return (
			<div className="bg-zinc-50 dark:bg-gray-900">
				<div className="min-h-[calc(100dvh-var(--spacing)*16)] flex items-center content-center justify-center text-center flex-col gap-10 py-10 px-4 sm:px-6 md:px-8">
					<h1 className="font-bold text-3xl select-none mb-4">&nbsp;</h1>
				</div>
			</div>
		);
	}

	const currentLang = i18n.language === "en" ? "en" : "ja";

	return (
		<div className="bg-zinc-50 dark:bg-gray-900">
			<div className="min-h-[calc(100dvh-var(--spacing)*16)] flex items-center content-center justify-center text-center flex-col gap-10 py-10 px-4 sm:px-6 md:px-8">
				<h1 className="font-bold text-3xl select-none mb-4">{t("about.title")}</h1>
				<Table className="max-w-[calc(100vw-var(--spacing)*20)] mx-auto text-md">
					<TableBody>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{t("about.attribute.name")}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{t("about.value.name")}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{t("about.attribute.age")}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{`${checkAge()}`}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{t("about.attribute.location")}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{t("about.value.location")}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{t("about.attribute.occupation")}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{t("about.value.occupation")}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{t("about.attribute.hobby")}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{t("about.value.hobby")}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{t("about.attribute.technologies")}
							</TableCell>
							<TableCell className="whitespace-pre-line break-words">
								{t("about.value.technologies")}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r">
								{t("about.attribute.specialities")}
							</TableCell>
							<TableCell className="whitespace-normal break-words">
								{t("about.value.specialities")}
							</TableCell>
						</TableRow>
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r align-top pt-3">
								{t("about.attribute.activities")}
							</TableCell>
							<TableCell className="whitespace-normal break-words pt-3">
								{loading ? (
									<span className="text-gray-500 dark:text-gray-400">Loading...</span>
								) : (
									<div className="space-y-4 max-w-xl mx-auto">
										{activities.map((activity, index) => (
											<div
												key={activity.date + index}
												className="flex flex-col sm:flex-row items-start gap-1 sm:gap-4 border-b border-zinc-200 dark:border-gray-800 pb-3 last:border-none last:pb-0"
											>
												<span className="text-xs sm:text-sm font-semibold text-zinc-500 dark:text-zinc-400 sm:shrink-0 sm:w-28 text-left sm:text-right pt-0.5 whitespace-nowrap pl-2 sm:pl-0">
													{activity.date}
												</span>
												<div className="flex-1 flex flex-col text-left w-full pl-4 sm:pl-0">
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
								)}
							</TableCell>
						</TableRow>
					</TableBody>
				</Table>
			</div>
		</div>
	);
}
