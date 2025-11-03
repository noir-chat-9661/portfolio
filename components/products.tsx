import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import NextLink from "next/link";
import { ExternalLink } from "lucide-react";
import { getTechColor } from "@/lib/techColors";

import "@/lib/i18n";

interface Product {
	name: string;
	href: string;
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
		
		// Load products from JSON
		fetch('/data/products.json')
			.then(res => res.json())
			.then(data => {
				setProducts(data);
				setLoading(false);
			})
			.catch(err => {
				console.error('Failed to load products:', err);
				setLoading(false);
			});
	}, []);
	
	const currentLang = i18n.language as 'ja' | 'en';

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
						<NextLink
							key={product.name}
							href={product.href}
							target="_blank"
							rel="noopener noreferrer"
							className="group"
						>
							<Card className="h-full transition-all duration-300 hover:shadow-lg hover:scale-105 cursor-pointer">
								<CardHeader>
									<CardTitle className="flex items-center justify-between text-lg">
										<span>{product.name}</span>
										<ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
									</CardTitle>
								</CardHeader>
								<CardContent>
									<CardDescription className="text-sm">
										{product.description[currentLang] || product.description.en}
									</CardDescription>
								</CardContent>
								<CardFooter>
									<div className="flex flex-wrap gap-2">
										{product.techStack.map((tech) => (
											<span
												key={tech}
												className={`px-2 py-1 text-xs rounded-md font-medium ${getTechColor(tech)}`}
											>
												{tech}
											</span>
										))}
									</div>
								</CardFooter>
							</Card>
						</NextLink>
					))}
				</div>
			)}
		</div>
	);
}
