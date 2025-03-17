import { useDispatch } from "react-redux";
import styles from "./CartItem.module.scss";
import { fetchProducts, removeProduct } from "../../store/cartSlice";
import { useEffect } from "react";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className={styles.cart}>
      <img src={item.img} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.price} сом</p>
      <button onClick={() => dispatch(removeProduct(item.id))}>
        Убрать из корзины
      </button>
    </div>
  );
};
