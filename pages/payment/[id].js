import { useRouter } from "next/router";
import axios from "axios";
import styles from "../../styles/Payment.module.css";
import ProductCheckout from "../../components/PoductCheckout";

const Payment = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;
  console.log(id);

  const number = data.price + 0.4 + 0.8;

  const roudDecimal = (nb, precision) => {
    const pr = precision || 2;
    const tmp = Math.pow(10, precision);
    return Math.round(nb * tmp) / tmp;
  };

  const total = roudDecimal(number, 2);

  return (
    <div className={styles.paymentWrapper}>
      <div className={styles.paymentContainer}>
        <ProductCheckout price={data.price} total={total} />
        <div className={styles.paymentCard}>
          <div className={styles.content}>
            Il ne vous reste plus qu'un étape pour vous offrir
            <span className={styles.bold}> {data.name}</span>. Vous allez payer
            <span className={styles.bold}> {total} €</span> (frais de protection
            et frais de port inclus).
            <div className={styles.divider}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;

export const getServerSideProps = async (context) => {
  try {
    const id = context.query.id;

    const response = await axios.get(`http://localhost:3100/offer/${id}`);

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return { error: error };
  }
};
