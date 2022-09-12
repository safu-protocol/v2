import { useAddress, useNFTDrop, ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import Footer from "../components/footer";

const Mint: NextPage = () => {
    const router = useRouter();
    // Get the currently connected wallet's address
    const address = useAddress();

    // Get the NFT Collection contract
    const nftDropContract = useNFTDrop(
        process.env.nftDropContractAddress
    );

    const openSeaUrl = process.env.openSeaUrl;

    const [state, setState] = useState({
        totalNFTSupply: 0,
        claimedNFTCount: 0,
    });

    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        if (!nftDropContract) return;

        async function geMintInfo() {

            const totalNFTSupply = await nftDropContract?.totalSupply();
            const claimedNFTCount = await nftDropContract?.totalClaimedSupply();

            setState({
                ...state,
                totalNFTSupply: totalNFTSupply?.toNumber() as number,
                claimedNFTCount: claimedNFTCount?.toNumber() as number,
            });

        }

        geMintInfo();
        setShowChild(true);

    }, [nftDropContract, state]);

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
                There are only limited number of <strong>1111 SAFU Guardian</strong> NFTs available to mint. <br />These NFTs can be staked to earn <strong>SAFU</strong>(ERC-20) tokens according to the token emission schedule.
            </p>
            <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

            {!address ? (
                <>
                    {showChild &&
                        <div className={styles.mainButton}>
                            <ConnectWallet
                                // Some customization of the button style
                                colorMode="dark"
                                accentColor="#2CAAAA"
                            />
                        </div>
                    }
                </>
            ) : (
                <>
                    <strong>{state.claimedNFTCount} / {state.totalNFTSupply} claimed!</strong>
                    <button
                        className={`${styles.mainButton} ${styles.spacerBottom}`}
                        onClick={() => claimNft()}
                    >
                        Claim An NFT
                    </button>
                    <a className={styles.secondaryButton} target="_blank" href={openSeaUrl} rel="noopener noreferrer">Full collection on OpenSea</a>
                </>
            )} {<Footer />}
        </div>
    );
};

export default Mint;
