import styles from "../styles/Wallet.module.css";
import {
  ConnectWallet
} from '@thirdweb-dev/react';
import { useEffect, useState } from "react";

export const ConnectWeb3 = () => {

  const [showChild, setShowChild] = useState(false);

  // Wait until after client-side hydration to show
  useEffect(() => {
    setShowChild(true);
  }, []);

  return (
    <div className={styles.menu}>
      {showChild && <ConnectWallet
        className={`${styles.mainButton} ${styles.spacerBottom}`}
        theme="light"
      />}
    </div>
  );

};
