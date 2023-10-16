import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import {
  useContract
} from "@thirdweb-dev/react";

import Menu from "../components/menu";
import Footer from "../components/footer";
import { NFTslider } from "../components/nftslider";

const Home: NextPage = () => {
  const nftDropContractAddress = process.env.nftDropContractAddress
  const nftContract = useContract(nftDropContractAddress, "nft-drop");
  const { contract } = useContract(process.env.stakingContractAddress);

  const [state, setState] = useState({
    totalNFTSupply: 0,
    claimedNFTCount: 0,
    unclaimedNFTCount: 0,
    stakedNFTCount: 0,
    hourlyRewardPerNFT: 0
  });

  useEffect(() => {
    if (!nftContract) return;

    async function getDashboardInfo() {

      const totalNFTSupply = await nftContract?.contract?.totalSupply();
      const claimedNFTCount = await nftContract?.contract?.totalClaimedSupply();
      const unclaimedNFTCount = await nftContract?.contract?.totalUnclaimedSupply();
      const stakedNFTCount = await contract?.call("totalStakedSupply");
      const rewardPerToken: number = await contract?.call("getRewardPerToken");

      setState({
        ...state,
        totalNFTSupply: totalNFTSupply?.toNumber() as number,
        claimedNFTCount: claimedNFTCount?.toNumber() as number,
        unclaimedNFTCount: unclaimedNFTCount?.toNumber() as number,
        stakedNFTCount: stakedNFTCount?.toNumber() as number,
        hourlyRewardPerNFT: rewardPerToken / (10 ** 18) * 3600
      });

    }


    getDashboardInfo();

  }, [nftContract, contract, state]);

  if (!state.totalNFTSupply) {
    return <div className={styles.container}>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Menu />

      {/* Top Section Banner*/}
      <div className={styles.topSection}></div>

      <div className={`${styles.spacerTop}`} />

      <div
        className={styles.nftBoxGrid}
        role="button"
      >

        <div className={styles.optionSelectBox}>
          <img src={`/icons/nft-icon.png`} width="60" alt="nft stats" />
          <h2 className={styles.selectBoxTitle}>NFT stats</h2>
          <p className={styles.selectBoxDescription}>
            Total NFT supply / Claimed / Available: <strong>{state.totalNFTSupply}</strong> / <strong>{state.claimedNFTCount}</strong> / <strong>{state.unclaimedNFTCount}</strong> <br />
            Number of staked NFTs: <strong>{state.stakedNFTCount} </strong><br />
            Hourly staking reward per NFT: <strong>{state.hourlyRewardPerNFT} SAFU</strong> <br />
            <small>(hourly SAFU emission divided by total number of staked NFTs)</small> <br />
          </p>
        </div>

        <div className={styles.optionSelectBox}>
          <img src={`/icons/emission-icon.png`} width="60" alt="token emission" />
          <h2 className={styles.selectBoxTitle}>Token emission</h2>
          <p className={styles.selectBoxDescription}>
            Circulating SAFU supply: <strong>100 Million</strong> <br />
            Max SAFU supply: <strong>200 Million</strong> <br />
            Emission schedule(year): <strong>10 Million SAFU</strong> <br />
            Emission schedule(hour): <strong>1142 SAFU</strong>
          </p>
        </div>

        <Link href="/mint">
          <div className={styles.optionSelectBox}>
            <img src={`/icons/mint-icon.png`} width="60" alt="token mint nft" />
            <h2 className={styles.selectBoxTitle}>Mint a new NFT</h2>
            <p className={styles.selectBoxDescription}>
              Use the <strong>SAFU NFT</strong> mint contract to claim your own <strong>SAFU Guardian NFT</strong>.
            </p>
            <button
              className={`${styles.mainButton} ${styles.spacerBottom}`}
            >
              Mint NFT
            </button>
          </div>
        </Link>

        <Link href="/stake">
          <div className={styles.optionSelectBox} role="button">
            <img src={`/icons/stake-icon.png`} width="60" alt="token stake nft" />
            <h2 className={styles.selectBoxTitle}>Stake Your NFTs</h2>
            <p className={styles.selectBoxDescription}>
              Stake your ERC-721 <strong>SAFU Guardian</strong> NFTs and earn <strong>SAFU</strong> tokens.
            </p>
            <button
              className={`${styles.mainButton} ${styles.spacerBottom}`}
            >
              Stake NFT
            </button>
          </div>
        </Link>

      </div>

      <NFTslider />
      <hr className={`${styles.divider}`} />

      <small>Staking Contract Address <br />
        <a href={"https://goerli.etherscan.io/address/" + process.env.stakingContractAddress} target="_blank" rel="noreferrer">
          {process.env.stakingContractAddress}
        </a>
      </small>

      <Footer />
    </div>
  );
};

export default Home;
