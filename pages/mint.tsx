import { useAddress, useMetamask, useNFTDrop } from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import Footer from "../components/footer";

const Mint: NextPage = () => {
    const router = useRouter();
    // Get the currently connected wallet's address
    const address = useAddress();

    // Function to connect to the user's Metamask wallet
    const connectWithMetamask = useMetamask();

    // Get the NFT Collection contract
    const nftDropContract = useNFTDrop(
        "0xb949F51f4DB16113e2175e385E86eCb0bd047a11"
    );

    async function claimNft() {
        try {
            const tx = await nftDropContract?.claim(1);
            console.log(tx);
            alert("NFT Claimed!");
            router.push(`/stake`);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    return (
        <div className={styles.container}>
            <Menu />
            <h1 className={styles.h1}>Mint An NFT!</h1>

            <p className={styles.explain}>
                Here is where we use our <b>NFT Drop</b> contract to allow users to mint
                one of the NFTs that we lazy minted.
            </p>
            <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

            {!address ? (
                <button
                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                    onClick={connectWithMetamask}
                >
                    Connect Wallet
                </button>
            ) : (
                <button
                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                    onClick={() => claimNft()}
                >
                    Claim An NFT
                </button>
            )} {<Footer />}
        </div>
    );
};

export default Mint;
