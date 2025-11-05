import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
	CardFooter,
} from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import { ExternalLink, Play } from "lucide-react";
import { getTechColor } from "@/lib/techColors";
import { Button } from "@/components/ui/button";

import "@/lib/i18n";

interface Product {
	name: string;
	href: string;
	test: string | null;
	description: {
		ja: string;
		en: string;
	};
	techStack: string[];
}

export function Products() {
	const { t, i18n } = useTranslation();
	const [isMounted, setIsMounted] = useState(false);
	const [products, setProducts] = useState<Product[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setIsMounted(true);

		fetch("/data/products.json")
			.then((res) => res.json())
			.then((data) => {
				setProducts(data);
				setLoading(false);
			})
			.catch((err) => {
				console.error("Failed to load products:", err);
				setLoading(false);
			});
	}, []);

	const currentLang = i18n.language as "ja" | "en";

	return (
		<div className="p-4 py-10 min-h-[calc(100vh-var(--spacing)*16)] overflow-y-auto">
			<h2 className="text-sm xs:text-lg sm:text-md md:text-lg lg:text-xl font-semibold mb-4 select-none text-center">
				{isMounted ? t("home.products") : <>&nbsp;</>}
			</h2>
			{loading ? (
				<div className="text-center text-gray-500 dark:text-gray-400">
					Loading...
				</div>
			) : (
				<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 max-w-7xl mx-auto">
					{products.map((product) => (
						<Card
							key={product.name}
							className="h-full transition-all duration-300 hover:shadow-lg flex flex-col"
						>
							<CardHeader>
								<CardTitle className="text-lg">
									{product.name}
								</CardTitle>
							</CardHeader>
							<CardContent className="flex-1">
								<CardDescription className="text-sm">
									{product.description[currentLang] ||
										product.description.en}
								</CardDescription>
							</CardContent>
							<CardFooter className="flex flex-col gap-3">
								<div className="flex flex-wrap gap-2 w-full">
									{product.techStack.map((tech) => (
										<span
											key={tech}
											className={`px-2 py-1 text-xs rounded-md font-medium ${getTechColor(
												tech
											)}`}
										>
											{tech}
										</span>
									))}
								</div>
								<div className="flex gap-2 w-full flex-col sm:flex-row">
									{product.test && (
										<NextLink
											href={product.test}
											className="flex-1"
										>
											<Button
												variant="default"
												size="sm"
												className="w-full"
											>
												<Play className="mr-2 h-4 w-4" />
												{t("products.test")}
											</Button>
										</NextLink>
									)}
									<NextLink
										href={product.href}
										target="_blank"
										rel="noopener noreferrer"
										className={
											product.test ? "flex-1" : "w-full"
										}
									>
										<Button
											variant="outline"
											size="sm"
											className="w-full"
										>
											<ExternalLink className="mr-2 h-4 w-4" />
											GitHub
										</Button>
									</NextLink>
								</div>
							</CardFooter>
						</Card>
					))}
				</div>
			)}
		</div>
	);
}
