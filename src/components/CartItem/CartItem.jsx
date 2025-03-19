import { useDispatch } from "react-redux";
import styles from "./CartItem.module.scss";
import { fetchCart, removeFromCart } from "../../store/cartSlice";
import { useEffect } from "react";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <div className={styles.cart}>
      <img src={item.img} alt={item.title} />
      <h2>{item.title}</h2>
      <p>Стомость товара: {item.price} сом</p>
      {item.quantity && <p>Кол-во: {item.quantity}</p>}
      <button onClick={() => dispatch(removeFromCart(item.id))}>
        Убрать из корзины
      </button>
    </div>
  );
};
