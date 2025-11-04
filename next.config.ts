import type { NextConfig } from "next";

const isGitHubPages = process.env.GITHUB_PAGES === 'true';

const nextConfig: NextConfig = {
	...(isGitHubPages && {
		output: "export",
		trailingSlash: true,
	}),
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: isGitHubPages ? {
		unoptimized: true,
	} : undefined,
	allowedDevOrigins: ["http://172.26.64.1:3000"],
};

export default nextConfig;
