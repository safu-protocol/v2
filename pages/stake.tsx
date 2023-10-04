import {
    ThirdwebNftMedia,
    useAddress,
    useToken,
    useTokenBalance,
    useOwnedNFTs,
    useContract,
    ConnectWallet
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const nftDropContractAddress: string = process.env.nftDropContractAddress!;
const tokenContractAddress: string = process.env.tokenContractAddress!;
const stakingContractAddress: string = process.env.stakingContractAddress!;

import Menu from "../components/menu";
import Footer from "../components/footer";

const Stake: NextPage = () => {
    // Wallet Connection Hooks
    const address = useAddress();

    // Contract Hooks
    const nftDropContract = useContract(nftDropContractAddress, "nft-drop");
    const tokenContract = useToken(tokenContractAddress);

    const { contract, isLoading } = useContract(stakingContractAddress);

    // Load Unstaked NFTs
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract?.contract, address);

    // Load Balance of Token
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);

    ///////////////////////////////////////////////////////////////////////////
    // Custom contract functions
    ///////////////////////////////////////////////////////////////////////////
    const [stakedNfts, setStakedNfts] = useState<any[]>([]);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();
    const [showChild, setShowChild] = useState(false);

    useEffect(() => {
        if (!contract) return;

        async function loadStakedNfts() {
            const stakedTokens = await contract?.call("userStakeInfo", [address]);

            // For each staked token, fetch it from the sdk
            const stakedNfts = await Promise.all(
                stakedTokens[0]?.map(
                    async (stakedToken: BigNumber) => {
                        const nft = await nftDropContract?.contract?.get(stakedToken);
                        return nft;
                    }
                )
            );

            if (nftDropContract.contract) {
                setStakedNfts(stakedNfts);
            }
            console.log("setStakedNfts", stakedNfts);
        }

        if (address) {
            loadStakedNfts();
        }

        setShowChild(true);
    }, [address, contract, nftDropContract.contract]);

    useEffect(() => {
        if (!contract || !address) return;

        async function loadClaimableRewards() {
            const cr = await contract?.call("calculateRewards", [address]);
            console.log("Loaded claimable rewards", cr);
            setClaimableRewards(cr);
        }

        loadClaimableRewards();
    }, [address, contract]);

    ///////////////////////////////////////////////////////////////////////////
    // Write Functions
    ///////////////////////////////////////////////////////////////////////////
    async function stakeNft(id: string) {
        if (!address) return;

        const isApproved = await nftDropContract?.contract?.isApproved(
            address,
            stakingContractAddress
        );
        // If not approved, request approval
        if (!isApproved) {
            await nftDropContract?.contract?.setApprovalForAll(stakingContractAddress, true);
        }
        const stake = await contract?.call("stake", [[id]]);
    }

    async function withdraw(id: string) {
        const withdraw = await contract?.call("withdraw", [[id]]);
    }

    async function claimRewards() {
        const claim = await contract?.call("claimRewards");
    }

    if (isLoading) {
        return <div>Loading</div>;
    }

    return (
        <div className={styles.container}>
            <Menu />
            <h1 className={styles.h1}>Stake Your NFTs</h1>

            <hr className={`${styles.divider} ${styles.spacerTop}`} />

            {!address ? (
                <>
                    {showChild &&
                        <div className={styles.mainButton}>
                            <ConnectWallet
                                // Some customization of the button style
                                theme="dark"
                            />
                        </div>
                    }
                </>
            ) : (
                <>
                    <h2>Your Tokens</h2>

                    <div className={styles.tokenGrid}>
                        <div className={styles.tokenItem}>
                            <h3 className={styles.tokenLabel}>Claimable Rewards</h3>
                            <p className={styles.tokenValue}>
                                <b>
                                    {!claimableRewards
                                        ? "Loading..."
                                        : ethers.utils.formatUnits(claimableRewards, 18)}
                                </b>{" "}
                                {tokenBalance?.symbol}
                            </p>
                        </div>
                        <div className={styles.tokenItem}>
                            <h3 className={styles.tokenLabel}>Current Balance</h3>
                            <p className={styles.tokenValue}>
                                <b>{tokenBalance?.displayValue}</b> {tokenBalance?.symbol}
                            </p>
                        </div>
                    </div>

                    <button
                        className={`${styles.mainButton} ${styles.spacerTop}`}
                        onClick={() => claimRewards()}
                    >
                        Claim Rewards
                    </button>

                    <hr className={`${styles.divider} ${styles.spacerTop}`} />

                    <h2>Your Staked NFTs</h2>
                    <div className={styles.nftBoxGrid}>
                        {stakedNfts?.map((nft) => (
                            <div className={styles.nftBox} key={nft?.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft?.metadata}
                                    className={styles.nftMedia}
                                />
                                <h3>{nft?.metadata.name}</h3>
                                <button
                                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                                    onClick={() => withdraw(nft?.metadata.id)}
                                >
                                    Withdraw
                                </button>
                            </div>
                        ))}
                    </div>

                    <hr className={`${styles.divider} ${styles.spacerTop}`} />

                    <h2>Your Unstaked NFTs</h2>

                    <div className={styles.nftBoxGrid}>
                        {ownedNfts?.map((nft) => (
                            <div className={styles.nftBox} key={nft?.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft?.metadata}
                                    className={styles.nftMedia}
                                />
                                <h3>{nft?.metadata.name}</h3>
                                <button
                                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                                    onClick={() => stakeNft(nft?.metadata.id)}
                                >
                                    Stake
                                </button>
                            </div>
                        ))}
                    </div>

                    <hr className={`${styles.divider} ${styles.spacerTop}`} />
                </>
            )} {<Footer />}
        </div>
    );
};

export default Stake;
