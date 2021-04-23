import Footer from "../components/Footer";
import Main from "../components/Main";

import axios from "axios";

const Home = ({ data, error }) => {
  return (
    <div>
      <Main data={data}></Main>
    </div>
  );
};

export default Home;

export const getServerSideProps = async (context) => {
  try {
    const response = await axios.get("http://localhost:3100/offers");

    return {
      props: {
        data: response.data,
      },
    };
  } catch (error) {
    return { error: error };
  }
};
