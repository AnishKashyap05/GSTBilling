// src/components/AdminDashboard.js
import React from 'react';
import SetGSTForm from './SetGSTForm';
import AddCategoryForm from './AddCategoryForm';
import AddProductForm from './AddProductForm';
import DailySales from './DailySales'; // Import the DailySales component
import RevenueSummary from './RevenueSummary'; // Import the RevenueSummary component

const AdminDashboard = () => {
  return (
    <div>
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ marginLeft: "300px"}}>Add Category</h2>
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <AddCategoryForm />
          <AddProductForm />
        </div>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <SetGSTForm />
      </div>
    </div>
  );
};

export default AdminDashboard;
