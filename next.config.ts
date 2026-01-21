/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "a0.muscache.com",
                protocol: "https",
                port: "",
            },
            {
                hostname: "res.cloudinary.com",
                protocol: "https",
                port: "",
            },
            {
                hostname: "lh3.googleusercontent.com",
                protocol: "https",
                port: "",
            }
        ],
    },
};

export default nextConfig;