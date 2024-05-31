import React, { useState, useEffect } from 'react';
import { Form, Input, Select, Button } from 'antd';
import axios from 'axios';

const { Option } = Select;

const AddProductForm = () => {
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('/api/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const onFinish = async (values) => {
    try {
        console.log(values)
      const response = await axios.post('/api/products', values);
      setMessage(response.data.message);
      form.resetFields();
    } catch (error) {
      setMessage('Error adding product. Please try again.');
      console.error('Error adding product:', error);
    }
  };

  return (
    <div>
      <h2>Add Product</h2>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Product Name" name="name" rules={[{ required: true, message: 'Please enter product name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Product Price" name="price" rules={[{ required: true, message: 'Please enter product Price' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Category" name="category" rules={[{ required: true, message: 'Please select a category' }]}>
          <Select placeholder="Select Category">
            {categories.map((category) => (
              <Option key={category._id} value={category._id}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Product
          </Button>
        </Form.Item>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddProductForm;
