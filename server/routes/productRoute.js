import express from 'express';
const router = express.Router();

import { createProduct, getAllProducts, updateProduct, deleteProduct ,fetch , getProductById } from '../controller/productController.js';

// Route to create a new product
router.post('/products', createProduct);

// Route to get all products
router.get('/products', getAllProducts);

// Route to get a product by ID
router.get('/products/:id', getProductById);

// Route to update a product by ID
router.put('/products/:id', updateProduct);

// Route to delete a product by ID
router.delete('/products/:id', deleteProduct);

router.get('/',fetch);

export default router;
