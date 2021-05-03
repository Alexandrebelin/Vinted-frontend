import { CookiesProvider } from "react-cookie";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faSearch, faCheck } from "@fortawesome/free-solid-svg-icons";
library.add(faSearch, faCheck);

import Header from "../components/Header";
import Footer from "../components/Footer";

import "../styles/globals.css";
import styles from "../styles/Footer.module.css";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <div className={styles.mainContainer}>
        <Header></Header>
        <Component {...pageProps} />
        <Footer />
      </div>
    </CookiesProvider>
  );
}

export default MyApp;
