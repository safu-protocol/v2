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

      setState({
        ...state,
        totalNFTSupply: totalNFTSupply?.toNumber() as number,
        claimedNFTCount: claimedNFTCount?.toNumber() as number,
        unclaimedNFTCount: unclaimedNFTCount?.toNumber() as number,
      });

    }

    getDashboardInfo();

  }, [nftContract.contract]);

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
          <h2 className={styles.selectBoxTitle}>SAFUNFT stats</h2>
          <p className={styles.selectBoxDescription}>
            Supply / Claimed / Available <br /> <strong>{state.totalNFTSupply}</strong> / <strong>{state.claimedNFTCount}</strong> / <strong>{state.unclaimedNFTCount}</strong> <br />
          </p>
        </div>

        <div className={styles.optionSelectBox}>
          <img src={`/icons/emission-icon.png`} width="60" alt="token stake" />
          <h2 className={styles.selectBoxTitle}>LP Staking - vote now</h2>
          <p className={styles.selectBoxDescription}>
            Total Emission schedule(year): <strong>Soon</strong> <br />
            Total Emission schedule(hour): <strong>Soon</strong>
          </p>
        </div>

        <Link href="/mint">
          <div className={styles.optionSelectBox}>
            <img src={`/icons/mint-icon.png`} width="60" alt="token mint nft" />
            <h2 className={styles.selectBoxTitle}>Mint SAFUNFT</h2>
            <p className={styles.selectBoxDescription}>
              Use the mint contract to claim your <strong>SAFU Guardian NFT</strong>
            </p>
            <button
              className={`${styles.mainButton} ${styles.spacerBottom}`}
            >
              Mint NFT
            </button>
          </div>
        </Link>

        <Link href="/scan">
          <div className={styles.optionSelectBox} role="button">
            <img src={`/icons/stake-icon.png`} width="60" alt="token stake nft" />
            <h2 className={styles.selectBoxTitle}>Scan a Token</h2>
            <p className={styles.selectBoxDescription}>
              SAFUSCAN token scanner
            </p>
            <button
              className={`${styles.mainButton} ${styles.spacerBottom}`}
            >
              Scan Token
            </button>
          </div>
        </Link>

      </div>

      <NFTslider />
      <hr className={`${styles.divider}`} />

      <Footer />
    </div>
  );
};

export default Home;
