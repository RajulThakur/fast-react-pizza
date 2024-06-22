import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import { createOrder } from "../../services/apiRestaurant";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const navigation = useNavigation();
  const {
    userName,
    status: addressStatus,
    position,
    address,
    error: errorAddress,
  } = useSelector((state) => state.user);
  const isLoadingAddress = addressStatus === "loading";
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  // const address=useSelector()
  const dispatch = useDispatch();
  const cartPrice = useSelector(getTotalCartPrice);

  const [withPriority, setWithPriority] = useState(false);
  const isSubmitting = navigation.state === "submitting";
  const priorityPrice = withPriority ? cartPrice * 0.2 : 0;
  const totalCartPrice = cartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;
  const labelStyles = "mb-5 flex gap-2 flex-col sm:flex-row sm:items-center";
  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      {/* <Form method="POST" action="/order/new"> */}
      <Form method="POST">
        <div className={labelStyles}>
          <label className="sm:basis-40">First Name</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="customer"
              defaultValue={userName}
              placeholder="Name"
              required
            />
          </div>
        </div>

        <div className={labelStyles}>
          <label className="sm:basis-40">Phone number</label>

          <div className="grow">
            <input
              className="input w-full"
              type="tel"
              name="phone"
              placeholder="Mobile"
              required
            />

            {formErrors?.phone && (
              <p className="bg-red-100 px-4 py-2 text-xs text-red-600">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className={`${labelStyles} relative`}>
          <label className="sm:basis-40">Address</label>

          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              required
              disabled={isLoadingAddress}
              placeholder="Address"
            />
            {!position.latitude && !position.longitude && (
              <span className="absolute right-[1px] z-50 ">
                <Button
                  type="round"
                  onClick={(e) => {
                    e.preventDefault();
                    dispatch(fetchAddress());
                  }}
                >
                  <svg
                    fill="rgb(255,255, 255)"
                    version="1.1"
                    id="Capa_1"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="18px"
                    height="18px"
                    viewBox="0 0 395.71 395.71"
                    xmlSpace="preserve"
                    stroke="rgb(255,255,255)"
                  >
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g
                      id="SVGRepo_tracerCarrier"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></g>
                    <g id="SVGRepo_iconCarrier">
                      <g>
                        <path d="M197.849,0C122.131,0,60.531,61.609,60.531,137.329c0,72.887,124.591,243.177,129.896,250.388l4.951,6.738 c0.579,0.792,1.501,1.255,2.471,1.255c0.985,0,1.901-0.463,2.486-1.255l4.948-6.738c5.308-7.211,129.896-177.501,129.896-250.388 C335.179,61.609,273.569,0,197.849,0z M197.849,88.138c27.13,0,49.191,22.062,49.191,49.191c0,27.115-22.062,49.191-49.191,49.191 c-27.114,0-49.191-22.076-49.191-49.191C148.658,110.2,170.734,88.138,197.849,88.138z"></path>{" "}
                      </g>
                    </g>
                  </svg>
                </Button>
              </span>
            )}

            {addressStatus === "error" && (
              <p className="mt-2 bg-red-100 px-4 rounded-md py-2 text-xs text-red-600">
                {errorAddress}
              </p>
            )}
          </div>
        </div>

        <div className="mb-8 flex items-center gap-3">
          <div></div>
          <input
            className="ransition-all h-6 w-6 accent-yellow-300 duration-300 focus:outline-none focus:ring focus:ring-yellow-300 focus:ring-offset-1 active:scale-105"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={position.longitude ? `${position.latitude},${position.longitude}`:''}/>
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing Order...."
              : `Order now ${formatCurrency(totalCartPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}
export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };
  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Please give us your correct phone Number.We might need it to contact you.";
  if (Object.keys(errors).length > 0) return errors;
  //if everything is ok
  // console.log(order);
  const newOrder = await createOrder(order);
  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
export default CreateOrder;
