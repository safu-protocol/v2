import {
    ThirdwebNftMedia,
    useAddress,
    useContract,
    useNFTs,
} from "@thirdweb-dev/react";
import type { NextPage } from "next";
import { useRouter } from 'next/router'
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import { Partners } from "../components/partners";
import Footer from "../components/footer";

const Explore: NextPage = () => {
    const address = useAddress();

    // Define the NFT contract address
    const nftDropContractAddress: string = process.env.nftDropContractAddress!;
    const nftDropContract = useContract(nftDropContractAddress, "nft-drop");

    // Initial call to get the NFT collection
    const router = useRouter()
    const [start, setStart] = useState<number>(0);
    let count = 3;

    let { data: nfts, isLoading: loading } = useNFTs(nftDropContract?.contract, { start: start, count: count });

    useEffect(() => {
        if (router.query.page) {
            console.log('pagination');
            if (Number(router.query.page) != 0) {
                setStart(Number(router.query.page) * count);
            }
            else {
                setStart(0);
            }
        }
    }, [router.query, start]);

    if (loading) {
        return <div className={styles.container}>Loading...</div>;
    }

    return (
        <div className={styles.container}>
            <Menu />
            <h1 className={styles.h1}>Full NFT Collection</h1>

            <p className={styles.explain}>
                SAFU Guardians are a unique collection of <strong>1269 programatically generated NFTs</strong> available for SAFUYIELD holders. <br />
                SAFU Guardian NFTs are provably-rare piece of art, granting access to various SAFU Protocol utilities..
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
                                        {<small>{nft?.owner == address ? "Owned by You" : ""}</small>}
                                        <h4>{nft?.metadata.name}</h4>
                                    </div>
                                </div>
                            ))}
                    </div>
                )}

                <div className={styles.pagination}>
                    {start > 0 && (
                        <>
                            <Link href={`/explore?page=` + Number((start / count) - 1)}>
                                <img src={`/icons/back.png`} width="60" alt="back page" />
                            </Link>
                        </>
                    )}

                    {nfts && nfts?.length >= count && (
                        <>
                            <Link href={`/explore?page=` + Number((start / count) + 1)}>
                                <img className="hoverImg" src={`/icons/next.png`} width="60" alt="next page" />
                            </Link>
                        </>
                    )}
                </div>
            </>
            <Partners />
            <hr className={`${styles.divider}`} />
            <Footer />
        </div>
    );
};

export default Explore;