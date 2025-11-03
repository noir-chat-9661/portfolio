"use client";
import { Globe } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useTranslation } from 'react-i18next';

import "@/lib/i18n";

export function LangButton() {
	const { i18n } = useTranslation();
	return (
		<DropdownMenu>
			<DropdownMenuTrigger className="btn-ghost btn-circle btn">
				<Globe />
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end" className="w-10">
				<DropdownMenuItem
					className="h-10 text-lg"
					onClick={() => {
						i18n.changeLanguage('ja');
					}}
				>
					日本語
				</DropdownMenuItem>
				<DropdownMenuItem
					className="h-10 text-lg"
					onClick={() => {
						i18n.changeLanguage('en');
					}}
				>
					English
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}
