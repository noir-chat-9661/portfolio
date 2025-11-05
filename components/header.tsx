"use client";
import NextLink from "next/link";
import Image from "next/image";
import { LangButton } from "@/components/langButton";
import { ThemeButton } from "@/components/themeButton";
import { Files, House, Link, User } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";

import "@/lib/i18n";
import { cn } from "@/lib/utils";

export function Header() {
	const { t } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);
	const pathname = usePathname();

	const isProductsPage = pathname.startsWith("/products");

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<header
			id="header"
			className="sticky top-0 left-0 w-full h-16 bg-white border-b border-gray-200 z-50 dark:bg-gray-800 dark:border-gray-700 select-none"
		>
			<div className="absolute left-4 top-1/2 transform -translate-y-1/2 flex items-center">
				<NextLink
					title="home"
					href="/"
				>
					<Image
						src="/picts/icon.webp"
						alt="Icon"
						width={36}
						height={36}
						className="rounded-full w-10 h-10 mr-3 pointer-events-none select-none"
					/>
				</NextLink>
				<div className={cn("text-xl font-bold", isProductsPage ? "sm:block hidden" : "lg:block hidden")}>
					{isMounted
						? t(isProductsPage ? "products.title" : "header.title")
						: <>&nbsp;</>
					}
				</div>
			</div>
			{isProductsPage ? (
				<div className="max-w-3xl mx-auto h-full flex items-center justify-center px-4 sm:px-6 lg:px-8 gap-8 sm:gap-5 md:gap-10 lg:gap-16 xl:gap-20 2xl:gap-24">
					<NextLink
						title="Home"
						href="/"
						className="sm:w-25 w-12 text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex flex-col items-center sm:flex-row"
					>
						<House className="inline-block mb-1 mr-1 h-5 w-5" />
						<span className="sm:text-lg text-sm">
							{isMounted ? t("header.home") : <>&nbsp;</>}
						</span>
					</NextLink>
					<NextLink
						title="Products"
						href="/products"
						className="sm:w-25 w-15 text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex flex-col items-center sm:flex-row"
					>
						<Files className="inline-block mb-1 mr-1 h-5 w-5" />
						<span className="md:text-lg text-sm">
							{isMounted ? t("products.title") : <>&nbsp;</>}
						</span>
					</NextLink>
				</div>
			) : (
				<div className="max-w-3xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8 justify-center gap-1 sm:gap-3 md:gap-10 lg:gap-16 xl:gap-20 2xl:gap-24">
					<NextLink
						title="Home"
						href="/"
						className="sm:w-25 w-12 text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex flex-col items-center sm:flex-row"
					>
						<House className="inline-block mb-1 mr-1 h-5 w-5" />
						<span className="sm:text-lg text-sm">
							{isMounted ? t("header.home") : <>&nbsp;</>}
						</span>
					</NextLink>
					<NextLink
						title="About"
						href="/about"
						className="sm:w-25 w-15 text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex flex-col items-center sm:flex-row"
					>
						<User className="inline-block mb-1 mr-1 h-5 w-5" />
						<span className="sm:text-lg text-sm">
							{isMounted ? t("header.about") : <>&nbsp;</>}
						</span>
					</NextLink>
					<NextLink
						title="Links"
						href="/links"
						className="sm:w-25 w-15 text-lg font-medium text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white flex flex-col items-center sm:flex-row"
					>
						<Link className="inline-block mb-1 mr-1 h-5 w-5" />
						<div className="sm:text-lg text-sm">
							{isMounted ? t("header.link") : <>&nbsp;</>}
						</div>
					</NextLink>
				</div>
			)}
			<div className="absolute right-4 sm:right-8 top-1/2 transform -translate-y-1/2 gap-2 sm:gap-5 flex flex-col items-center xs:flex-row">
				<LangButton />
				<ThemeButton />
			</div>
		</header>
	);
}
