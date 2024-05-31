// src/components/RevenueSummary.js
import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'antd';
import axios from 'axios';

const RevenueSummary = () => {
  const [dailyRevenue, setDailyRevenue] = useState(0);
  const [monthlyRevenue, setMonthlyRevenue] = useState(0);
  const [yearlyRevenue, setYearlyRevenue] = useState(0);

  useEffect(() => {
    fetchRevenue('day', setDailyRevenue);
    fetchRevenue('month', setMonthlyRevenue);
    fetchRevenue('year', setYearlyRevenue);
  }, []);

  const fetchRevenue = async (period, setRevenue) => {
    try {
      const response = await axios.get(`/api/sales/revenue/${period}`);
      setRevenue(response.data.totalRevenue);
    } catch (error) {
      console.error(`Error fetching ${period} revenue:`, error);
    }
  };

  return (
    <div>
      <Row gutter={16}>
        <Col span={8}>
          <Card title="Daily Revenue" bordered={false}>
            ${dailyRevenue.toFixed(2)}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Monthly Revenue" bordered={false}>
            ${monthlyRevenue.toFixed(2)}
          </Card>
        </Col>
        <Col span={8}>
          <Card title="Yearly Revenue" bordered={false}>
            ${yearlyRevenue.toFixed(2)}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default RevenueSummary;
