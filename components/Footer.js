import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footerTop}>
      2021 © Made with&nbsp;<strong>React.js</strong>&nbsp; by&nbsp;
      <a
        href="https://github.com/Alexandrebelin"
        rel="noopener noreferrer"
        target="_blank"
        className={styles.footerTxt}
      >
        Alexandre Belin
      </a>
      .
    </footer>
  );
};

export default Footer;
