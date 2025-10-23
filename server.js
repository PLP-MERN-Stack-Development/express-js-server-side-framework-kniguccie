// server.js - Starter Express server for Week 2 assignment

// Import required modules
const express = require('express');
const bodyParser = require('body-parser');
const { v4: uuidv4 } = require('uuid');


// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware setup
app.use(bodyParser.json());


// middleware/validateProduct
const validateProduct = (req, res, next) => {
  const { id, name, description, price, category, inStock } = req.body;

  // Validation rules
  const errors = [];
  if (!id || typeof id !== 'number' || !Number.isInteger(id)) {
    errors.push('id is required and must be integer');
  }

  if (!name || typeof name !== 'string' || name.trim().length < 3) {
    errors.push('Name is required and must be at least 3 characters long');
  }

  if (!price || typeof price !== 'number' || price <= 0) {
    errors.push('Price is required and must be a positive number');
  }

  if (!description || typeof description !== 'string' || description.trim().length < 10) {
    errors.push('Description is required and must be at least 10 characters long');
  }

  if (typeof inStock !== 'boolean') {
    errors.push('inStock is required and must be boolean');
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  next();
};


//sample in-memory products database
let products = [
  {
    id: 1,
    name: 'Laptop',
    description: 'A high-performance laptop with 16GB RAM ',
    price: 1200,
    category: 'Electronics',
    inStock: true
  },
  {
    id: 2,
    name: 'Smartphone',
    description: 'Latest model with 128GB storage',
    price: 800,
    category: 'Electronics',
    inStock: true
  },
  {
    id: 3,
    name: 'Coffee Maker',
    description: 'Programmable coffee maker with timer',
    price: 50,
    category: 'Kitchen',
    inStock: false
  }
];


// Root route
app.get('/', (req, res) => {
  res.send('Welcome to the Product API! Go to /api/products to see all products.');
});

// TODO: Implement the following routes:

// GET /api/products - Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});


// GET /api/products/:id - Get a specific product
app.get('/api/products/:id', (req, res) => {
    const product = products.find(u => u.id === req.params.id);
    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
});


// POST /api/products - Create a new product
app.post('/api/products', (req, res) => {
  const newProduct = {
    id: String(products.length + 1), // Simple ID generation
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    inStock: req.body.inStock
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});


// PUT /api/products/:id - Update a product
app.put('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === req.params.id); // Initialize first
  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }
  console.log(product); // Now safe to access
  res.json(product);
});


// DELETE /api/products/:id - Delete a product
app.delete('/api/products/:id', (req, res) => {
    const index = products.findIndex(u => u.id === req.params.id);
    if (index === -1) {
        return res.status(404).json({ message: 'Product not found' });
    }
    products.splice(index, 1);
    res.status(204).send(); // No content
});


// Example route implementation for GET /api/products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// TODO: Implement custom middleware for:
// - Request logging
const requestLogger = (req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.originalUrl}`);
  next();
};
app.use(requestLogger);

// - Authentication
const authMiddleware = (req, res, next) => {
  const apiKey = req.headers['x-api-key'];

  // In a real application, you'd verify against a database or env variable
  const VALID_API_KEY = process.env.API_KEY || 'your-secure-api-key';

  if (!apiKey || apiKey !== VALID_API_KEY) {
    return res.status(401).json({ error: 'Invalid or missing API key' });
  }

  next();
};
app.use(authMiddleware);

// - Error handling
const errorHandler = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
};
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Export the app for testing purposes
module.exports = app; 