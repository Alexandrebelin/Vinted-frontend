import { useRouter } from "next/router";
import Link from "next/link";
import { useState } from "react";

import { useCookies } from "react-cookie";
import axios from "axios";

import styles from "../styles/Signup.module.css";

const Signup = () => {
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["user"]);

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [file, setFile] = useState({});
  const [errorMessage, setErrorMessage] = useState(null);

  const handleSignUp = async (event) => {
    event.preventDefault();
    try {
      const formData = new FormData();
      formData.append("avatar", file);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("username", username);

      const response = await axios.post(
        "http://localhost:3100/user/signup",
        formData
      );
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
        setUsername("");
      } else {
        alert("Une erreur est survenue, veuillez réssayer.");
      }
    } catch (error) {
      console.log(err);
    }
  };

  return (
    <div className={styles.signupContainer}>
      <h2>S'inscrire</h2>
      <form className={styles.signupForm} onSubmit={handleSignUp}>
        <input
          type="text"
          placeholder="Nom d'utilisateur"
          value={username}
          onChange={(event) => {
            setUsername(event.target.value);
          }}
        />
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
        <input
          type="file"
          id="file"
          onChange={(event) => {
            setFile(event.target.files[0]);
          }}
        />
        <div className={styles.checkboxContainer}>
          <div>
            <input type="checkbox" />
            <span>S'inscrire à notre newsletter</span>
          </div>
          <p>
            En m'inscrivant je confirme avoir lu et accepté les Termes &
            Conditions et Politique de Confidentialité de Vinted. Je confirme
            avoir au moins 18 ans.
          </p>
        </div>
        <button type="submit">S'inscrire</button>
      </form>
      <Link href="/login">
        <p className={styles.linkToLogin}>
          Tu as déjà un compte ? Connecte-toi !
        </p>
      </Link>
    </div>
  );
};

export default Signup;
