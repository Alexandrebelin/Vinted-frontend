import Link from "next/link";
import { useCookies } from "react-cookie";

import Card from "./Card";

import styles from "../styles/Home.module.css";

const Main = ({ data }) => {
  const [cookie, setCookies, removeCookie] = useCookies(["user"]);
  const token = cookie.user;
  return (
    <main>
      <div className={styles.homeImgBackGround}>
        <img
          src={require("../assets/images/tear.svg")}
          alt="forme"
          className={styles.homeHeroForme}
        />
        <div>
          <div className={styles.homeHeroReady}>
            Prêts à faire du tri dans vos placards ?
            {token ? (
              <Link href="/publish">
                <button>Commencer à vendre</button>
              </Link>
            ) : (
              <Link href="/login">
                <button>Commencer à vendre</button>
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className={styles.homeCardsWrapper}>
        {data.offers.map((card, index) => {
          return <Card key={index} data={card} />;
        })}
      </div>
    </main>
  );
};

export default Main;
