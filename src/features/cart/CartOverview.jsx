import { Link } from "react-router-dom";
import { getTotalCartItems, getTotalCartPrice } from "./cartSlice";
import { useSelector } from "react-redux";
import { formatCurrency } from "../../utils/helpers";

function CartOverview() {
  const totalPrice = useSelector(getTotalCartPrice);
  const totalItem = useSelector(getTotalCartItems);
  if (!totalItem) return null;
  return (
    <div className="flex items-center justify-between bg-slate-700 px-4 py-4 uppercase text-slate-200 sm:px-6">
      <p className="space-x-4 font-semibold text-stone-300">
        <span>{totalItem} pizzas</span>
        <span>{formatCurrency(totalPrice)}</span>
      </p>
      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
