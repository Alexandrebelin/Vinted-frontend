import styles from "../styles/Header.module.css";
import Link from "next/link";

import { useCookies } from "react-cookie";

const Header = () => {
  const [cookie, setCookies, removeCookie] = useCookies(["user"]);

  console.log(cookie.user);
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
      <div className={styles.searchConayiner}>
        <input
          type="text"
          placeholder="Rechercher des articles"
          className={styles.searchInput}
        />
      </div>

      {token ? (
        <button onClick={handlDelete}>Se déconnecter</button>
      ) : (
        <div>
          <Link href="/signup">
            <button>S'inscrire</button>
          </Link>
          <Link href="/login">
            <button>Se connecter</button>
          </Link>
        </div>
      )}
      <button>Vendre tes articles</button>
    </header>
  );
};

export default Header;
