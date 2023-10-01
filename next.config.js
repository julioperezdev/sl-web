/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'standalone',
    env: {
        //apiUrl: 'sl-api:18081/api',
        apiUrl: 'http://localhost:8081/api',
      },
}

module.exports = nextConfig
