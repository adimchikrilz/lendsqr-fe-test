import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Sidebar.scss';

interface MenuItem {
  name: string;
  icon: string;
  path: string;
}

interface SidebarProps {
  showExtraItems?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ showExtraItems = false }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const customersMenu: MenuItem[] = [
    { name: 'Users', icon: '/assets/icons/u1.png', path: '/users' },
    { name: 'Guarantors', icon: '/assets/icons/u2.png', path: '/guarantors' },
    { name: 'Loans', icon: '/assets/icons/cash.png', path: '/loans' },
    { name: 'Decision Models', icon: '/assets/icons/shake.png', path: '/decision-models' },
    { name: 'Savings', icon: '/assets/icons/piggy.png', path: '/savings' },
    { name: 'Loan Requests', icon: '/assets/icons/give.png', path: '/loan-requests' },
    { name: 'Whitelist', icon: '/assets/icons/good-user.png', path: '/whitelist' },
    { name: 'Karma', icon: '/assets/icons/bad-user.png', path: '/karma' },
  ];

  const businessesMenu: MenuItem[] = [
    { name: 'Organization', icon: '/assets/icons/bf.png', path: '/organization' },
    { name: 'Loan Products', icon: '/assets/icons/give.png', path: '/loan-products' },
    { name: 'Savings Products', icon: '/assets/icons/bank.png', path: '/savings-products' },
    { name: 'Fees and Charges', icon: '/assets/icons/coin.png', path: '/fees' },
    { name: 'Transactions', icon: '/assets/icons/multiple-arrow.png', path: '/transactions' },
    { name: 'Services', icon: '/assets/icons/settings.png', path: '/services' },
    { name: 'Service Account', icon: '/assets/icons/profile-settings.png', path: '/service-account' },
    { name: 'Settlements', icon: '/assets/icons/roll.png', path: '/settlements' },
    { name: 'Reports', icon: '/assets/icons/fx.png', path: '/reports' },
  ];

  const settingsMenu: MenuItem[] = [
    { name: 'Preferences', icon: '/assets/icons/dj.png', path: '/preferences' },
    { name: 'Fees and Pricing', icon: '/assets/icons/divide.png', path: '/fees-pricing' },
    { name: 'Audit Logs', icon: '/assets/icons/to-do.png', path: '/audit-logs' },
  ];

  const handleLogout = () => {
    console.log('Logging out...');
    // Implement logout logic
    // Clear localStorage, redirect to login, etc.
    localStorage.clear();
    window.location.href = '/login';
  };

  return (
    <>
      {/* Mobile Menu Toggle */}
      <button className={`mobile-menu-toggle ${isOpen ? 'open' : ''}`}
  onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </button>

      <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="org-switch">
            <img src="/assets/icons/bf.png" alt="Organization" />
            <span>Switch Organization</span>
            <img src="/assets/icons/ad.png" alt="Dropdown" className="dropdown" />
          </div>
        </div>

        <nav className="sidebar-nav">
          <Link to="/dashboard" className="nav-item dashboard-item">
            <img src="/assets/icons/ho.png" alt="Dashboard" />
            <span>Dashboard</span>
          </Link>

          <div className="nav-section">
            <h3 className="section-title">CUSTOMERS</h3>
            {customersMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${
                  location.pathname === item.path || location.pathname.startsWith(item.path + '/')
                    ? 'active'
                    : ''
                }`}
              >
                <img src={item.icon} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="nav-section">
            <h3 className="section-title">BUSINESSES</h3>
            {businessesMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <img src={item.icon} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            ))}
          </div>

          <div className="nav-section">
            <h3 className="section-title">SETTINGS</h3>
            {settingsMenu.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
              >
                <img src={item.icon} alt={item.name} />
                <span>{item.name}</span>
              </Link>
            ))}

            {/* Conditional Systems Messages - Only show when showExtraItems is true */}
            {showExtraItems && (
              <Link to="/system-messages" className="nav-item">
                <img src="/assets/icons/wheel.png" alt="Systems Messages" />
                <span>Systems Messages</span>
              </Link>
            )}
          </div>

          {/* Logout Button - Only show when showExtraItems is true */}
          {showExtraItems && (
            <div className="sidebar-footer">
              <button className="nav-item logout-item" onClick={handleLogout}>
                <img src="/assets/icons/logout.png" alt="Logout" />
                <span>Logout</span>
              </button>
              <p className="version">v1.2.0</p>
            </div>
          )}
        </nav>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(false)}></div>}
    </>
  );
};

export default Sidebar;