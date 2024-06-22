// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import OrderItem from "../order/OrderItem"
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
} from "../../utils/helpers";
import { useEffect } from "react";

function Order() {
  const order=useLoaderData();
  // const fetcher=useFetcher();
  // useEffect(function(){
  //   if(!fetcher.data && fetcher.state==='idle')
  //   fetcher.load('/menu');
  // },[fetcher])
  // Everyone can search for all orders, so for privacy reasons we're gonna gonna exclude names or address, these are only for the restaurant staff
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const deliveryIn = calcMinutesLeft(estimatedDelivery);

  return (
    <div className="space-y-8 px-4 py-6 gap-4">
      <div className="flex flex-wrap items-center justify-between">
        <h2 className="text-xl font-semibold">Order #{id} Status</h2>

        <div className="space-x-2 gap-2">
          {priority && <span className="bg-red-500 rounded-full py-1 px-3 uppercase ">Priority</span>}
          <span className="bg-green-500 rounded-full py-1 px-3 uppercase">{status} order</span>
        </div>
      </div>

      <div className="flex fles-wrap items-center justify-between gap-2 bg-stone-200 px-6 py-5">
        <p>
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p >
        <p className="text-xs text-stone-500">(Estimated delivery: {formatDate(estimatedDelivery)})</p>
      </div>
<ul className="dive-stone-200 divide-y border-b border-t">
  {cart.map(item=><OrderItem item={item} key={item.pizzaId}/>)}
</ul>
      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-xs font-medium text-stone-500">Price pizza: {formatCurrency(orderPrice)}</p>
        {priority && <p className="text-xs font-medium text-stone-500">Price priority: {formatCurrency(priorityPrice)}</p>}
        <p className="font-bold">To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}</p>
      </div>
    </div>
  );
}
export async function loader({params}){
  const order=await getOrder(params.orderId)
  return order;
}
export default Order;
