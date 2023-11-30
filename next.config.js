/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'standalone',
    env: {
        apiUrl: process.env.URL_API != undefined ? process.env.URL_API : "http://localhost:8081/api"
      },
}

module.exports = nextConfig
