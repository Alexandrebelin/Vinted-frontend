import { CookiesProvider } from "react-cookie";

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
