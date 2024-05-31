// db.js
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb+srv://mnanish55:yTidtvtHmPYtdoIx@gst.izt4ovd.mongodb.net/billingGST'; // Change this to your MongoDB connection string

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
