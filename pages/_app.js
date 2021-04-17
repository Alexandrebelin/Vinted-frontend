import Header from "../components/Header";
import "../styles/globals.css";

import { CookiesProvider } from "react-cookie";

function MyApp({ Component, pageProps }) {
  return (
    <CookiesProvider>
      <Header></Header>
      <Component {...pageProps} />
    </CookiesProvider>
  );
}

export default MyApp;
