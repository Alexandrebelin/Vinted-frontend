import { useState } from "react";
import { useRouter } from "next/router";

import styles from "../styles/Header.module.css";

const ProductSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    router.push({ pathname: `/search`, query: { text: search } });
    setSearch("");
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Rechercher des articles"
          className={styles.searchInput}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
      </form>
    </div>
  );
};

export default ProductSearch;
