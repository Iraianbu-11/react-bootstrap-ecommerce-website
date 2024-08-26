import { useSelector } from "react-redux";
import { useMemo } from "react";

const Success = () => {
  const state = useSelector((state) => state.handleCart);
  const totalAmount = useMemo(() => {
    return state.reduce((acc, item) => acc + item.price * item.qty, 0);
  }, [state]);

  const cartItems = (cartItem) => (
    <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
      <div className="container py-4">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <h3>{cartItem.title}</h3>
            <p className="lead fw-bold">
              {cartItem.qty} x ${cartItem.price} = ${cartItem.qty * cartItem.price}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const displayTotal = () => (
    <div className="px-4 my-5 bg-light rounded-3 py-5">
      <div className="container py-4">
        <div className="row">
          <h3 className="text-center">Total Amount: ${totalAmount}</h3>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {state.length !== 0 && state.map(cartItems)}
      {state.length !== 0 && displayTotal()}
    </>
  );
};

export default Success;
