import styles from "../styles/Menu.module.css";

const Menu = () => {
    return (
        <nav className={styles.menu}>
            <input type="checkbox" id="responsive-menu"></input><label></label>
            <ul>
                <li><a href="http://">Home</a></li>
                <li><a className={styles.dropdownArrow} href="http://">Explore</a>
                    <ul className={styles.subMenus}>
                        <li><a href="http://">Stake</a></li>
                        <li><a href="http://">Dao</a></li>
                        <li><a href="http://">Scan</a></li>
                        <li><a href="http://">Bridge</a></li>
                    </ul>
                </li>
                <li><a href="http://">Docs</a></li>
                <li><a href="http://">Socials</a></li>
            </ul>
        </nav>

    );
};

export default Menu;