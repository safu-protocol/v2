/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    nftDropContractAddress: "0xb949F51f4DB16113e2175e385E86eCb0bd047a11",
    tokenContractAddress: "0x324Ae774232F28693f5Af66509a0b4965C2F18DC",
    stakingContractAddress: "0x3044D888D62166a80418Ed0375C9C17E21752D8a"
  },
}

module.exports = nextConfig
