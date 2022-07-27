import type { NextPage } from "next";
import React from "react";
import styles from "../styles/Home.module.css";

import Menu from "../components/menu";
import Footer from "../components/footer";

export interface resultObject {
    name?: string;
    tokenAddress?: string;
}

const Scan: NextPage = () => {

    const [state, setState] = React.useState({
        tokenAddress: "",
        isLoading: false
    });

    const [scanResults, setScanResults] = React.useState<resultObject>({});

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
                        {state.isLoading ? 'Scanning Token...' + state.tokenAddress : ""}
                    </p>

                    {scanResults.name &&
                        (<div>
                            <p><strong>Token Name: </strong>{scanResults.name}</p>
                            <p><strong>Token Address: </strong>{scanResults.tokenAddress}</p>
                        </div>)
                    }
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Scan;
