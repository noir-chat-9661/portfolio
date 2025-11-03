"use client";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

export function LanguageManager() {
	const { i18n } = useTranslation();

	useEffect(() => {
		if (i18n.language) {
			document.documentElement.lang = i18n.language;
		}
	}, [i18n.language]);
	return null;
}
