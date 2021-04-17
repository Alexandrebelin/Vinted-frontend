import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import { useCookies } from "react-cookie";
import axios from "axios";

import styles from "../styles/Signup.module.css";

const Login = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["user"]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignIn = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:3100/user/login", {
        email: email,
        password: password,
      });
      const token = response.data.token;
      if (token) {
        setCookie("user", token, {
          path: "/",
          maxAge: 3600, // Expires after 1hr
          sameSite: true,
        });

        router.push("/");
        setEmail("");
        setPassword("");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>Se connecter</h2>
      <form className={styles.signupForm} onSubmit={handleSignIn}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
            setErrorMessage("");
          }}
        />
        <span className={styles.signupLoginError}>{errorMessage}</span>
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />

        <button type="submit">Se connecter</button>
      </form>
      <Link href="/signup">
        <p className={styles.linkToLogin}>
          Pas encore de compte ? Inscris-toi !
        </p>
      </Link>
    </div>
  );
};

export default Login;
