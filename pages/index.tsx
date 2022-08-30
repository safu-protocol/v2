import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from "next/link";

import {
  useContract,
  useNFTDrop
} from "@thirdweb-dev/react";


import Menu from "../components/menu";
import Footer from "../components/footer";

const Home: NextPage = () => {
  const nftDropContractAddress = process.env.nftDropContractAddress
  const nftContract = useNFTDrop(nftDropContractAddress);
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

      const totalNFTSupply = await nftContract?.totalSupply();
      const claimedNFTCount = await nftContract?.totalClaimedSupply();
      const unclaimedNFTCount = await nftContract?.totalUnclaimedSupply();
      const stakedNFTCount = await contract?.call("totalStakedSupply");

      setState({
        ...state,
        totalNFTSupply: totalNFTSupply?.toNumber() as number,
        claimedNFTCount: claimedNFTCount?.toNumber() as number,
        unclaimedNFTCount: unclaimedNFTCount?.toNumber() as number,
        stakedNFTCount: stakedNFTCount?.toNumber() as number,
        hourlyRewardPerNFT: 1142 / stakedNFTCount?.toNumber() as number
      });

    }


    getDashboardInfo();

  }, [nftContract, contract, state]);


  return (
    <div className={styles.container}>
      <Menu />

      {/* Top Section Banner*/}
      <div className={styles.topSection}></div>

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
            <small>(hourly SAFU emission divided by total number of staked NFTs)</small>
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
              Use the <strong>SAFUNFT</strong> mint contract to claim your own <strong>SAFUMA NFT</strong>.
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
              Stake your ERC-721 <strong>SAFUMA</strong> NFTs and earn <strong>SAFU</strong> tokens.
            </p>
            <button
              className={`${styles.mainButton} ${styles.spacerBottom}`}
            >
              Stake NFT
            </button>
          </div>
        </Link>

      </div>

      <Footer />
    </div>
  );
};

export default Home;
