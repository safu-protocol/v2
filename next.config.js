/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    nftDropContractAddress: "0xb949F51f4DB16113e2175e385E86eCb0bd047a11",
    tokenContractAddress: "0x324Ae774232F28693f5Af66509a0b4965C2F18DC",
    stakingContractAddress: "0xB878Efd4B1e119ED5010b11698fd2c61609c1DA0"
  },
}

module.exports = nextConfig
