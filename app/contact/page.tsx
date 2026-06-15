"use client";
import { AlertCircle, CheckCircle2, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

export default function Contact() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		const trimmedName = name.trim();
		const trimmedEmail = email.trim();
		const trimmedMessage = message.trim();

		if (!trimmedName || !trimmedEmail || !trimmedMessage) {
			setStatus("error");
			return;
		}

		setStatus("sending");

		try {
			const res = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					name: trimmedName,
					email: trimmedEmail,
					message: trimmedMessage,
				}),
			});

			if (res.ok) {
				setStatus("success");
				setName("");
				setEmail("");
				setMessage("");
			} else {
				setStatus("error");
			}
		} catch {
			setStatus("error");
		}
	};

	if (!isMounted) return null;

	return (
		<div className="min-h-[calc(100dvh-4rem)] bg-zinc-50 dark:bg-gray-900 py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center font-sans">
			<div className="max-w-md w-full space-y-8 bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 transition-all duration-300">
				<div>
					<h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight">
						{t("contact.title")}
					</h2>
				</div>

				{status === "success" && (
					<div className="rounded-xl bg-emerald-50 dark:bg-emerald-950/30 p-4 border border-emerald-200 dark:border-emerald-800 flex items-start gap-3 text-emerald-800 dark:text-emerald-300">
						<CheckCircle2 className="w-5 h-5 mt-0.5 shrink-0" />
						<div>
							<p className="text-sm font-medium">{t("contact.success")}</p>
						</div>
					</div>
				)}

				{status === "error" && (
					<div className="rounded-xl bg-rose-50 dark:bg-rose-950/30 p-4 border border-rose-200 dark:border-rose-800 flex items-start gap-3 text-rose-800 dark:text-rose-300">
						<AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
						<div>
							<p className="text-sm font-medium">{t("contact.error")}</p>
						</div>
					</div>
				)}

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="rounded-md space-y-4">
						<div>
							<label
								htmlFor="name"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								{t("contact.name")}
							</label>
							<input
								id="name"
								name="name"
								type="text"
								required
								value={name}
								onChange={(e) => setName(e.target.value)}
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
								placeholder={t("contact.placeholder.name")}
								disabled={status === "sending"}
							/>
						</div>
						<div>
							<label
								htmlFor="email"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								{t("contact.email")}
							</label>
							<input
								id="email"
								name="email"
								type="email"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200"
								placeholder={t("contact.placeholder.email")}
								disabled={status === "sending"}
							/>
						</div>
						<div>
							<label
								htmlFor="message"
								className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
							>
								{t("contact.message")}
							</label>
							<textarea
								id="message"
								name="message"
								rows={4}
								required
								value={message}
								onChange={(e) => setMessage(e.target.value)}
								className="appearance-none relative block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm transition-all duration-200 resize-none"
								placeholder={t("contact.placeholder.message")}
								disabled={status === "sending"}
							/>
						</div>
					</div>

					<div>
						<button
							type="submit"
							disabled={status === "sending" || !name.trim() || !email.trim() || !message.trim()}
							className="group relative w-full flex justify-center py-2.5 px-4 border border-transparent text-sm font-medium rounded-xl text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer"
						>
							<Send className="w-4 h-4" />
							{status === "sending" ? t("contact.sending") : t("contact.send")}
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
