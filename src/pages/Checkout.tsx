/* ... imports remain the same ... */
import "react-credit-cards-2/dist/es/styles-compiled.css";
import BackBtn from "../components/BackBtn";
import CreditCard from "../components/CreditCard";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { resetCart, selectCartItems, selectPizzasPrice } from "../store/cartSlice";
import { formatPrice } from "../utils/price-utils";
import { createOrderId } from "../utils/order-utils";
import { createOrder } from "../store/ordersSlice";
import { useNavigate } from "react-router";

const Checkout = () => {
  const cartItems = useAppSelector(selectCartItems);
  const cartTotal = useAppSelector(selectPizzasPrice);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  return (
    <div className="my-6 max-w-5xl mx-auto px-4">
      <BackBtn to={"/cart"}>Back to cart</BackBtn>
      <h2 className="pageTitle">Checkout</h2>

      {cartItems.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-4">

          {/* Order Summary Section */}
          <div className="card bg-zinc-900/40 border border-white/5 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <h2 className="card-title justify-center mb-4 text-xl md:text-2xl">
                Order Summary
              </h2>
              <div className="overflow-x-auto">
                <table className="table table-sm md:table-md">
                  <thead>
                    <tr className="text-zinc-400">
                      <th>Name</th>
                      <th>Qty</th>
                      <th className="text-right">Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item.id} className="border-b border-white/5">
                        <td className="font-medium">{item.title}</td>
                        <td>{item.quantity}</td>
                        <td className="text-right">€{formatPrice(item.quantity * item.price)}</td>
                      </tr>
                    ))}
                    <tr className="text-base md:text-lg font-bold text-primary">
                      <td colSpan={2}>Subtotal</td>
                      <td className="text-right">€{cartTotal}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Payment Section */}
          <div className="card bg-zinc-900/40 border border-white/5 shadow-xl">
            <div className="card-body p-4 sm:p-6">
              <h2 className="card-title justify-center mb-4 text-xl md:text-2xl">
                Payment Details
              </h2>
              <CreditCard
                submitHandler={(state) => {
                  const orderId = createOrderId();
                  dispatch(
                    createOrder({
                      id: orderId,
                      items: cartItems,
                      total: cartTotal,
                      creditCardNum: state.number,
                      state: "pending",
                    }),
                  );
                  dispatch(resetCart());
                  navigate(`/order/${orderId}`);
                }}
              />
            </div>
          </div>
        </div>
      ) : (
        <h3 className="text-xl text-center text-zinc-500 mt-12">No items in the cart</h3>
      )}
    </div>
  );
};

export default Checkout;