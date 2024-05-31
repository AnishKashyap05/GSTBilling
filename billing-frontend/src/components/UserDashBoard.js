import React from 'react';
import RecordSaleForm from './RecordSaleForm';
import {Link} from 'react-router-dom'

const UserDashboard = () => {
  return (
    <div>
      <div style={{ marginTop: '20px' }}>
        <Link to="/admin">
          <button className="btn btn-primary">Go to Admin Page</button>
        </Link>
      </div>
      <h1>User Dashboard</h1>
      
      <RecordSaleForm />
      
    </div>

  );
};

export default UserDashboard;
