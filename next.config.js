/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    openSeaUrl: "https://testnets.opensea.io/collection/safu-guardian-nft",
    nftDropContractAddress: "0x708197c3E687cdC93E6354351962c7c7921904Ba",
    tokenContractAddress: "0xE473b2A0791DCcECBD9a2aD6960104dF03D310ED",
    stakingContractAddress: "0x7c08b08e17189b2976314eBf6ebfAc1F2A82e3D7",
    clientId: "34292c8a9b63f5c812929175fbd3c64f"
  },
}

module.exports = nextConfig
