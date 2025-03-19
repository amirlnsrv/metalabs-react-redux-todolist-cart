import { useDispatch, useSelector } from "react-redux";
import { Product } from "../Product";
import styles from "./Products.module.scss";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../store/productsSlice";

export const Products = () => {
  const dispatch = useDispatch();

  const { data, items, pages } = useSelector(
    (state) => state.products.responseForProducts
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [limit] = useState(3);

  function renderPagination() {
    const btns = [];
    for (let i = 1; i <= pages; i++) {
      btns.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={`${styles.paginationBtn} ${
            i === currentPage ? styles.active : ""
          }`}
        >
          {i}
        </button>
      );
    }
    return btns;
  }

  useEffect(() => {
    dispatch(
      fetchProducts({
        page: currentPage,
        limit,
      })
    );
  }, [currentPage, limit]);

  return (
    <section className={styles.products}>
      <h2>Магазин</h2>
      <div className={styles.productsInner}>
        {data?.map((item) => (
          <div className={styles.product}>
            <Product item={item} key={item.id} />
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        {currentPage > 1 && (
          <button onClick={() => setCurrentPage((prev) => prev - 1)}>
            {"<="}
          </button>
        )}
        {renderPagination()}
        {currentPage < pages && (
          <button onClick={() => setCurrentPage((prev) => prev + 1)}>
            {"=>"}
          </button>
        )}
        <p className={styles.countInfo}>
          Показано: {limit} из {items} товаров
        </p>
      </div>
    </section>
  );
};
