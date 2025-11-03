export const techColors: Record<string, string> = {
	"TypeScript": "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200",
	"JavaScript": "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200",
	"Python": "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200",
	"Brainfuck": "bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200",
	"Rust": "bg-orange-100 dark:bg-orange-900 text-orange-800 dark:text-orange-200",
	"Go": "bg-cyan-100 dark:bg-cyan-900 text-cyan-800 dark:text-cyan-200",

	"React": "bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200",
	"Next.js": "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200",
	"Vue": "bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200",
	"Svelte": "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200",

	"Tailwind CSS": "bg-teal-100 dark:bg-teal-900 text-teal-800 dark:text-teal-200",

	"default": "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
};

export function getTechColor(tech: string): string {
	return techColors[tech] || techColors.default;
}
