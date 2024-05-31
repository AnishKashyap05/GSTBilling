import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Input, Select, Button } from 'antd';

const { Option } = Select;

const SetGSTForm = () => {
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

  const formSubmitHandler = async (values) => {
    try {
      const selectedCategory = categories.find(category => category.name === values.id);
      if (!selectedCategory) {
        throw new Error('Invalid category selected');
      }
      const data = {
        categoryId: selectedCategory._id,
        name: selectedCategory.name,
        gstRate: values.gstRate
      };
      console.log(data)
      const response = await axios.put(`/api/categories/${data.categoryId}`, data);
      setMessage(response.data.message);
    } catch (error) {
      setMessage('Error setting GST rate. Please try again.');
      console.error('Error setting GST rate:', error);
    }
  };

  return (
    <div>
      <h2>Set GST Rate</h2>
      <Form layout="vertical" onFinish={formSubmitHandler}>
        <Form.Item label="Category" name="id" rules={[{ required: true, message: 'Please select a category' }]}>
          <Select placeholder="Select Category">
            {categories.map((category) => (
              <Option key={category._id} value={category.name}>{category.name}</Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="GST Rate" name="gstRate" rules={[{ required: true, message: 'Please input GST rate' }]}>
          <Input type="number" placeholder="Enter GST Rate" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default SetGSTForm;
