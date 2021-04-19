import styles from "../styles/Header.module.css";
import Link from "next/link";

import { useCookies } from "react-cookie";

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
          />
        </Link>
      </div>
      <div className={styles.searchContainer}>
        <input
          type="text"
          placeholder="Rechercher des articles"
          className={styles.searchInput}
        />
      </div>

      {token ? (
        <button onClick={handlDelete} className={styles.buttonLogout}>
          Se déconnecter
        </button>
      ) : (
        <div>
          <Link href="/signup">
            <button
              className={`${styles.headerButton} ${styles.buttonLoginSignup} ${styles.buttonSignup}`}
            >
              S'inscrire
            </button>
          </Link>
          <Link href="/login">
            <button
              className={`${styles.headerButton} ${styles.buttonLoginSignup}`}
            >
              Se connecter
            </button>
          </Link>
        </div>
      )}
      {token ? (
        <Link href="/publish">
          <button className={`${styles.headerButton} ${styles.buttonSold}`}>
            Vendre tes articles
          </button>
        </Link>
      ) : (
        <Link href="/login">
          <button className={`${styles.headerButton} ${styles.buttonSold}`}>
            Vendre tes articles
          </button>
        </Link>
      )}
    </header>
  );
};

export default Header;
