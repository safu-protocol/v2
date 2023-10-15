import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    ConnectWallet,
    useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import Footer from "../components/footer";

const Explore: NextPage = () => {
    const address = useAddress();

    // Define the NFT contract address
    const nftDropContractAddress: string = process.env.nftDropContractAddress!;
    const nftDropContract = useContract(nftDropContractAddress, "nft-drop");

    const { data: nfts, isLoading: loading } = useNFTs(nftDropContract?.contract, { start: 0, count: 100 });

    const truncateAddress = (address: string) => {
        return (
            address.substring(0, 6) + "..." + address.substring(address.length - 4)
        );
    };

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

            {!address ? (
                <>
                    <div>
                        <ConnectWallet
                            className={`${styles.mainButton} ${styles.spacerBottom}`}
                            theme="light"
                        />
                    </div>
                </>
            ) : (
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
                                        <h3>ID: {nft?.metadata.id} - {nft?.metadata.name}</h3>
                                        { /*<div>{nft?.owner == address ? "Owned by You" : nft?.owner}</div> */ }
                                    </div>
                                ))}
                        </div>
                    )}
                </>
            )} {<Footer />}
        </div>
    );
};

export default Explore;