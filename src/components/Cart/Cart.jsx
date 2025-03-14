import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import { CartItem } from "../CartItem/CartItem";
import { clearCart } from "../../store/cartSlice";

export const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const total = useSelector((state) => state.cart.total);

  return (
    <section className={styles.cart}>
      <h2>Корзина</h2>
      <div className={styles.cartInner}>
        {cart.length ? (
          cart.map((item, idx) => <CartItem item={item} key={idx} />)
        ) : (
          <p>Корзина пустая</p>
        )}
      </div>
      <p>Общая сумма корзины: {total}</p>
      {cart.length ? (
        <button onClick={() => dispatch(clearCart())}>Очистить корзину</button>
      ) : (
        ""
      )}
    </section>
  );
};
