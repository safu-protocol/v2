import styles from "../styles/Wallet.module.css";
import {
  useMetamask,
  useWalletConnect,
  useCoinbaseWallet,
  useNetwork,
  useAddress,
  useDisconnect,
} from '@thirdweb-dev/react';

export const ConnectWallet = () => {
  const connectWithCoinbaseWallet = useCoinbaseWallet();
  const connectWithMetamask = useMetamask();
  const connectWithWalletConnect = useWalletConnect();
  const disconnectWallet = useDisconnect();
  const address = useAddress();
  const network = useNetwork();

  const trimChars = (stringToTrim: string) => {
    return stringToTrim.slice(0, 5) + "..." + stringToTrim.slice(38);
  }

  // If a wallet is connected, show address, chainId and disconnect button
  if (address) {
    return (
      <div className={styles.menu}>
        <ul>
          <li><a className={styles.dropdownArrow} href="#">{trimChars(address)}</a>
            <ul className={styles.subMenus}>
              <li>
                Network: {network[0].data.chain && network[0].data.chain.name}
              </li>
              <li>
                <button onClick={disconnectWallet}>Disconnect</button>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    );
  }

  // If no wallet is connected, show connect wallet options
  return (
    <div className={styles.menu}>
      <ul>
        <li><a className={styles.dropdownArrow} href="#">Connect Wallet</a>
          <ul className={styles.subMenus}>
            <li>
              <button onClick={() => connectWithCoinbaseWallet()}>
                Coinbase Wallet
              </button>
            </li>
            <li>
              <button onClick={() => connectWithMetamask()}>MetaMask</button>
            </li>
            <li>
              <button onClick={() => connectWithWalletConnect()}>
                WalletConnect
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};
