import {
    ThirdwebNftMedia,
    useAddress,
    useMetamask,
    useNFTDrop,
    useToken,
    useTokenBalance,
    useOwnedNFTs,
    useContract,
} from "@thirdweb-dev/react";
import { BigNumber, ethers } from "ethers";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

const nftDropContractAddress = "0xb949F51f4DB16113e2175e385E86eCb0bd047a11";
const tokenContractAddress = "0x324Ae774232F28693f5Af66509a0b4965C2F18DC";
const stakingContractAddress = "0xaCb418Fdca48332e0215f6d94cDD867Fffd1D94d";

import Menu from "../components/menu";
import Footer from "../components/footer";

const Stake: NextPage = () => {
    // Wallet Connection Hooks
    const address = useAddress();
    const connectWithMetamask = useMetamask();

    // Contract Hooks
    const nftDropContract = useNFTDrop(nftDropContractAddress);
    const tokenContract = useToken(tokenContractAddress);

    const { contract, isLoading } = useContract(stakingContractAddress);

    // Load Unstaked NFTs
    const { data: ownedNfts } = useOwnedNFTs(nftDropContract, address);

    // Load Balance of Token
    const { data: tokenBalance } = useTokenBalance(tokenContract, address);

    ///////////////////////////////////////////////////////////////////////////
    // Custom contract functions
    ///////////////////////////////////////////////////////////////////////////
    const [stakedNfts, setStakedNfts] = useState<any[]>([]);
    const [claimableRewards, setClaimableRewards] = useState<BigNumber>();

    useEffect(() => {
        if (!contract) return;

        async function loadStakedNfts() {
            const stakedTokens = await contract?.call("getStakedTokens", address);

            // For each staked token, fetch it from the sdk
            const stakedNfts = await Promise.all(
                stakedTokens?.map(
                    async (stakedToken: { staker: string; tokenId: BigNumber }) => {
                        const nft = await nftDropContract?.get(stakedToken.tokenId);
                        return nft;
                    }
                )
            );

            setStakedNfts(stakedNfts);
            console.log("setStakedNfts", stakedNfts);
        }

        if (address) {
            loadStakedNfts();
        }
    }, [address, contract, nftDropContract]);

    useEffect(() => {
        if (!contract || !address) return;

        async function loadClaimableRewards() {
            const cr = await contract?.call("availableRewards", address);
            console.log("Loaded claimable rewards", cr);
            setClaimableRewards(cr);
        }

        loadClaimableRewards();
    }, [address, contract]);

    ///////////////////////////////////////////////////////////////////////////
    // Write Functions
    ///////////////////////////////////////////////////////////////////////////
    async function stakeNft(id: BigNumber) {
        if (!address) return;

        const isApproved = await nftDropContract?.isApproved(
            address,
            stakingContractAddress
        );
        // If not approved, request approval
        if (!isApproved) {
            await nftDropContract?.setApprovalForAll(stakingContractAddress, true);
        }
        const stake = await contract?.call("stake", id);
    }

    async function withdraw(id: BigNumber) {
        const withdraw = await contract?.call("withdraw", id);
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
                <button className={styles.mainButton} onClick={connectWithMetamask}>
                    Connect Wallet
                </button>
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
                            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                    className={styles.nftMedia}
                                />
                                <h3>{nft.metadata.name}</h3>
                                <button
                                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                                    onClick={() => withdraw(nft.metadata.id)}
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
                            <div className={styles.nftBox} key={nft.metadata.id.toString()}>
                                <ThirdwebNftMedia
                                    metadata={nft.metadata}
                                    className={styles.nftMedia}
                                />
                                <h3>{nft.metadata.name}</h3>
                                <button
                                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                                    onClick={() => stakeNft(nft.metadata.id)}
                                >
                                    Stake
                                </button>
                            </div>
                        ))}
                    </div>
                </>
            )} {<Footer />}
        </div>
    );
};

export default Stake;
