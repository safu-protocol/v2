import styles from "../styles/Footer.module.css";
import { SocialIcon } from "react-social-icons";

const socialMediaHandlesLinks = {
    gitHub: "https://github.com/safu-protocol",
    instagram: "https://www.instagram.com/safuyield",
    telegram: "https://t.me/safuprotocol",
    twitter: "https://twitter.com/safu_official",
    reddit: "https://www.reddit.com/r/SafuYield",
    medium: "https://safuyield.medium.com",
    email: "mailto:dev@safu.net"
}

const Footer = () => {
    return (
        <div className={styles.socialMenu}>
            <ul className={styles.socialHandleList}>
                <li className={styles.socialHandleItem}>
                    <SocialIcon url={socialMediaHandlesLinks.gitHub} bgColor="white" style={{ height: 35, width: 35 }} />
                </li>

                <li className={styles.socialHandleItem}>
                    <SocialIcon url={socialMediaHandlesLinks.telegram} style={{ height: 35, width: 35 }} />
                </li>

                <li className={styles.socialHandleItem}>
                    <SocialIcon url={socialMediaHandlesLinks.instagram} style={{ height: 35, width: 35 }} />
                </li>

                <li className={styles.socialHandleItem}>
                    <SocialIcon url={socialMediaHandlesLinks.reddit} style={{ height: 35, width: 35 }} />
                </li>

                <li className={styles.socialHandleItem}>
                    <SocialIcon url={socialMediaHandlesLinks.medium} bgColor="white" style={{ height: 35, width: 35 }} />
                </li>

                <li className={styles.socialHandleItem}>
                    <SocialIcon url={socialMediaHandlesLinks.twitter} style={{ height: 35, width: 35 }} />
                </li>

                <li className={styles.socialHandleItem}>
                    <SocialIcon url={socialMediaHandlesLinks.email} bgColor="white" style={{ height: 35, width: 35 }} />
                </li>
            </ul>
        </div>
    );
};

export default Footer;