import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";
import Link from 'next/link';

import Menu from "../components/menu";
import Footer from "../components/footer";

const Home: NextPage = () => {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <Menu />

      {/* Top Section */}
      <h1 className={styles.h1}>Safu Protocol (SAFU) staking - stake NFT - earn SAFU!</h1>

      <div
        className={styles.nftBoxGrid}
        role="button"
      >

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
