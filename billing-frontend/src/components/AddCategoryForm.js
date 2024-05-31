import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import axios from 'axios';

const AddCategoryForm = () => {
  const [form] = Form.useForm();
  const [message, setMessage] = useState('');

  const onFinish = async (values) => {
    try {
      const response = await axios.post('/api/categories', values);
      setMessage(response.data.message);
      form.resetFields();
      window.location.reload()
    } catch (error) {
      setMessage('Error adding category. Please try again.');
      console.error('Error adding category:', error);
    }
  };

  return (
    <div>
      <Form form={form} onFinish={onFinish} layout="vertical">
        <Form.Item label="Category Name" name="name" rules={[{ required: true, message: 'Please enter category name' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="GST Rate" name="gstRate" rules={[{ required: true, message: 'Please input GST rate' }]}>
          <Input type="number" placeholder="Enter GST Rate" />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Add Category
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCategoryForm;
