/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["vqeowfcbngeyipwzpkul.supabase.co"],
	},
	async headers() {
		return [
			{
				source: "/:path*",
				headers: [
					{
						key: "Access-Control-Allow-Origin",
						value: "*",
					},
					{
						key: "Access-Control-Allow-Methods",
						value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
					},
					{
						key: "Access-Control-Allow-Headers",
						value: "X-Requested-With, Content-Type, Authorization",
					},
					{
						key: "Access-Control-Allow-Credentials",
						value: "true",
					},
				],
			},
		];
	},
};

export default nextConfig;