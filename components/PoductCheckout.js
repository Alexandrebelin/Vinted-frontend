import styles from "../styles/Payment.module.css";

const ProductCheckout = ({ price, total }) => {
  return (
    <div className={styles.paymentCard}>
      <div className={styles.title}>Résumé de la commande</div>
      <div className={styles.content}>
        <ul>
          <li>
            Commande <span>{price} €</span>
          </li>
          <li>
            Frais protection acheteurs <span>0.40 €</span>
          </li>
          <li>
            Frais de port <span>0.80 €</span>
          </li>
        </ul>
      </div>
      <div className={styles.divider}></div>
      <div className={styles.content}>
        <ul>
          <li className={styles.bold}>
            Total <span>{total} €</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductCheckout;
