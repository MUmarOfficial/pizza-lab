import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAppSelector } from "../store/hooks";
import { selectPizzaCount, selectPizzasPrice } from "../store/cartSlice";

const Header = () => {
  const [isFocused, setIsFocused] = useState(false);
  const pizzasCount = useAppSelector(selectPizzaCount);
  const pizzasPrice = useAppSelector(selectPizzasPrice);
  const [orderId, setOrderId] = useState("");
  const navigate = useNavigate();

  return (
    <div className="navbar sticky top-4 z-40 max-w-5xl mx-auto px-6 py-3 rounded-full 
                    backdrop-blur-xl bg-black/40 border border-white/10 
                    shadow-lg shadow-black/20 flex items-center justify-between gap-4">
      <Link
        to={"/"}
        className="text-2xl font-bold tracking-tight bg-gradient-to-br from-white to-white/60 bg-clip-text text-transparent hover:to-white transition-all"
      >
        Pizza Lab
      </Link>
      <div className="flex items-center gap-4">
        <form
          className="relative group"
          onSubmit={(ev) => {
            ev.preventDefault();
            navigate(`/order/${orderId}`);
            setOrderId("");
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 transition-colors duration-300 ${isFocused ? "text-cyan-400" : "text-zinc-500 group-hover:text-zinc-400"
              }`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            name="orderId"
            required
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={(ev) => setOrderId(ev.target.value)}
            type="text"
            value={orderId}
            placeholder="Search order..."
            className={`
              bg-zinc-800/50 border border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-neutral-200 outline-none 
              transition-all duration-300 ease-out placeholder:text-zinc-600
              ${isFocused ? "w-64 border-cyan-500/50 bg-zinc-900 shadow-[0_0_15px_rgba(34,211,238,0.2)]" : "w-40 hover:bg-zinc-800 hover:border-white/10"}
            `}
          />
        </form>
        <Link
          to="/cart"
          className="group relative flex items-center gap-3 px-4 py-2 rounded-full 
                     bg-zinc-900/40 border border-white/10 transition-all duration-300
                     hover:bg-zinc-800 hover:border-purple-500/50 hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
        >
          {pizzasPrice > 0 && (
            <span className="font-semibold text-sm text-zinc-300 group-hover:text-white transition-colors">
              €{pizzasPrice}
            </span>
          )}

          <div className="relative">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-zinc-400 group-hover:text-purple-400 transition-colors"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
            </svg>
            {pizzasCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-purple-500 text-[10px] font-bold text-white shadow-sm">
                {pizzasCount}
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Header;