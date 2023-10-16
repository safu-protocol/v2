import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import { Partners } from "../components/partners";
import Footer from "../components/footer";

const Explore: NextPage = () => {
    const address = useAddress();

    // Define the NFT contract address
    const nftDropContractAddress: string = process.env.nftDropContractAddress!;
    const nftDropContract = useContract(nftDropContractAddress, "nft-drop");
    const { data: nfts, isLoading: loading } = useNFTs(nftDropContract?.contract, { start: 0, count: 100 });

    if (loading) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Menu />
            <h1 className={styles.h1}>Full NFT Collection</h1>

            <p className={styles.explain}>
                SAFU Guardians are a unique collection of <strong>1269 programatically generated NFTs</strong> available for SAFUYIELD holders. <br />
                SAFU Guardian NFTs are provably-rare piece of art, giving access to SAFU Protocol NFT staking from day 1, also giving full access to SAFUSCAN token scanner tool and other utilities..
            </p>
            <hr className={`${styles.smallDivider} ${styles.detailPageHr}`} />
            <>
                {nfts && nfts?.length > 0 && (
                    <div className={styles.nftBoxGrid}>
                        {nfts
                            .filter(
                                (nft) =>
                                    nft.owner !== "0x0000000000000000000000000000000000000000"
                            )
                            .reverse()
                            .map((nft) => (
                                <div className={styles.nftBox} key={nft?.metadata.id.toString()}>
                                    <ThirdwebNftMedia
                                        metadata={nft?.metadata}
                                        className={styles.nftMedia}
                                    />
                                    <div>
                                        {<small>{nft?.owner == process.env.stakingContractAddress ? "Staked" : "Not Staked"}</small>}
                                        <h4>{nft?.metadata.name}</h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}
            </>
            <Partners />
            <hr className={`${styles.divider}`} />
            <Footer />
        </div>
    );
};

export default Explore;