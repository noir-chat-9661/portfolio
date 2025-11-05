"use client";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { executeSandboxed } from "@/lib/sandboxWorker";
import { fetchNpmPackage } from "@/lib/projectFetcher";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dices } from "lucide-react";

import "@/lib/i18n";
import { Input } from "@/components/ui/input";

export default function TRPGDiceRollerPage() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);
	const [code, setCode] = useState<string>("");
	const [input, setInput] = useState<string>("1d100");
	const [result, setResult] = useState<string>("");
	const [error, setError] = useState<string>("");
	const [running, setRunning] = useState<boolean>(false);

	useEffect(() => {
		async function load() {
			try {
				const raw = await fetchNpmPackage("trpg-dice-roller", "dist/index.js");
				setCode(raw);
			} catch (err) {
				console.error("Failed to load code:", err);
			}
		}
		setIsMounted(true);
		load();
	}, []);

	const run = () => {
		if (running || !code || !input) return;
		setRunning(true);

		setError("");
		setResult("");
		try {
			executeSandboxed(`exports = {};\n${code}\nconsole.log(calculateDiceExpression(\`${input}\`));`, 5000)
				.then(result => {
					console.log("Sandbox result:", result);
					const data = JSON.parse(result.output || "{}");
					setResult(data.output || "");
				})
				.catch(err => {
					setError(err instanceof Error ? err.message : isMounted ? t("products.trpgDiceRoller.executionError") : "");
				})
				.finally(() => {
					setRunning(false);
				});
		} catch (err) {
			setError(err instanceof Error ? err.message : isMounted ? t("products.trpgDiceRoller.executionError") : "");
		}
	};

	return (
		<div className="min-h-[calc(100dvh-var(--spacing)*16)] bg-zinc-50 dark:bg-gray-900 p-6">
			<div className="max-w-4xl mx-auto space-y-6">
				<div className="container mx-auto p-4">
					<Card className="max-w-3xl mx-auto dark:bg-gray-900/50">
						<CardHeader>
							<CardTitle>
								{isMounted ? t("products.trpgDiceRoller.title") : <>&nbsp;</>}
							</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="mb-4">
								<label className="block mb-2 font-semibold">
									{isMounted ? t("products.trpgDiceRoller.inputLabel") : <>&nbsp;</>}
								</label>
								<Input
									type="text"
									value={input}
									onChange={(e) => setInput(e.target.value)}
									placeholder={isMounted ? t("products.trpgDiceRoller.inputPlaceholder") || "" : ""}
								/>
							</div>
							<div className="mb-4">
								<Button onClick={run} disabled={running || !code || !input}>
									<Dices className="mr-1 h-5 w-5" />
									{running ? (
										isMounted ? t("products.trpgDiceRoller.running") : <>&nbsp;</>
									) : (
										isMounted ? t("products.trpgDiceRoller.runButton") : <>&nbsp;</>
									)}
								</Button>
							</div>
							{error && (
								<div className="mb-4 p-4 bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-200 rounded-md border border-red-200 dark:border-red-800">
									<p className="font-semibold">
										{isMounted ? t("products.trpgDiceRoller.errorLabel") : <>&nbsp;</>}
									</p>
									<p className="text-sm mt-1">{error}</p>
								</div>
							)}
							{result && (
								<div className="mb-4">
									<label className="block mb-2 font-semibold">
										{isMounted ? t("products.trpgDiceRoller.resultLabel") : <>&nbsp;</>}
									</label>
									<div className="p-4 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 rounded-md border border-green-200 dark:border-green-800 font-mono">
										{result}
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</div>
			</div>
		</div>
	);
}


