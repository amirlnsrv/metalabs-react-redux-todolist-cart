import { useDispatch } from "react-redux";
import { addProduct } from "../../store/cartSlice";

import styles from "./Product.module.scss";

export const Product = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.product}>
      <img src={item.img} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.price} сом</p>
      <button onClick={() => dispatch(addProduct(item))}>
        Добавить в корзину
      </button>
    </div>
  );
};
