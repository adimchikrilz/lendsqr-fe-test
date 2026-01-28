import React, { useState } from 'react';
import './Header.scss';

const Header: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    // Implement search functionality
  };

  return (
    <header className="header">
      <div className="header-left">
        <img src="/assets/Group.png" alt="Lendsqr" className="header-logo" />
      </div>

      <div className="header-center">
        <form className="search-form" onSubmit={handleSearch}>
          <input
            type="text"
            className="search-input"
            placeholder="Search for anything"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button type="submit" className="search-button">
            <img src="/assets/icons/search.png" alt="Search" />
          </button>
        </form>
      </div>

      <div className="header-right">
        <a href="#" className="docs-link">
          Docs
        </a>
        <button className="notification-btn">
          <img src="/assets/icons/bell.png" alt="Notifications" />
        </button>
        <div className="user-profile">
          <img src="/assets/icons/avatar.png" alt="User" className="user-avatar" />
          <span className="user-name">Adedeji</span>
          <img src="/assets/icons/down.png" alt="Menu" className="dropdown-icon" />
        </div>
      </div>
    </header>
  );
};

export default Header;