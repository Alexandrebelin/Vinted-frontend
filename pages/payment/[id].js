import { useRouter } from "next/router";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import ProductCheckout from "../../components/PoductCheckout";
import CheckoutForm from "../../components/CheckoutForm";

import styles from "../../styles/Payment.module.css";

const Payment = ({ data }) => {
  const router = useRouter();
  const { id } = router.query;

  const stripePromise = loadStripe(
    "pk_test_51ILSxNDavfq8HosR7YRix7vfdMtcauX2TU8CVao14w8bvK1yj1xA2eNgQtMgzsjVMYRt3Id5I5pXtQKFvXegalv600T32lGziV"
  );

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
            <Elements stripe={stripePromise}>
              <CheckoutForm productName={data.name} total={total} />
            </Elements>
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
