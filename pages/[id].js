import { useRouter } from "next/router";
import axios from "axios";
import styles from "../styles/Offer.module.css";

const Offer = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  return (
    <div className={styles.offerBody}>
      <div className={styles.offerContainer}>
        <div>
          {data.product_pictures.length === 0 ? (
            <img
              src={data.product_image.secure_url}
              alt={data.product_name}
              className={styles.offerPicture}
            />
          ) : (
            <img
              src={data.product_pictures[0].secure_url}
              alt={data.product_name}
              className={styles.offerPicture}
            />
          )}
        </div>
        <div className={styles.offerInfos}>
          <div>
            <span className={styles.offerPrice}>{data.product_price} €</span>
            <ul className={styles.offerList}>
              {data.product_details.map((elem, index) => {
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
            <p className={styles.name}>{data.product_name}</p>
            <p className={styles.description}>{data.product_description}</p>
            <div className={styles.offerAvatarUsername}>
              {data.owner && data.owner.account.avatar && (
                <img
                  alt={data.product_name}
                  src={data.owner.account.avatar.secure_url}
                />
              )}
              <span>{data.owner && data.owner.account.username}</span>
            </div>
          </div>
          <button className={styles.buttonBuy}>Acheter</button>
        </div>
      </div>
    </div>
  );
};

export default Offer;

export const getServerSideProps = async (context) => {
  try {
    const id = context.query.id;

    const response = await axios.get(
      `https://lereacteur-vinted-api.herokuapp.com/offer/${id}`
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
