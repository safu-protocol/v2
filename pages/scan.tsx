import type { NextPage } from "next";
import { useState } from "react";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import Footer from "../components/footer";

export interface resultObject {
    token_name?: string,
    token_decimals?: number,
    honeypot?: boolean;
    conclusion?: string;
}

const Scan: NextPage = () => {

    const [state, setState] = useState({
        tokenAddress: "",
        isLoading: false
    });

    const [scanResults, setScanResults] = useState<resultObject>({});

    async function handleChange(e: any) {
        setState({ ...state, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e: any) {
        e.preventDefault();
        setState({ ...state, isLoading: true });

        fetch('/api/scanAPI?tokenAddress=' + state.tokenAddress)
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                setScanResults(data);
                setState({ ...state, isLoading: false });
            })
    }

    return (
        <div className={styles.container}>
            <Menu />

            {/* Top Section */}
            <h1 className={styles.h1}>Scan a Token</h1>

            <div
                className={styles.nftBoxGrid}
                role="button"
            >
                <div className={styles.optionSelectBox}>
                    <img src={`/icons/drop.webp`} alt="drop" />
                    <h2 className={styles.selectBoxTitle}>Paste a Token contract address</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            name="tokenAddress"
                            type="text"
                            placeholder="Paste Token contract"
                            className={styles.textInput}
                            onChange={handleChange}
                            required
                        />
                        <button
                            className={`${styles.mainButton} ${styles.spacerBottom}`}
                        >
                            Scan Now
                        </button>
                    </form>
                    <p className={styles.selectBoxDescription}>
                        Solidity token code analysis tool and rug detector for BSC projects.
                    </p>
                    <p>
                        {state.isLoading ? (
                            <p>Scanning Token... <br />
                                <strong>{state.tokenAddress}</strong>
                            </p>
                        ) : ""}
                    </p>

                </div>

                {scanResults.token_name && !state.isLoading &&
                    (
                        <div className={styles.optionSelectBox}>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Token Name: </div>
                                <div className={styles.valuebox}>{scanResults.token_name}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Token Decimals:</div>
                                <div className={styles.valuebox}>{scanResults.token_decimals}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Honeypot Detected:</div>
                                <div className={styles.valuebox}>{scanResults.honeypot?.toString()}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Conclusion:</div>
                                <div className={styles.valuebox}>{scanResults.conclusion}</div>
                            </div>

                        </div>
                    )
                }

            </div>

            <Footer />
        </div>
    );
};

export default Scan;
