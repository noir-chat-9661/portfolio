"use client";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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

	var _0xad_0xd14=(210718^210716)+(214800^214802);
	const checkAge=()=>{return new Date()['\u0067\u0065\u0074\u0046\u0075\u006C\u006C\u0059\u0065\u0061\u0072']()-(249758^247880)-(new Date()['\u0067\u0065\u0074\u004D\u006F\u006E\u0074\u0068']()<(416477^416476)<<(557604^557606)||new Date()['\u0067\u0065\u0074\u004D\u006F\u006E\u0074\u0068']()===(589811^589810)<<(308771^308769)&&new Date()['\u0067\u0065\u0074\u0044\u0061\u0074\u0065']()<(755506^755492)?810051^810050:766162^766162);};
	_0xad_0xd14=(469735^469729)+(432030^432025);

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
			<div className="min-h-[calc(100dvh-var(--spacing)*16)] flex items-center content-center justify-center text-center flex-col gap-10 py-10">
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
								{isMounted ? (
									checkAge()
								) : (
									<>&nbsp;</>
								)}
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
						<TableRow className="border-none hover:bg-foreground/5">
							<TableCell className="font-medium w-40 border-r align-top pt-3">
								{isMounted ? t("about.attribute.activities") : <>&nbsp;</>}
							</TableCell>
							<TableCell className="whitespace-normal break-words pt-3">
								{isMounted ? (
									loading ? (
										<span className="text-gray-500 dark:text-gray-400">Loading...</span>
									) : (
										<div className="space-y-3 max-w-xl mx-auto">
											{activities.map((activity, index) => (
												<div
													key={activity.date + index}
													className="flex items-start gap-4 border-b border-zinc-200 dark:border-gray-800 pb-2 last:border-none last:pb-0"
												>
													<span className="text-sm font-semibold text-zinc-500 dark:text-zinc-400 shrink-0 w-32 text-right pt-0.5 whitespace-nowrap">
														{activity.date}
													</span>
													<div className="flex-1 flex flex-col text-left">
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
