"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { executeBrainfuck } from "@/lib/brainfuckInterpreter";
import { fetchGitHubRaw } from "@/lib/projectFetcher";
import { useState, useEffect } from "react";
import { Loader2, Calculator } from "lucide-react";
import { useTranslation } from "react-i18next";

import "@/lib/i18n";

export default function BrainfuckCalculatorPage() {
	const [code, setCode] = useState<string>("");
	const [input, setInput] = useState<string>("1+1=");
	const [output, setOutput] = useState<string>("");
	const [running, setRunning] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation();

	useEffect(() => {
		setIsMounted(true);
		async function load() {
			try {
				const raw = await fetchGitHubRaw(
					"noir-chat-9661",
					"brainfuck_calculator",
					"calc_noSpaceAndComment.bf"
				);
				setCode(raw);
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: isMounted ? t("products.brainfuckCalculator.failedToLoad") : ""
				);
			} finally {
				setLoading(false);
			}
		}
		load();
	}, []);

	const calc = async () => {
		if (running || !code) return;

		setRunning(true);
		setError(null);
		setOutput("");

		setTimeout(() => {
			try {
				const result = executeBrainfuck(code, input);
				setOutput(result);
			} catch (err) {
				setError(
					err instanceof Error ? err.message : "Calculation error"
				);
			} finally {
				setRunning(false);
			}
		}, 10);
	};

	const examples = ["1+1=", "12+34=", "100-50=", "15*3=", "144/12="];

	return (
		<div className="min-h-[calc(100vh-var(--spacing)*16)] bg-zinc-50 dark:bg-gray-900 p-6">
			<div className="max-w-4xl mx-auto space-y-6">
				<div>
					<h1 className="text-3xl font-bold">
						{isMounted ? t("products.brainfuckCalculator.title") : <>&nbsp;</>}
					</h1>
					<p className="text-gray-600 dark:text-gray-400 mt-2">
						{isMounted ? t("products.brainfuckCalculator.description") : <>&nbsp;</>}
					</p>
				</div>

				{loading ? (
					<Card>
						<CardContent className="flex items-center justify-center p-8">
							<Loader2 className="h-8 w-8 animate-spin text-gray-400" />
							<span className="ml-3 text-gray-600 dark:text-gray-400">
								{isMounted ? t("products.brainfuckCalculator.loading") : <>&nbsp;</>}
							</span>
						</CardContent>
					</Card>
				) : (
					<Card>
						<CardHeader>
							<CardTitle className="flex items-center">
								<Calculator className="mr-2 h-5 w-5" />
								{isMounted ? t("products.brainfuckCalculator.title") : <>&nbsp;</>}
							</CardTitle>
							<CardDescription>
								{isMounted ? t("products.brainfuckCalculator.example") : <>&nbsp;</>}
							</CardDescription>
						</CardHeader>
						<CardContent className="space-y-4">
							{error && (
								<div className="p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md border border-red-200 dark:border-red-800">
									<p className="font-semibold">{isMounted ? t("products.brainfuckCalculator.errorLabel") : <>&nbsp;</>}</p>
									<p className="text-sm mt-1">{error}</p>
								</div>
							)}

							<div className="space-y-2">
								<label className="text-sm font-semibold">
									{isMounted ? t("products.brainfuckCalculator.expressionLabel") : <>&nbsp;</>}
								</label>
								<div className="gap-2 flex flex-col items-center xs:flex-row">
									<Input
										placeholder="1+1="
										className="font-mono text-sm flex-1"
										value={input}
										onChange={(e) =>
											setInput(e.target.value)
										}
										onKeyDown={(e) =>
											e.key === "Enter" && calc()
										}
										disabled={running}
									/>
									<Button
										onClick={calc}
										disabled={running || !input}
										className="min-w-[120px]"
									>
										{running ? (
											<>
												<Loader2 className="mr-2 h-4 w-4 animate-spin" />
												{isMounted ? t("products.brainfuckCalculator.running") : <>&nbsp;</>}
											</>
										) : (
											<>
												{isMounted ? t("products.brainfuckCalculator.runButton") : <>&nbsp;</>}
											</>
										)}
									</Button>
								</div>
							</div>

							{output && (
								<div className="space-y-2">
									<label className="text-sm font-semibold">
										{isMounted ? t("products.brainfuckCalculator.resultLabel") : <>&nbsp;</>}
									</label>
									<div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md border border-green-200 dark:border-green-800 font-mono text-2xl">
										{output}
									</div>
								</div>
							)}

							<div className="space-y-2">
								<label className="text-sm font-semibold">
									{isMounted ? t("products.brainfuckCalculator.exampleLabel") : <>&nbsp;</>}
								</label>
								<div className="flex flex-wrap gap-2">
									{examples.map((example) => (
										<Button
											key={example}
											variant="outline"
											size="sm"
											onClick={() => setInput(example)}
											disabled={running}
											className="font-mono"
										>
											{example}
										</Button>
									))}
								</div>
							</div>

							<div className="text-xs text-gray-500 dark:text-gray-400 pt-4 border-t">
								<p>
									{isMounted ? t("products.brainfuckCalculator.supportedOperations") : <>&nbsp;</>}
								</p>
							</div>
						</CardContent>
					</Card>
				)}
			</div>
		</div>
	);
}
