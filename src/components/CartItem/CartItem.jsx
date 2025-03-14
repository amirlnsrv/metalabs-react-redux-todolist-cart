import { useDispatch } from "react-redux";
import styles from "./CartItem.module.scss";
import { removeFromCart } from "../../store/cartSlice";

export const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.cart}>
      <img src={item.img} alt={item.title} />
      <h2>{item.title}</h2>
      <p>{item.price} сом</p>
      <button onClick={() => dispatch(removeFromCart(item.id))}>
        Убрать из корзины
      </button>
    </div>
  );
};
