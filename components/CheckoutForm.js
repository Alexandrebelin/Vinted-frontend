import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";

const CheckoutForm = ({ productName, total }) => {
  const [isPaid, setIsPaid] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const [cookie, setCookie] = useCookies(["user"]);
  console.log(cookie.user);
  const token = toString(cookie.user);

  const handleSubmit = async (e) => {
    try {
      event.preventDefault();
      const cardElement = elements.getElement(CardElement);
      const stripeResponse = await stripe.createToken(cardElement, {
        name: token,
      });

      const response = await axios.post("http://localhost:3100/payment", {
        amount: total,
        title: productName,
        token: stripeResponse.token.id,
      });
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
    <p>Merci pour votre achat.</p>
  ) : (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
};

export default CheckoutForm;
