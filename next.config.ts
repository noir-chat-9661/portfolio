import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	output: "export",
	trailingSlash: true,
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	images: {
		unoptimized: true,
	},
	allowedDevOrigins: ["http://172.26.64.1:3000"],
};

export default nextConfig;
