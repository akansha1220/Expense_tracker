import React, { useState } from 'react';
import API from '../utils/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', data.token.token);
      localStorage.setItem('username', data.user.name);
      localStorage.setItem('userid', data.user.id);
      navigate('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  const handleForgotPassword = () => {
    alert('Forgot Password functionality coming soon!');
  };

  const handleSignUp = () => {
    navigate('/signup');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.mainHeading}>Expense Tracker</h1>
        <h2 style={styles.subHeading}>Login to Manage Your Expenses</h2>
        <form onSubmit={handleLogin} style={styles.form}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={styles.input}
          />
          <div style={styles.passwordContainer}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.passwordInput}
            />
            <button
              type="button"
              style={styles.showPasswordButton}
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </div>
          <button type="submit" style={styles.button}>
            Login
          </button>
          <button type="button" style={styles.forgotButton} onClick={handleForgotPassword}>
            Forgot Password?
          </button>
          {error && <p style={styles.error}>{error}</p>}
        </form>
        <button onClick={handleSignUp} style={styles.signUpButton}>
          Sign Up
        </button>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    background: 'linear-gradient(135deg, #43cea2, #185a9d)',
    fontFamily: 'Arial, sans-serif',
  },
  card: {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.2)',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  },
  mainHeading: {
    fontSize: '32px',
    fontWeight: 'bold',
    color: '#185a9d',
    marginBottom: '10px',
  },
  subHeading: {
    fontSize: '18px',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  passwordContainer: {
    position: 'relative',
    marginBottom: '15px',
  },
  passwordInput: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
  showPasswordButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: '#185a9d',
    cursor: 'pointer',
    fontSize: '14px',
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#185a9d',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginBottom: '10px',
  },
  forgotButton: {
    fontSize: '14px',
    color: '#185a9d',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    textDecoration: 'underline',
    marginTop: '5px',
  },
  signUpButton: {
    padding: '12px',
    fontSize: '16px',
    fontWeight: 'bold',
    color: 'white',
    backgroundColor: '#43cea2',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '15px',
    width: '100%',
    transition: 'background-color 0.3s',
  },
  error: {
    color: 'red',
    marginTop: '15px',
    textAlign: 'center',
  },
};

export default Login;
