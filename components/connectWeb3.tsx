import styles from "../styles/Wallet.module.css";
import {
  ConnectWallet
} from '@thirdweb-dev/react';

export const ConnectWeb3 = () => {
  return (
    <div className={styles.menu}>
      <ConnectWallet
        // Some customization of the button style
        colorMode="dark"
        accentColor="#2CAAAA"
      />
    </div>
  );

};
