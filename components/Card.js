import Link from "next/link";
import { useRouter } from "next/router";

import styles from "../styles/Home.module.css";

const Card = ({ data }) => {
  const router = useRouter();
  return (
    <div
      className={styles.cardContainer}
      onClick={() => router.push(`/${data._id}`)}
    >
      <div className={styles.cardAvatartUsername}>
        {data.owner && data.owner.account.avatar && (
          <img
            src={data.owner.account.avatar.secure_url}
            alt={data.product_name}
          />
        )}
        <span>{data.owner && data.owner.account.username}</span>
      </div>
      <div>
        <img src={data.product_image.secure_url} alt={data.title} />
        <div className={styles.cardPriceSizeBrand}>
          <span>{data.product_price} €</span>
          <span>{data.product_details[1]["TAILLE"]}</span>
          <span>{data.product_details[0]["MARQUE"]}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
