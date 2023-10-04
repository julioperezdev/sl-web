/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'standalone',
    env: {
        //apiUrl: 'http://sl-api:8081/api',
        apiUrl: 'http://localhost:18081/api',
      },
}

module.exports = nextConfig
