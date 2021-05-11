import { useRouter } from "next/router";
import axios from "axios";
import Card from "../components/Card";

import styles from "../styles/Home.module.css";

const Search = ({ data }) => {
  const router = useRouter();
  const { title } = router.query;

  return (
    <div className={styles.homeCardsWrapper}>
      {data.offers.map((data, index) => {
        return <Card key={index} data={data} />;
      })}
    </div>
  );
};

export default Search;

export const getServerSideProps = async (context) => {
  try {
    const title = context.query.title;

    const response = await axios.get(
      `http://localhost:3100/offers?title=${title}`
    );

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return { error: error };
  }
};
