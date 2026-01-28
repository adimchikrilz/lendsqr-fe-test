import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.scss';

const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Handle login logic here
    console.log('Login submitted:', { email, password });
    
    // Simulate API call delay
    setTimeout(() => {
      // Navigate to users page after successful login
      navigate('/users');
      setIsLoading(false);
    }, 1500); // 1.5 second delay
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <div className="login-logo">
        <img src="/assets/Group.png" alt="Lendsqr Logo" className="logo" />
      </div>

      <div className="login-content">
        {/* Left Side - Illustration */}
        <div className="login-illustration">
          <img 
            src="/assets/pablo-sign-in 1.png" 
            alt="Login Illustration" 
            className="illustration-image"
          />
        </div>

        {/* Right Side - Login Form */}
        <div className="login-form-wrapper">
          <div className="login-form-container">
            <h1 className="login-title">Welcome!</h1>
            <p className="login-subtitle">Enter details to login.</p>

            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <input
                  type="email"
                  id="email"
                  className="form-input"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  disabled={isLoading}
                />
              </div>

              <div className="form-group password-group">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  className="form-input"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={togglePasswordVisibility}
                  disabled={isLoading}
                >
                  {showPassword ? 'HIDE' : 'SHOW'}
                </button>
              </div>

              <a href="#" className="forgot-password">
                FORGOT PASSWORD?
              </a>

              <button type="submit" className="login-button" disabled={isLoading}>
                {isLoading ? (
                  <span className="loading-spinner"></span>
                ) : (
                  'LOG IN'
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;