import { useRouter } from "next/router";

const Search = () => {
  const router = useRouter();
  const { text } = router.query;
  console.log(text);

  return <div>hello</div>;
};

export default Search;
