import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { PieChart, Pie, Tooltip, Cell, Legend } from 'recharts';
import { useNavigate } from 'react-router-dom';
import './UserDashboard.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4567', '#19FF9A'];

const UserDashboard = () => {
  const [pieChartData, setPieChartData] = useState([]);
  const [expenseList, setExpenseList] = useState([]);
  const [userInfo, setUserInfo] = useState({
    name: localStorage.getItem('username'),
    image: '/default-profile.png',
  });
  const [filter, setFilter] = useState('all'); // Default filter is "All Time"
  const [customRange, setCustomRange] = useState({ startDate: '', endDate: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await fetchPieChartData(filter, customRange);
      await fetchExpenseList();
      await fetchUserInfo();
    };
    fetchData();
  }, [filter, customRange]);

  const fetchPieChartData = async (filter = 'all', customRange = null) => {
    let startDate = '';
    let endDate = '';

    if (filter === 'today') {
      const today = new Date();
      startDate = endDate = today.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    } else if (filter === 'month') {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().split('T')[0]; // First day of the month
      endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().split('T')[0]; // Last day of the month
    } else if (filter === 'all') {
      startDate = '1970-01-01'; // Beginning of UNIX time
      endDate = new Date().toISOString().split('T')[0]; // Current date
    } else if (filter === 'custom' && customRange) {
      if (customRange.startDate && customRange.endDate) {
        startDate = new Date(customRange.startDate).toISOString().split('T')[0];
        endDate = new Date(customRange.endDate).toISOString().split('T')[0];
      }
    }

    try {
      const { data } = await API.get('/expense/stats', {
        params: { startDate, endDate },
      });

      // Adjust the data structure to match the Pie chart's expected format
      const formattedData = data.map(item => ({
        name: item.type,
        value: parseFloat(item.totalAmount),
      }));
      setPieChartData(formattedData);
    } catch (error) {
      console.error('Error fetching pie chart data:', error);
    }
  };

  const fetchExpenseList = async () => {
    try {
      const { data } = await API.get('/expense');
      setExpenseList(data.data);
    } catch (error) {
      console.error('Error fetching expense list:', error);
    }
  };

  const fetchUserInfo = async () => {
    try {
      const { data } = await API.get('/auth/profile');
      setUserInfo(data);
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="dashboard-container">
      {/* Navigation Bar */}
      <nav className="navbar">
        <div className="nav-links">
          <button onClick={() => navigate('/expense')}>Add Expense</button>
          <button onClick={() => navigate('/profile')}>User</button>
        </div>
        <div className="user-widget">
          <span>{userInfo.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      {/* Main Content */}
      <div className="content">
        <h2>User Dashboard</h2>

        {/* Expense Statistics Section */}
        <div className="section">
          <h3>Expense Statistics</h3>
          
          {/* Filter Options (Styled as Attractive Buttons) */}
          <div className="filter-container">
            <label>Filter by: </label>
            <div className="filter-options">
              <button
                className={filter === 'today' ? 'filter-button active' : 'filter-button'}
                onClick={() => setFilter('today')}
              >
                Today
              </button>
              <button
                className={filter === 'month' ? 'filter-button active' : 'filter-button'}
                onClick={() => setFilter('month')}
              >
                This Month
              </button>
              <button
                className={filter === 'all' ? 'filter-button active' : 'filter-button'}
                onClick={() => setFilter('all')}
              >
                All Time
              </button>
              <button
                className={filter === 'custom' ? 'filter-button active' : 'filter-button'}
                onClick={() => setFilter('custom')}
              >
                Custom Date
              </button>
            </div>

            {/* Custom Date Range Inputs */}
            {filter === 'custom' && (
              <div className="custom-date-container">
                <label>Start Date: </label>
                <input
                  type="date"
                  value={customRange.startDate}
                  onChange={(e) => setCustomRange({ ...customRange, startDate: e.target.value })}
                />
                <label>End Date: </label>
                <input
                  type="date"
                  value={customRange.endDate}
                  onChange={(e) => setCustomRange({ ...customRange, endDate: e.target.value })}
                />
              </div>
            )}
          </div>

          {/* Pie Chart */}
          <div className="chart-container">
            <PieChart width={400} height={300}>
              <Pie
                data={pieChartData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                fill="#8884d8"
                label
              >
                {pieChartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>
        </div>

        {/* Scrollable List Section */}
        <div className="section scrollable-list-container">
          <h3>Expense History</h3>
          <ul className="expense-list">
            {expenseList.map((expense) => (
              <li key={expense.id}>
                <div>
                  <span>{new Date(expense.createdAt).toLocaleDateString()}</span>
                  <span>{expense.type}</span>
                </div>
                <div>
                  <span>${expense.amount}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
