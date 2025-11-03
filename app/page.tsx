"use client";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Products } from "@/components/products";
import { ChevronDown } from "lucide-react";

import "@/lib/i18n";
import { cn } from "@/lib/utils";

export default function Home() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
		sessionStorage.setItem("visited", "true");
	}, []);

	const scrollToProducts = () => {
		const scrollContainer = document.querySelector('.overflow-y-auto');
		if (scrollContainer) {
			const headerHeight = 64;
			const viewportHeight = window.innerHeight;
			scrollContainer.scrollTo({
				top: viewportHeight - headerHeight,
				behavior: "smooth"
			});
		}
	};

	return (
		<div className="bg-zinc-50 font-sans dark:bg-gray-900">
			<div className="h-[calc(100vh-var(--spacing)*16)] flex items-center content-center justify-center text-center flex-col relative">
				<div
					className={cn(
						"select-none animate-fade-in transition-[opacity,translate] duration-1800 ease-in-out",
						isMounted
							? "opacity-100 translate-y-0"
							: "-translate-y-50 opacity-0"
					)}
				>
					<h1 className="font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl">
						{isMounted ? t("home.title") : <>&nbsp;</>}
					</h1>
					<Image
						src="/icon.webp"
						alt="Icon"
						width={128}
						height={128}
						className="mt-10 mx-auto w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 lg:w-48 lg:h-48"
					/>
				</div>
				
				<button
					onClick={scrollToProducts}
					className={cn(
						"absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-all duration-300 cursor-pointer select-none animate-bounce",
						isMounted ? "opacity-100" : "opacity-0"
					)}
					aria-label="Scroll down"
				>
					<span className="text-sm font-medium">
						{isMounted ? "Scroll Down" : <>&nbsp;</>}
					</span>
					<ChevronDown className="w-6 h-6" />
				</button>
			</div>
			<Products />
		</div>
	);
}
