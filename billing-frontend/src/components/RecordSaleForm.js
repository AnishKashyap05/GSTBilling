import React, { useState, useEffect } from 'react';
import { Form, Select, Button, Table } from 'antd';
import axios from 'axios';

const { Option } = Select;

const RecordSaleForm = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('/api/products');
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleProductSelect = (productId) => {
    const product = products.find(p => p._id === productId);
    if (product) {
      const category = categories.find(c => c._id === product.category);
      const gstRate = category ? category.gstRate : 0;
      const gstAmount = (product.price * gstRate) / 100;
      const totalProductPrice = product.price + gstAmount;
      setSelectedProducts([...selectedProducts, { ...product, gstRate, gstAmount, totalProductPrice }]);
      setTotalPrice(prevTotal => prevTotal + totalProductPrice);
    }
  };

  const handleSubmit = async () => {
    const saleData = selectedProducts.map(product => product._id);
    console.log(saleData)

    try {
      await axios.post('/api/sales', { products: saleData, totalPrice });
      // Optionally, you can display a success message or reset the form here
      setSelectedProducts([]);
      setTotalPrice(0);
    } catch (error) {
      console.error('Error recording sale:', error);
    }
  };

  const columns = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'GST Rate (%)',
      dataIndex: 'gstRate',
      key: 'gstRate',
    },
    {
      title: 'GST Amount',
      dataIndex: 'gstAmount',
      key: 'gstAmount',
    },
    {
      title: 'Total Price',
      dataIndex: 'totalProductPrice',
      key: 'totalProductPrice',
    },
  ];

  return (
    <div>
      <h2>Record Sale</h2>
      <Form layout="vertical">
        <Form.Item label="Select Product">
          <Select onChange={handleProductSelect} placeholder="Select a product">
            {products.map(product => (
              <Option key={product._id} value={product._id}>{product.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Table dataSource={selectedProducts} columns={columns} rowKey="_id" pagination={false} />
        <div>
          <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        </div>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit}>Record Sale</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RecordSaleForm;
