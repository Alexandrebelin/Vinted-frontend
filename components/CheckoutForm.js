import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

import styles from "../styles/Payment.module.css";

const CheckoutForm = ({ productName, total }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [cookie, setCookie] = useCookies(["user"]);
  const token = cookie.user;

  const handleSubmit = async (e) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: token,
      });

      const response = await axios.post(
        "https://vinted-backend-belin.herokuapp.com/payment",
        {
          amount: total,
          title: productName,
          token: stripeResponse.token.id,
        }
      );
      if (response.data) {
        setIsPaid(true);
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return isPaid ? (
    <p className={styles.paymentValidate}>Merci pour votre achat.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay now
      </button>
    </form>
  );
};

export default CheckoutForm;
