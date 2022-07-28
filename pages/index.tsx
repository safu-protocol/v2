import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";
import Link from 'next/link';

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
      const stakedNFTCount = await contract?.call("getTotalStakedTokens");

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

  }, [nftContract, contract]);


  return (
    <div className={styles.container}>
      <Menu />

      {/* Top Section */}
      <h1 className={styles.h1}>Safu Protocol (SAFU) staking - stake NFT - earn SAFU!</h1>

      <div
        className={styles.nftBoxGrid}
        role="button"
      >

        <div className={styles.optionSelectBox}>
          <img src={`/icons/drop.webp`} alt="drop" />
          <h2 className={styles.selectBoxTitle}>NFT stats</h2>
          <p className={styles.selectBoxDescription}>
            Total NFT supply: {state.totalNFTSupply} <br />
            Claimed NFT supply: {state.claimedNFTCount} <br />
            Available to Mint: {state.unclaimedNFTCount} <br />
            Number of staked NFTs: {state.stakedNFTCount} <br />
            Hourly staking reward per NFT: {state.hourlyRewardPerNFT} SAFUYIELD <br />
            (hourly SAFUYIELD emission divided by total number of staked NFTs)
          </p>
        </div>

        <div className={styles.optionSelectBox}>
          <img src={`/icons/drop.webp`} alt="drop" />
          <h2 className={styles.selectBoxTitle}>Token emission</h2>
          <p className={styles.selectBoxDescription}>
            Circulating SAFUYIELD supply: 100 Million <br />
            Max SAFUYIELD supply: 200 Million <br />
            Emission schedule(year): 10 Million SAFUYIELD <br />
            Emission schedule(hour): 1142 SAFUYIELD
          </p>
        </div>

        <Link href="/mint">
          <div className={styles.optionSelectBox}>
            <img src={`/icons/drop.webp`} alt="drop" />
            <h2 className={styles.selectBoxTitle}>Mint a new NFT</h2>
            <p className={styles.selectBoxDescription}>
              Use the NFT Drop Contract to claim an NFT from the collection.
            </p>
          </div>
        </Link>

        <Link href="/stake">
          <div
            className={styles.optionSelectBox}
            role="button"
          >
            <img src={`/icons/token.webp`} alt="drop" />
            <h2 className={styles.selectBoxTitle}>Stake Your NFTs</h2>
            <p className={styles.selectBoxDescription}>
              Use the custom staking contract deployed via <b>thirdweb Deploy</b>{" "}
              to stake your NFTs, and earn tokens from the <b>Token</b> contract.
            </p>
          </div>
        </Link>

      </div>

      <Footer />
    </div>
  );
};

export default Home;
