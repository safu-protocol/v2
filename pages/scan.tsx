import type { NextPage } from "next";
import { useState } from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import Footer from "../components/footer";

export interface resultObject {
    token_name?: string,
    token_address?: string,
    token_decimals?: number,
    total_supply?: number,
    burned_tokens?: number,
    circulating_supply?: number,
    number_of_holders?: number,
    proxy_contract?: boolean,
    honeypot?: boolean,
    buy_gas_fee?: number,
    sell_gas_fee?: number,
    buy_tax?: number,
    sell_tax?: number,
    token_pause_function?: boolean,
    token_mint_function_enabled?: boolean,
    ownership_renounced?: boolean,
    token_deployer_address?: string,
    conclusion?: string
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
                    <hr className={`${styles.divider} ${styles.spacerTop}`} />
                    <img src={`/icons/safuscan.png`} width="60" alt="drop" />
                    <hr className={`${styles.divider} ${styles.spacerTop}`} />
                    <h2 className={styles.selectBoxTitle}>Paste a Token contract address</h2>

                    <form onSubmit={handleSubmit}>
                        <input
                            name="tokenAddress"
                            type="text"
                            size={(200)}
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
                        Solidity token code analysis tool and rug detector for BSC projects
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

                            <h2 className={styles.selectBoxTitle}>Token SAFUSCAN Results</h2>
                            <hr className={`${styles.divider} ${styles.spacerTop}`} />

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Token Name: </div>
                                <div className={styles.valuebox}>{scanResults.token_name}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Token Decimals:</div>
                                <div className={styles.valuebox}>{scanResults.token_decimals}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Total Supply:</div>
                                <div className={styles.valuebox}>{scanResults.total_supply}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Burned Tokens:</div>
                                <div className={styles.valuebox}>{scanResults.burned_tokens}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Circulating Supply:</div>
                                <div className={styles.valuebox}>{scanResults.circulating_supply}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Number of Holders:</div>
                                <div className={styles.valuebox}>{scanResults.number_of_holders}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Proxy Contract:</div>
                                <div className={styles.valuebox}>{scanResults.proxy_contract?.toString()}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Honeypot:</div>
                                <div className={styles.valuebox}>{scanResults.honeypot?.toString()}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Buy Gas Fee:</div>
                                <div className={styles.valuebox}>{scanResults.buy_gas_fee}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Sell Gas Fee:</div>
                                <div className={styles.valuebox}>{scanResults.sell_gas_fee}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Buy Tax:</div>
                                <div className={styles.valuebox}>{scanResults.buy_tax} %</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Sell Tax:</div>
                                <div className={styles.valuebox}>{scanResults.sell_tax} %</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Token Pause Function:</div>
                                <div className={styles.valuebox}>{scanResults.token_pause_function?.toString()}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Token Mint Function:</div>
                                <div className={styles.valuebox}>{scanResults.token_mint_function_enabled?.toString()}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Ownership Renounced:</div>
                                <div className={styles.valuebox}>{scanResults.ownership_renounced?.toString()}</div>
                            </div>

                            <div className={styles.shelf}>
                                <div className={styles.labelbox}>Conclusion:</div>
                                <div className={styles.valuebox}>{scanResults.conclusion}</div>
                            </div>

                            <hr className={`${styles.divider} ${styles.spacerTop}`} />

                            Access the scan results through our API:

                            <Link href={`https://fomo.tech/api/info?address=${scanResults.token_address}`} passHref={true}>
                                <button
                                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                                >
                                    API
                                </button>
                            </Link>

                            Or use our telegram bot:
                            <Link href={`https://t.me/safuscan_bot`} passHref={true}>
                                <button
                                    className={`${styles.mainButton} ${styles.spacerBottom}`}
                                >
                                    SAFUSCAN BOT
                                </button>
                            </Link>

                        </div>
                    )
                }

            </div>

            <Footer />
        </div>
    );
};

export default Scan;
