// src/components/DailySales.js
import React, { useState, useEffect } from 'react';
import { Table, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const DailySales = () => {
  const [sales, setSales] = useState([]);
  const [selectedDate, setSelectedDate] = useState(moment().format('YYYY-MM-DD'));

  useEffect(() => {
    fetchSales(selectedDate);
  }, [selectedDate]);

  const fetchSales = async (date) => {
    try {
      const response = await axios.get(`/api/sales/day/${date}`);
      setSales(response.data);
    } catch (error) {
      console.error('Error fetching sales:', error);
    }
  };

  const handleDateChange = (date, dateString) => {
    setSelectedDate(dateString);
  };

  const columns = [
    { title: 'Product Name', dataIndex: ['products', 'name'], key: 'name' },
    { title: 'Total Price', dataIndex: 'totalPrice', key: 'totalPrice' },
  ];

  return (
    <div>
      <h2>Sales for {selectedDate}</h2>
      <DatePicker defaultValue={moment()} onChange={handleDateChange} />
      <Table dataSource={sales} columns={columns} rowKey="_id" />
    </div>
  );
};

export default DailySales;
