"use client";
import { Moon, Settings, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import "@/lib/i18n";

export function ThemeButton() {
	const { resolvedTheme, setTheme } = useTheme();
	const [isMounted, setIsMounted] = useState(false);
	const { t } = useTranslation();
	useEffect(() => {
		setIsMounted(true);
	}, []);

	if (!isMounted) {
		return (
			<button className="btn-ghost btn-circle btn" disabled type="button">
				<Sun className="opacity-50" />
			</button>
		);
	}

	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="btn-ghost btn-circle btn">
				{resolvedTheme === "dark" ? <Sun /> : <Moon />}
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-40">
				<DropdownMenuItem className="h-10 text-lg" onClick={() => setTheme("light")}>
					<Sun className="mr-2 h-4 w-4" />
					{isMounted ? t("theme.light") : <>&nbsp;</>}
				</DropdownMenuItem>
				<DropdownMenuItem className="h-10 text-lg" onClick={() => setTheme("dark")}>
					<Moon className="mr-2 h-4 w-4" />
					{isMounted ? t("theme.dark") : <>&nbsp;</>}
				</DropdownMenuItem>
				<DropdownMenuItem className="h-10 text-lg" onClick={() => setTheme("system")}>
					<Settings className="mr-2 h-4 w-4" />
					{isMounted ? t("theme.system") : <>&nbsp;</>}
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
