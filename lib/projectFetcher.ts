export async function fetchGitHubRaw(
	owner: string,
	repo: string,
	path: string,
	branch: string = "main"
): Promise<string> {
	const url = `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${path}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch file: ${response.status} ${response.statusText}`
			);
		}

		return await response.text();
	} catch (error) {
		console.error("Error fetching raw GitHub file:", error);
		throw error;
	}
}

export async function fetchNpmPackage(
	packageName: string,
	filePath: string = "index.js"
): Promise<string> {
	const url = `https://unpkg.com/${packageName}/${filePath}`;

	try {
		const response = await fetch(url);

		if (!response.ok) {
			throw new Error(
				`Failed to fetch npm package: ${response.status} ${response.statusText}`
			);
		}

		return await response.text();
	} catch (error) {
		console.error("Error fetching npm package:", error);
		throw error;
	}
}

export async function fetchReadme(
	type: "github" | "npm",
	packageNameOrRepo: string,
	owner?: string,
	branch: string = "main"
): Promise<string> {
	try {
		if (type === "github" && owner) {
			return await fetchGitHubRaw(
				owner,
				packageNameOrRepo,
				"README.md",
				branch
			);
		} else if (type === "npm") {
			const url = `https://unpkg.com/${packageNameOrRepo}/README.md`;
			const response = await fetch(url);
			if (!response.ok) throw new Error("README not found");
			return await response.text();
		}
		throw new Error("Invalid configuration");
	} catch (error) {
		console.error("Error fetching README:", error);
		return "// No README found\n// Add your sample code here";
	}
}

export function convertReadmeToCode(readme: string): string {
	return readme
		.split("\n")
		.map((line) => `// ${line}`)
		.join("\n");
}
