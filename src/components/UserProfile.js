import React, { useEffect, useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

const UserProfile = () => {
  const [userInfo, setUserInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const { data } = await API.get('/auth/profile');
        setUserInfo(data);
      } catch (error) {
        console.error('Error fetching user info:', error);
        if (error.response?.status === 401) {
          navigate('/login'); // Redirect to login if unauthorized
        }
      }
    };

    fetchUserInfo();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="profile-container">
      <nav className="navbar">
        <div className="nav-links">
          <button onClick={() => navigate('/')}>Dashboard</button>
          <button onClick={() => navigate('/expense')}>Add Expense</button>
        </div>
        <div className="user-widget">
          <span>{userInfo.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <div className="profile-content">
        <h2>User Profile</h2>
        <div className="profile-card">
          <div className="profile-info">
            <label>Name:</label>
            <p>{userInfo.name || 'Loading...'}</p>
          </div>
          <div className="profile-info">
            <label>Email:</label>
            <p>{userInfo.email || 'Loading...'}</p>
          </div>
          <div className="profile-info">
            <label>Phone Number:</label>
            <p>{userInfo.phone || 'Loading...'}</p>
          </div>
          <div className="profile-info">
            <label>Sign-Up Date:</label>
            <p>
              {userInfo.createdAt
                ? new Date(userInfo.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'Loading...'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
