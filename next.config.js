/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	images: {
		domains: ["res.cloudinary.com", "localhost", "www.dirtyapronrecipes.com"],
	},
	env: {
		API_URL: process.env.API_URL,
		NEXT_URL: process.env.NEXT_URL,
	},
};

module.exports = nextConfig;
