import Link from "next/link";
import { useCookies } from "react-cookie";

import styles from "../styles/Header.module.css";
import ProductSearch from "./ProductSearch";

const Header = () => {
  const [cookie, setCookies, removeCookie] = useCookies(["user"]);
  const token = cookie.user;

  const handlDelete = (e) => {
    removeCookie("user");
  };
  return (
    <header className={styles.headerContainer}>
      <div>
        <Link href="/">
          <img
            src={require("../assets/images/logo.png")}
            alt="logo vinted"
            className={styles.headerLogo}
            data-testid="logo"
          />
        </Link>
      </div>
      <ProductSearch />

      {token ? (
        <button onClick={handlDelete} className={styles.buttonLogout}>
          Se déconnecter
        </button>
      ) : (
        <div>
          <Link href="/signup">
            <button className={styles.headerButton}>S'inscrire</button>
          </Link>
          <Link href="/login">
            <button className={styles.headerButton}>Se connecter</button>
          </Link>
        </div>
      )}
      {token ? (
        <Link href="/publish">
          <button className={`${styles.headerButton} ${styles.buttonSold}`}>
            Vends tes articles
          </button>
        </Link>
      ) : (
        <Link href="/login">
          <button className={`${styles.headerButton} ${styles.buttonSold}`}>
            Vends tes articles
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
