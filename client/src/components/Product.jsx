import { useState, useEffect } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useDispatch } from 'react-redux';
import { useParams, NavLink } from 'react-router-dom';
import { addCart } from "../redux/action/index";
import {ToastContainer , toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
const Product = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState({});
  const dispatch = useDispatch();
  useEffect(() => {
    const getProduct = async () => {
      setLoading(true);
      const response = await fetch(`http://localhost:4000/products/${id}`);
      const productData = await response.json();
      setProduct(productData);
      setLoading(false);
    };
    getProduct();
  }, [id]);

  const addProduct = (product) => {
    dispatch(addCart(product));
    toast.success("Item added to cart" , {
      position: "top-center",
    });
  };

  const Loading = () => {
    return (
      <>
        <div className="col-md-6">
          <Skeleton height={400} />
        </div>
        <div className="col-md-6" style={{ lineHeight: 2 }}>
          <Skeleton height={50} width={300} />
          <Skeleton height={75} />
          <Skeleton height={25} width={150} />
          <Skeleton height={50} />
          <Skeleton height={150} />
          <Skeleton height={50} width={100} />
          <Skeleton height={50} width={100} style={{ marginLeft: 6 }} />
        </div>
      </>
    );
  };

  const ShowProduct = () => {
    return (
      <>
        <div className="col-md-6 mt-5" key={product.id}>
          <img src={product.image} alt={product.title} height="400px" width="400px" />
        </div>

        <div className="col-md-6">
          <h4 className="text-uppercase text-black-50">{product.category}</h4>
          <h1 className='display-5'>{product.title}</h1>
          <h3 className='display-6 fw-bold my-4'>
            $ {product.price}
          </h3>
          <p className='lead'>{product.description}</p>
          <button className='btn btn-outline-dark' onClick={() => addProduct(product)}>Add to Cart</button>
          <NavLink to="/cart" className='btn btn-dark ms-2 px-3 py-2'>Go to Cart</NavLink>
        </div>
      </>
    );
  };

  return (
    <div>
      <div className="container py-5">
        <div className="row py-4">
          {loading ? <Loading /> : <ShowProduct />}
        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default Product;
