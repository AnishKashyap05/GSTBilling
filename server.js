const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const Sale = require('./models/Sale');
const Category = require('./models/Category');
const Product = require('./models/Product')
const router = express.Router();
require('./db');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.json());
app.use(cors());

app.post('/api/sales', async (req, res) => {
  
  const { products, totalPrice } = req.body;

  try {
    const sale = new Sale({
      products,
      totalPrice
    });
    await sale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all sales
app.get('/api/sales', async (req, res) => {
  try {
    const sales = await Sale.find().populate('products');
    res.json(sales);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Generate final bill for a sale
app.get('/api/sales/:id/bill', async (req, res) => {
    try {
      const sale = await Sale.findById(req.params.id).populate('products');
      if (!sale) {
        return res.status(404).json({ message: 'Sale not found' });
      }
  
      let totalBillAmount = 0;
  
      // Calculate total price including taxes
      sale.products.forEach((product) => {
        totalBillAmount += product.price;
      });
  
      res.json({ sale, totalBillAmount });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

  app.get('/day/:date', async (req, res) => {
    const date = req.params.date;
    const startOfDay = moment(date).startOf('day').toDate();
    const endOfDay = moment(date).endOf('day').toDate();
  
    try {
      const sales = await Sale.find({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      }).populate('products');
      res.status(200).json(sales);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  // Get revenue for a specific period (day, month, year)
  app.get('/revenue/:period', async (req, res) => {
    const period = req.params.period;
    let startDate, endDate;
  
    switch (period) {
      case 'day':
        startDate = moment().startOf('day').toDate();
        endDate = moment().endOf('day').toDate();
        break;
      case 'month':
        startDate = moment().startOf('month').toDate();
        endDate = moment().endOf('month').toDate();
        break;
      case 'year':
        startDate = moment().startOf('year').toDate();
        endDate = moment().endOf('year').toDate();
        break;
      default:
        return res.status(400).json({ message: 'Invalid period' });
    }
  
    try {
      const sales = await Sale.find({
        createdAt: { $gte: startDate, $lte: endDate }
      });
      const totalRevenue = sales.reduce((total, sale) => total + sale.totalPrice, 0);
      res.status(200).json({ totalRevenue });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  
  app.get('/api/sales/daily-revenue', async (req, res) => {
    try {
      // Assuming req.query.date contains the date for which revenue is requested
      const date = new Date(req.query.date);
      const startOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate());
      const endOfDay = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
  
      const sales = await Sale.find({
        date: { $gte: startOfDay, $lt: endOfDay }
      });
  
      const totalRevenue = sales.reduce((total, sale) => total + sale.totalPrice, 0);
  
      res.json({ totalRevenue });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  



  app.post('/api/categories', async (req, res) => {
    try {
      const category = await Category.create(req.body);
      res.status(201).json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Get all categories
  app.get('/api/categories', async (req, res) => {
    try {
      const categories = await Category.find();
      res.json(categories);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update category
  app.put('/api/categories/:id', async (req, res) => {
    try {
      const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(category);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete category
  app.delete('api/categories/:id', async (req, res) => {
    try {
      await Category.findByIdAndDelete(req.params.id);
      res.json({ message: 'Category deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });




  app.post('/api/products', async (req, res) => {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Get all products
  app.get('/api/products', async (req, res) => {
    try {
      const products = await Product.find().populate('category');
      res.json(products);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  // Update product
  app.put('/api/products/:id', async (req, res) => {
    try {
      const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(product);
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  });
  
  // Delete product
  app.delete('/api/products/:id', async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'Product deleted' });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
