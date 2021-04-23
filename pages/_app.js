import Header from "../components/Header";
import "../styles/globals.css";

import { CookiesProvider } from "react-cookie";
import Footer from "../components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Header></Header>
      <Component {...pageProps} />
      <Footer />
    </CookiesProvider>
  );
}

export default MyApp;
