import Card from "./Card";
import styles from "../styles/Home.module.css";

const Main = ({ data }) => {
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
            <button>Commencer à vendre</button>
          </div>
        </div>
      </div>
      <div className={styles.honeCardsWrapper}>
        {data.offers.map((card, index) => {
          return <Card key={index} data={card} />;
        })}
      </div>
    </main>
  );
};

export default Main;
