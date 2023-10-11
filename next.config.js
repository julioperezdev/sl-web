/** @type {import('next').NextConfig} */
const nextConfig = {
    output:'standalone',
    env: {
        apiUrl: 'http://localhost:8081/api', //LOCAL
        //apiUrl: 'http://localhost:18081/api', //PROD
      },
}

module.exports = nextConfig
