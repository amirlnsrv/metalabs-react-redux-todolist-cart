import { useDispatch } from "react-redux";
import { addToCart } from "../../store/cartSlice";

import styles from "./Product.module.scss";

export const Product = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.product}>
      <img src={item.img} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.price} сом</p>
      <button onClick={() => dispatch(addToCart(item.id))}>
        Добавить в корзину
      </button>
    </div>
  );
};
