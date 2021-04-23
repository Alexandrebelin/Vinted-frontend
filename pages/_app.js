import Header from "../components/Header";
import "../styles/globals.css";
import styles from "../styles/Footer.module.css";

import { CookiesProvider } from "react-cookie";
import Footer from "../components/Footer";

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
