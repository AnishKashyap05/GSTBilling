// src/components/AdminProductCategoriesForm.js
import React, { useState } from 'react';

const AdminProductCategoriesForm = ({ onSubmit }) => {
  const [categoryName, setCategoryName] = useState('');
  const [gstRate, setGstRate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ categoryName, gstRate });
    setCategoryName('');
    setGstRate('');
  };

  return (
    <div>
      <h2>Create Product Category</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Category Name:</label>
          <input type="text" value={categoryName} onChange={(e) => setCategoryName(e.target.value)} />
        </div>
        <div>
          <label>GST Rate:</label>
          <input type="number" value={gstRate} onChange={(e) => setGstRate(e.target.value)} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AdminProductCategoriesForm;
