import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/action/index";
import Skeleton from "react-loading-skeleton";
import { NavLink } from "react-router-dom";

const Products = () => {
  const { products, loading, error } = useSelector((state) => state.products);
  console.log(error);
  const dispatch = useDispatch();
  const [filter, setFilter] = useState(products);
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchProducts());
    }, 10000);
    return () => clearInterval(interval);
  }, [dispatch]);

  useEffect(() => {
    setFilter(products);
  }, [products]);
  
  const Loading = () => (
    <>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
      <div className="col-md-3">
        <Skeleton height={350} />
      </div>
    </>
  );

  const filterProduct = (categoryName) => {
    const updatedList = products.filter(
      (product) => product.category === categoryName
    );
    setFilter(updatedList);
  };

  const ShowProducts = () => (
    <>
      <div className="buttons d-flex justify-content-center mb-5 pb-5">
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => setFilter(products)}
        >
          All
        </button>
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("men's clothing")}
        >
          Men
        </button>
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("women's clothing")}
        >
          Women
        </button>
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("jewelery")}
        >
          Jewelery
        </button>
        <button
          className="btn btn-outline-dark me-2"
          onClick={() => filterProduct("electronics")}
        >
          Electronics
        </button>
      </div>
      {filter.map((product) => (
        <div className="col-md-3 mb-4" key={product.id}>
          <div
            className="card h-100 text-center p-4"
            style={{ width: "16rem" }}
          >
            <img
              src={product.image}
              className="card-img-top"
              alt={product.title}
              height="250px"
            />
            <div className="card-body">
              <h5 className="card-title mb-0">
                {product.title.substring(0, 12)}
              </h5>
              <p className="card-text lead fw-bold">${product.price}</p>
              <NavLink
                to={`/product/${product.id}`}
                className="btn btn-outline-dark"
              >
                Buy Now
              </NavLink>
            </div>
          </div>
        </div>
      ))}
    </>
  );

  return (
    <div>
      <div className="container my-3">
        <div className="row">
          <div className="col-12 mb-5">
            <h1 className="display-6 fw-bolder text-center">Latest Products</h1>
            <hr />
          </div>
        </div>
        <div className="row justify-content-center">
          {loading ? <Loading /> : <ShowProducts />}
        </div>
        {error && (
          <p className="text-center text-danger">
            Failed to load products: {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default Products;
