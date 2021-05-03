import { useState } from "react";
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import styles from "../styles/Header.module.css";

const ProductSearch = () => {
  const [search, setSearch] = useState("");
  const router = useRouter();

  const handleSearch = (event) => {
    event.preventDefault();
    router.push({ pathname: `/search`, query: { title: search } });
    setSearch("");
  };

  return (
    <div className={styles.searchContainer}>
      <form onSubmit={handleSearch}>
        <input
          type="search"
          placeholder="Search for items"
          className={styles.searchInput}
          value={search}
          onChange={(event) => {
            setSearch(event.target.value);
          }}
        />
        <FontAwesomeIcon icon="search" className={styles.searchInputIcon} />
      </form>
    </div>
  );
};

export default ProductSearch;
