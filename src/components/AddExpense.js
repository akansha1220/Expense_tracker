import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../utils/api'; // Import your API instance
import './AddExpense.css';

const AddExpense = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    type: '',
    amount: '',
    date: '',
    description: '',
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem('username'),
    image: '/default-profile.png',
  });

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.type || !formData.amount || !formData.date || !formData.description) {
      setErrorMessage('All fields are required.');
      return;
    }

    try {
      // Make API request with data in the body
      const response = await API.post('/expense', {
        type: formData.type,
        amount: parseFloat(formData.amount),
        expenseDate: formData.date,
        // description: formData.description,
      });

      console.log('Expense added successfully:', response.data);

      // Navigate to the dashboard or show success message
      navigate('/');
    } catch (error) {
      console.error('Error adding expense:', error);
      setErrorMessage('Failed to add expense. Please try again.');
    }
  };

  return (
    <div className="add-expense-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <button onClick={() => navigate('/')}>Dashboard</button>
          <button onClick={() => navigate('/profile')}>User</button>
        </div>
        <div className="user-widget">
          <span>{userInfo.name}</span>
          <button onClick={() => navigate('/login')}>Logout</button>
        </div>
      </nav>

      {/* Add Expense Form */}
      <div className="add-expense-form">
        <h2>Add Expense</h2>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <form className="expense-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="expense-type">Expense Type</label>
            <select
              id="expense-type"
              name="type"
              value={formData.type}
              onChange={handleChange}
            >
              <option value="">Select</option>
              <option value="food">Food</option>
              <option value="shopping">Shopping</option>
              <option value="rent">House Rent</option>
              <option value="bills">Bills</option>
              <option value="entertainment">Entertainment</option>
              <option value="transport">Transport</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="amount">Amount</label>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button type="submit" className="submit-button">
            Add Expense
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddExpense;
