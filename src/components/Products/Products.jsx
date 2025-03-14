import { useSelector } from "react-redux";
import { Product } from "../Product";
import styles from "./Products.module.scss";

export const Products = () => {
  const items = useSelector((state) => state.cart.products);

  return (
    <section className={styles.products}>
      <h2>Магазин</h2>
      <div className={styles.productsInner}>
        {items.map((item) => (
          <div className={styles.product}>
            <Product item={item} key={item.id} />
          </div>
        ))}
      </div>
    </section>
  );
};
