import React, { useState} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Pencil, Trash2 } from "lucide-react";
import useProducts from "../hooks/useProducts";

const Admin = () => {
  const { products, loading, error, addProduct, updateProduct, deleteProduct } =
    useProducts();
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    image: "",
  });
  const [editingId, setEditingId] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateProduct(editingId, formData);
      setEditingId(null);
    } else {
      addProduct(formData);
    }
    setFormData({ title: "", price: "", category: "", image: "" });
  };

  const handleEdit = (item) => {
    setFormData({
      title: item.title,
      price: parseInt(item.price),
      category: item.category,
      image: item.image,
    });
    setEditingId(item._id);
  };

  const handleDelete = (id) => {
    deleteProduct(id);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container mt-5">
      <h1 className="mb-4 text-center">Fashio Admin Panel</h1>

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="number"
            className="form-control"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Price"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            placeholder="Category"
            required
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            name="image"
            value={formData.image}
            onChange={handleInputChange}
            placeholder="Image URL"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          {editingId ? "Update" : "Add"} Product
        </button>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Category</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item) => (
            <tr key={item._id}>
              <td>{item.title}</td>
              <td>{item.price}</td>
              <td>{item.category}</td>
              <td>
                <img
                  src={item.image}
                  alt={item.title}
                  style={{ width: "50px", height: "50px" }}
                />
              </td>
              <td>
                <button
                  className="btn btn-sm btn-outline-primary me-2"
                  onClick={() => handleEdit(item)}
                >
                  <Pencil size={16} />
                </button>
                <button
                  className="btn btn-sm btn-outline-danger"
                  onClick={() => handleDelete(item._id)}
                >
                  <Trash2 size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
