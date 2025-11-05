"use client";
import { useState, useEffect } from "react";
import { Dices, Calculator } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import Link from "next/link";

import "@/lib/i18n";

export default function ProductsPage() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<div className="min-h-[calc(100vh-var(--spacing)*16)] bg-zinc-50 dark:bg-gray-900 p-6">
			<div className="max-w-4xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold mb-6 text-center">
					{isMounted ? t("products.title") : <>&nbsp;</>}
				</h1>
				<div className="space-y-6">
					<Card className="hover:shadow-lg transition-shadow">
						<Link href="/products/brainfuck-calculator" className="no-underline">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Calculator />
									{isMounted ? t("products.brainfuckCalculator.title") : <>&nbsp;</>}
								</CardTitle>
							</CardHeader>
							<CardContent>
								{isMounted ? t("products.brainfuckCalculator.description") : <>&nbsp;</>}
							</CardContent>
						</Link>
					</Card>
					<Card>
						<Link href="/products/trpg-dice-roller" className="no-underline">
							<CardHeader>
								<CardTitle className="flex items-center gap-2">
									<Dices />
									{isMounted ? t("products.trpgDiceRoller.title") : <>&nbsp;</>}
								</CardTitle>
							</CardHeader>
							<CardContent>
								{isMounted ? t("products.trpgDiceRoller.description") : <>&nbsp;</>}
							</CardContent>
						</Link>
					</Card>
				</div>
			</div>
		</div>
	);
}
