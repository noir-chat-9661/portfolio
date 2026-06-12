import type { NextConfig } from "next";

const isStaticExport = process.env.GITHUB_PAGES === 'true' || process.env.CF_PAGES === '1';

const nextConfig: NextConfig = {
	...(isStaticExport && {
		output: "export",
		trailingSlash: true,
	}),
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: isStaticExport ? {
		unoptimized: true,
	} : undefined,
	allowedDevOrigins: [],
};

export default nextConfig;
