import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	reactStrictMode: true,
	compiler: {
		styledComponents: true,
	},
	allowedDevOrigins: ["http://172.26.64.1:3000"]
};

export default nextConfig;
