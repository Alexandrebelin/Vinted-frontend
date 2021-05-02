import { useRouter } from "next/router";
import axios from "axios";
import Card from "../components/Card";

const Search = ({ data }) => {
  const router = useRouter();
  const { title } = router.query;
  console.log(data);
  return (
    <div>
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
    console.log(title);

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
