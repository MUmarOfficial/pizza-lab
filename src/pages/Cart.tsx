import { Link } from "react-router-dom";
import BackBtn from "../components/BackBtn";
import { useAppSelector } from "../store/hooks";
import { selectCartItems, selectPizzasPrice } from "../store/cartSlice";
import MenuItem from "../components/MenuItem";
import styles from "./Cart.module.css";

const Cart = () => {
  const cartItems = useAppSelector(selectCartItems);
  const totalPrice = useAppSelector(selectPizzasPrice);

  return (
    <div className={styles.container}>
      <BackBtn to={"/menu"}>Back to menu</BackBtn>
      <h2 className="pageTitle">Cart</h2>

      {cartItems.length ? (
        <>
          <ul className={styles.list}>
            {cartItems.map((item) => {
              return (
                <li key={item.id}>
                  <MenuItem item={item} />
                </li>
              );
            })}
          </ul>

          <div className={styles.summary}>
            <span className={styles.totalLabel}>Total price</span>
            <span className={styles.totalPrice}>€{totalPrice}</span>
          </div>

          <Link to={"/checkout"} className="myBtn w-full md:w-auto">
            Proceed to Checkout
          </Link>
        </>
      ) : (
        <h3 className={styles.emptyMsg}>No items in the cart</h3>
      )}
    </div>
  );
};

export default Cart;