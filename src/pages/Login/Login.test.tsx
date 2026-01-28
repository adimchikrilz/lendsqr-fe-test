import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Login from './Login';

describe('Login Component', () => {
  it('renders the login page correctly', () => {
    render(<Login />);
    
    // Check for main elements
    expect(screen.getByText('Welcome!')).toBeInTheDocument();
    expect(screen.getByText('Enter details to login.')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByText('FORGOT PASSWORD?')).toBeInTheDocument();
    expect(screen.getByText('LOG IN')).toBeInTheDocument();
  });

  it('allows user to type in email input', async () => {
    render(<Login />);
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    
    await userEvent.type(emailInput, 'test@example.com');
    
    expect(emailInput.value).toBe('test@example.com');
  });

  it('allows user to type in password input', async () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    
    await userEvent.type(passwordInput, 'password123');
    
    expect(passwordInput.value).toBe('password123');
  });

  it('toggles password visibility when SHOW/HIDE button is clicked', async () => {
    render(<Login />);
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    const toggleButton = screen.getByText('SHOW');
    
    // Initially password should be hidden
    expect(passwordInput.type).toBe('password');
    
    // Click to show password
    await userEvent.click(toggleButton);
    expect(passwordInput.type).toBe('text');
    expect(screen.getByText('HIDE')).toBeInTheDocument();
    
    // Click to hide password again
    await userEvent.click(screen.getByText('HIDE'));
    expect(passwordInput.type).toBe('password');
    expect(screen.getByText('SHOW')).toBeInTheDocument();
  });

  it('submits the form with valid data', async () => {
    const consoleSpy = vi.spyOn(console, 'log');
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const submitButton = screen.getByText('LOG IN');
    
    await userEvent.type(emailInput, 'test@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.click(submitButton);
    
    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('Login submitted:', {
        email: 'test@example.com',
        password: 'password123'
      });
    });
  });

  it('requires email and password fields', async () => {
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    const passwordInput = screen.getByPlaceholderText('Password') as HTMLInputElement;
    
    expect(emailInput).toBeRequired();
    expect(passwordInput).toBeRequired();
  });

  it('has correct email input type', () => {
    render(<Login />);
    
    const emailInput = screen.getByPlaceholderText('Email') as HTMLInputElement;
    
    expect(emailInput.type).toBe('email');
  });

  it('renders logo image', () => {
    render(<Login />);
    
    const logo = screen.getByAltText('Lendsqr Logo');
    
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', '/assets/logo.svg');
  });

  it('renders illustration image', () => {
    render(<Login />);
    
    const illustration = screen.getByAltText('Login Illustration');
    
    expect(illustration).toBeInTheDocument();
    expect(illustration).toHaveAttribute('src', '/assets/login-illustration.svg');
  });

  it('has forgot password link', () => {
    render(<Login />);
    
    const forgotPasswordLink = screen.getByText('FORGOT PASSWORD?');
    
    expect(forgotPasswordLink).toBeInTheDocument();
    expect(forgotPasswordLink).toHaveAttribute('href', '#');
  });

  it('applies correct CSS classes', () => {
    render(<Login />);
    
    const container = document.querySelector('.login-container');
    const title = screen.getByText('Welcome!');
    const subtitle = screen.getByText('Enter details to login.');
    
    expect(container).toBeInTheDocument();
    expect(title).toHaveClass('login-title');
    expect(subtitle).toHaveClass('login-subtitle');
  });
});