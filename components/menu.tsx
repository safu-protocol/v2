import styles from "../styles/Menu.module.css";
import Link from 'next/link';
import { ConnectWeb3 } from "./connectWeb3";

const Menu = () => {
    return (
        <>
            <nav className={styles.menu}>
                <input type="checkbox" id="responsive-menu"></input>
                <Link href="/">
                    <img src={`/icons/safu.png`} className={styles.tokenHome} width="60" alt="drop" />
                </Link>
                <label></label>
                <ul>
                    <li>
                        <Link href="/">
                            <a>Home</a>
                        </Link>
                    </li>
                    <li>
                        {/*<a target="_blank" href="https://docs.safu.net" rel="noopener noreferrer">Docs</a> */}
                        <a target="_blank" href="https://hackmd.io/@FOMO-RESEARCH-LABS/SAFU-Protocol" rel="noopener noreferrer">WhitePaper</a>
                    </li>
                    <li>
                        <a target="_blank" className={styles.buyButton} href="https://pancakeswap.finance/swap?outputCurrency=0xc74cd0042c837ce59210857504ebb0859e06aa22" rel="noopener noreferrer">Buy</a>
                    </li>
                    <li>
                        <a className={styles.dropdownArrow} href="#">Explore</a>
                        <ul className={styles.subMenus}>
                            <li>
                                <Link href="/mint">
                                    <a>Mint NFT</a>
                                </Link>
                            </li>
                            <li>
                                <Link href="/stake">
                                    <a>Stake</a>
                                </Link>
                            </li>
                            <li>
                                <a target="_blank" href="https://dao.safu.net" rel="noopener noreferrer">Dao</a>
                            </li>
                            <li>
                                <Link href="/scan">
                                    <a>Scan</a>
                                </Link>
                            </li>
                            <li>
                                <a target="_blank" href="https://www.portalbridge.com/#/transfer" rel="noopener noreferrer">Bridge</a>
                            </li>
                        </ul>
                    </li>

                </ul>
            </nav>
            <ConnectWeb3 />
        </>

    );
};

export default Menu;