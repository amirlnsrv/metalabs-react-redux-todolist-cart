import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";
import { CartItem } from "../CartItem/CartItem";
import { fetchProducts, clearProducts } from "../../store/cartSlice";
import { useEffect } from "react";

export const Cart = () => {
  const dispatch = useDispatch();
  const { cart, total } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <section className={styles.cart}>
      <h2>Корзина</h2>
      <div className={styles.cartInner}>
        {cart.length ? (
          cart.map((item) => <CartItem item={item} key={item.id} />)
        ) : (
          <p>Корзина пустая</p>
        )}
      </div>
      <p>Общая сумма корзины: {total}</p>
      {cart.length ? (
        <button onClick={() => dispatch(clearProducts())}>
          Очистить корзину
        </button>
      ) : (
        ""
      )}
    </section>
  );
};
