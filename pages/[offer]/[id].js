import { useRouter } from "next/router";
import axios from "axios";
import Link from "next/link";
import { useCookies } from "react-cookie";

import styles from "../../styles/Offer.module.css";

const Offer = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  const [cookie, setCookies, removeCookie] = useCookies(["user"]);
  const token = cookie.user;

  return (
    <div className={styles.offerBody}>
      <section className={styles.offerContainer}>
        <div>
          {data.image.length === 0 ? (
            <img
              src={data.image.secure_url}
              alt={data.name}
              className={styles.offerPicture}
            />
          ) : (
            <img
              src={data.image.secure_url}
              alt={data.name}
              className={styles.offerPicture}
            />
          )}
        </div>
        <section className={styles.offerInfos}>
          <div>
            <span className={styles.offerPrice}>{data.price} €</span>
            <ul className={styles.offerList}>
              {data.details.map((elem, index) => {
                const keys = Object.keys(elem);
                return (
                  <li key={index}>
                    <span className={styles.listTitleColor}>{keys[0]}</span>
                    <span className={styles.listColor}>{elem[keys[0]]}</span>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className={styles.divider} />
          <div className={styles.offerContent}>
            <p className={styles.name}>{data.name}</p>
            <p className={styles.description}>{data.description}</p>
            <div className={styles.offerAvatarUsername}>
              {data.owner && data.owner.account.avatar && (
                <img
                  alt={data.name}
                  src={data.owner.account.avatar.secure_url}
                />
              )}
              <span>{data.owner && data.owner.account.username}</span>
            </div>
          </div>
          {token ? (
            <Link href={`/payment/${id}`}>
              <button className={styles.buttonBuy}>Acheter</button>
            </Link>
          ) : (
            <Link href="/login">
              <button className={styles.buttonBuy}>Acheter</button>
            </Link>
          )}
        </section>
      </section>
    </div>
  );
};

export default Offer;

export const getServerSideProps = async (context) => {
  try {
    const id = context.query.id;

    const response = await axios.get(
      `https://vinted-backend-belin.herokuapp.com/offer/${id}`
    );

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return { error: error };
  }
};
