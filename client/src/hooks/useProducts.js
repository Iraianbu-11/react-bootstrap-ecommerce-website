import { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:3000/products'; 

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all products
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(API_URL);
      setProducts(response.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Add a new product
  const addProduct = async (product) => {
    try {
      console.log(product);
      const {title , price , category , image} = product;
      const updatedPrice = parseInt(price);
      const resultProduct = {
          title : title,
          price : updatedPrice , 
          category : category , 
          image : image,
      }
      console.log(resultProduct);
      const response = await axios.post(API_URL, resultProduct);
      setProducts((prev) => [...prev, response.data]);
    } catch (err) {
      console.log(err);
      setError(err.message);
    }
  };
  
  // Update a product by ID
  const updateProduct = async (id, updatedProduct) => {
    try {
      console.log(updatedProduct);
      const {title , price , category , image} = updatedProduct;
      const updatedPrice = parseInt(price);
      const resultProduct = {
          title : title,
          price : updatedPrice , 
          category : category , 
          image : image,
      }
      console.log(resultProduct);
      const response = await axios.put(`${API_URL}/${id}`, resultProduct);
      setProducts((prev) =>
        prev.map((product) => (product._id === id ? response.data : product))
      );
    } catch (err) {
      setError(err.message);
    }
  };

  // Delete a product by ID
  const deleteProduct = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchProducts();
  },[]);

  return { products, loading, error, addProduct, updateProduct, deleteProduct };
};

export default useProducts;
  




