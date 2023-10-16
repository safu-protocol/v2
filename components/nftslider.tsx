import { useRef } from "react";
import styled from "styled-components";
import { Rerousel } from 'rerousel';
import Link from "next/link";
import {
    ThirdwebNftMedia,
    useContract,
    useNFTs,
} from "@thirdweb-dev/react";

import styles from "../styles/Home.module.css";

export const NFTBox = styled.div`
        width: 100%;
    `;

export const ImagePointer = styled.div`
    cursor: pointer;
    `;

export const Item = styled.div`
        display: flex;
        justify-content: center;
        align-items: center;
        width: calc(100%/4);
        height: auto;
        font-family: Signika;
        font-weight: bold;
        font-size: 1.5em;

        &:hover img {
            opacity: 1;
            -webkit-animation: flash 1.5s;
            animation: flash 1.5s;
            cursor: pointer;
        }
        @-webkit-keyframes flash {
            0% {
                opacity: .4;
            }
            100% {
                opacity: 1;
            }
        }
        @keyframes flash {
            0% {
                opacity: .4;
            }
            100% {
                opacity: 1;
            }
        }

        img {
            width: 100%;
            height: auto;
            max-width: 100%;
        }
        
        @media(max-width: 1150px) {
            width: calc(100%/3);
        }

        @media(max-width: 800px) {
            width: calc(100%/2);
        }
    `;

export const NFTslider = () => {

    const ref = useRef(null);

    const nftDropContractAddress = process.env.nftDropContractAddress;
    const nftContract = useContract(nftDropContractAddress, "nft-drop");

    // Load some NFTs on the landing page
    const { data: nfts, isLoading: loading } = useNFTs(nftContract?.contract, { start: 0, count: 100 });

    return (
        <NFTBox>
            <h3>Latest NFTs</h3>
            {nfts && nfts?.length > 0 && (
                <Rerousel itemRef={ref}>
                    {nfts
                        .filter(
                            (nft) =>
                                nft.owner !== "0x0000000000000000000000000000000000000000"
                        )
                        .reverse()
                        .map((nft) => (
                            <Item ref={ref} key={nft?.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft?.metadata}
                                    className={styles.nftMedia}
                                />
                            </Item>
                        ))}
                </Rerousel>
            )}

            <div>
                <br />
                <Link href="/explore" passHref={true}>
                    Explore Full Collection
                </Link>
            </div>
        </NFTBox>
    );
};