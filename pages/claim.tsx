import { useAddress, useContract, useContractRead, ConnectWallet } from "@thirdweb-dev/react";
import { useEffect, useState } from "react";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import Footer from "../components/footer";

const Claim: NextPage = () => {

    // Get the currently connected wallet's address
    const address = useAddress();

    // Init router
    const router = useRouter();

    const [state, setState] = useState({
        safulockAddress: "",
        success: "",
        owner: "",
        isLoading: false
    });

    if (router.query.lock) {
        state.safulockAddress = String(router.query.lock);
    }

    async function handleChange(e: any) {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    // Initialise the SAFULOCK claim contract
    const abi: any = [{ "inputs": [{ "internalType": "address", "name": "_creator", "type": "address" }, { "internalType": "address", "name": "_owner", "type": "address" }, { "internalType": "uint256", "name": "_unlockDate", "type": "uint256" }], "stateMutability": "nonpayable", "type": "constructor" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "from", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Received", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "Withdrew", "type": "event" }, { "anonymous": false, "inputs": [{ "indexed": false, "internalType": "address", "name": "tokenContract", "type": "address" }, { "indexed": false, "internalType": "address", "name": "to", "type": "address" }, { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }], "name": "WithdrewTokens", "type": "event" }, { "inputs": [], "name": "createdAt", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "creator", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "owner", "outputs": [{ "internalType": "address", "name": "", "type": "address" }], "stateMutability": "view", "type": "function" }, { "inputs": [], "name": "unlockDate", "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }, { "stateMutability": "payable", "type": "receive" }, { "inputs": [], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [{ "internalType": "address", "name": "_tokenContract", "type": "address" }], "name": "withdrawTokens", "outputs": [], "stateMutability": "nonpayable", "type": "function" }, { "inputs": [], "name": "info", "outputs": [{ "internalType": "address", "name": "", "type": "address" }, { "internalType": "address", "name": "", "type": "address" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }, { "internalType": "uint256", "name": "", "type": "uint256" }], "stateMutability": "view", "type": "function" }];
    const TokenClaimContractAddress: string = state.safulockAddress;
    const TokenClaimContract = useContract(TokenClaimContractAddress, abi);

    // Read Owner
    const { data: owner } = useContractRead(
        TokenClaimContract.contract,
        "owner"
    );

    async function handleSubmit(e: any) {
        e.preventDefault();
        const data = await TokenClaimContract.contract.call("withdrawTokens", ["0xc74cD0042c837Ce59210857504eBb0859E06aA22"])
        alert('LOCK claimed, wait for TX to confirm');
    }

    useEffect(() => {
        if (router.query.lock) {
            if (owner == address) {
                setState({
                    ...state,
                    ["success"]: "You are the Owner of this SAFULOCK!"
                });

            }
            else {
                setState({ ...state, ["success"]: "You are NOT the Owner of this SAFULOCK!" });
            }
        }

    }, [address, owner, router.query.lock]);

    return (
        <div className={styles.container}>
            <Menu />
            <h1 className={styles.h1}>SAFULOCK v1 claims</h1>

            <p className={styles.explain}>
                Enter your SAFULOCK contract address to open the LOCK. <br /> (Must be logged in with the Owner wallet)
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
                    {state.success} <br />
                    <form onSubmit={handleSubmit}>
                        {!router.query.lock && <input
                            name="safulockAddress"
                            type="text"
                            size={(200)}
                            placeholder="Paste Your SAFULOCK Address"
                            className={styles.textInput}
                            onChange={handleChange}
                            required
                        />}

                        <br />

                        {!router.query.lock && <Link href={`/claim?lock=` + state.safulockAddress}>
                            Verify SAFULOCK
                        </Link>}



                        {router.query.lock && state.success == "You are the Owner of this SAFULOCK!" && <button
                            className={`${styles.mainButton} ${styles.spacerBottom}`}
                        >
                            Claim SAFUYIELD
                        </button>}
                    </form>
                </>
            )
            } {<Footer />}
        </div >
    );

};

export default Claim;