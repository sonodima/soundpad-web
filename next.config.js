const withPWA = require("next-pwa");

/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
};

module.exports = withPWA({
  pwa: {
    dest: "public",
    register: true,
    skipWaiting: true,
  },
});
