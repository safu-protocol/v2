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
        process.env.nftDropContractAddress
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
                There are only limited number of <strong>1000 SAFUMA</strong> NFTs available to mint. <br />These NFTs can be staked to earn <strong>SAFU</strong>(ERC-20) tokens according to the token emission schedule.
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
