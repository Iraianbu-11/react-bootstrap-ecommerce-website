import { useSelector, useDispatch } from 'react-redux';
import { delCart, addCart} from "../redux/action/index";
import { NavLink } from 'react-router-dom';

const Cart = () => {
    let state = useSelector((state) => state.handleCart);
    const dispatch = useDispatch();
    const handleClose = (item) => {
        dispatch(delCart(item));
    }

    const addProduct = (product) => {
        dispatch(addCart(product));
    }



    const cartItems = (cartItem) => (
        <div className="px-4 my-5 bg-light rounded-3" key={cartItem.id}>
            <div className="container py-4">
                <button onClick={() => handleClose(cartItem)} className="btn-close float-end" aria-label="Close"></button>
                <div className="row justify-content-center">
                    <div className="col-md-4">
                        <img src={cartItem.image} alt={cartItem.title} height="200px" width="180px" />
                    </div>
                    <div className="col-md-4">
                        <h3>{cartItem.title}</h3>
                        <p className="lead fw-bold">
                            {cartItem.qty} X {cartItem.price} = ${cartItem.qty * cartItem.price}
                        </p>
                        <button className='btn btn-outline-dark me-4' onClick={() => addProduct(cartItem)}>
                            <i className='fa fa-plus'></i>
                        </button>
                        <button className='btn btn-outline-dark me-4' onClick={() => handleClose(cartItem)}>
                            <i className='fa fa-minus'></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );

    const emptyCart = () => (
        <div className="px-4 my-5 bg-light rounded-3 py-5">
            <div className="container py-4">
                <div className="row">
                    <h3 className='text-center'>Oops!!! Your Cart is Empty</h3>
                </div>
            </div>
        </div>
    );

    const button = () => (
        <div className="container">
            <div className="row">
                <NavLink to="/checkout" className="btn btn-outline-primary mb-5 w-25 mx-auto">
                    Proceed To Checkout
                </NavLink>
            </div>
        </div>
    );

    return (
        <>
            {state.length === 0 && emptyCart()}
            {state.length !== 0 && state.map(cartItems)}
            {state.length !== 0 && button()}
           
        </>
    );
};

export default Cart;
