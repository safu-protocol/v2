import { useAddress, useContract, ConnectWallet } from "@thirdweb-dev/react";
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
    const nftDropContract = useContract(
        process.env.nftDropContractAddress, "nft-drop"
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

            const totalNFTSupply = await nftDropContract?.contract?.totalSupply();
            const claimedNFTCount = await nftDropContract?.contract?.totalClaimedSupply();

            setState({
                ...state,
                totalNFTSupply: totalNFTSupply?.toNumber() as number,
                claimedNFTCount: claimedNFTCount?.toNumber() as number,
            });

        }

        geMintInfo();
        setShowChild(true);

    }, [nftDropContract.contract]);

    async function claimNft() {
        try {
            const tx = await nftDropContract?.contract?.claim(1);
            console.log(tx);
            alert("NFT Claimed!");
            router.push(`/stake`);
        } catch (error) {
            console.error(error);
            alert(error);
        }
    }

    if (!state.totalNFTSupply) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Menu />
            <h1 className={styles.h1}>Mint SAFUNFT</h1>

            <p className={styles.explain}>
                There are only a limited number of <strong>1269 SAFU Guardian</strong> NFTs available to mint <br /> (20 Billion SAFUYIELD burned when claimed) <br />
            </p>
            <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />

            {!address ? (
                <>
                    {showChild &&
                        <div>
                            <ConnectWallet
                                className={`${styles.mainButton} ${styles.spacerBottom}`}
                                theme="light"
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
                        Mint SAFUNFT
                    </button>
                    <a className={styles.secondaryButton} target="_blank" href={openSeaUrl} rel="noopener noreferrer">Full collection on OpenSea</a>
                </>
            )} {<Footer />}
        </div>
    );
};

export default Mint;
