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
        // Some customization of the button style
        colorMode="dark"
        accentColor="#2CAAAA"
      />}
    </div>
  );

};
