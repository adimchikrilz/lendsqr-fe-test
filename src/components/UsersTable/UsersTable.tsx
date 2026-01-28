import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UsersTable.scss';

interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

interface UsersTableProps {
  users: User[];
  loading: boolean;
}

interface FilterState {
  organization: string;
  username: string;
  email: string;
  date: string;
  phoneNumber: string;
  status: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ users, loading }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(100);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>({
    organization: '',
    username: '',
    email: '',
    date: '',
    phoneNumber: '',
    status: '',
  });

  const filterRef = useRef<HTMLDivElement>(null);
  const actionMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (filterRef.current && !filterRef.current.contains(event.target as Node)) {
        setShowFilterMenu(false);
      }
      if (actionMenuRef.current && !actionMenuRef.current.contains(event.target as Node)) {
        setActiveMenu(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter users based on active filters
  const filteredUsers = users.filter((user) => {
    if (filters.organization && !user.organization.toLowerCase().includes(filters.organization.toLowerCase())) {
      return false;
    }
    if (filters.username && !user.username.toLowerCase().includes(filters.username.toLowerCase())) {
      return false;
    }
    if (filters.email && !user.email.toLowerCase().includes(filters.email.toLowerCase())) {
      return false;
    }
    if (filters.phoneNumber && !user.phoneNumber.includes(filters.phoneNumber)) {
      return false;
    }
    if (filters.status && user.status !== filters.status) {
      return false;
    }
    if (filters.date && !user.dateJoined.includes(filters.date)) {
      return false;
    }
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUsers = filteredUsers.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (value: number) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  const handleUserClick = (userId: string) => {
    // Store user data in localStorage before navigating
    const userData = users.find(u => u.id === userId);
    if (userData) {
      localStorage.setItem(`user_${userId}`, JSON.stringify(userData));
    }
    navigate(`/users/${userId}`);
  };

  const toggleMenu = (userId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    setActiveMenu(activeMenu === userId ? null : userId);
  };

  const handleFilterChange = (field: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleFilterSubmit = () => {
    setCurrentPage(1); // Reset to first page when filtering
    setShowFilterMenu(false);
  };

  const handleFilterReset = () => {
    setFilters({
      organization: '',
      username: '',
      email: '',
      date: '',
      phoneNumber: '',
      status: '',
    });
    setCurrentPage(1);
  };

  const handleBlacklistUser = (userId: string) => {
    console.log('Blacklist user:', userId);
    // Implement blacklist functionality
    setActiveMenu(null);
  };

  const handleActivateUser = (userId: string) => {
    console.log('Activate user:', userId);
    // Implement activate functionality
    setActiveMenu(null);
  };

  const getStatusClass = (status: string) => {
    return `status-badge status-${status.toLowerCase()}`;
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        pages.push(currentPage - 1);
        pages.push(currentPage);
        pages.push(currentPage + 1);
        pages.push('...');
        pages.push(totalPages);
      }
    }

    return pages;
  };

  // Get unique organizations for filter dropdown
  const uniqueOrganizations = Array.from(new Set(users.map(u => u.organization)));

  if (loading) {
    return (
      <div className="users-table-container">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="users-table-container">
      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>
                <div className="th-content">
                  <span>ORGANIZATION</span>
                  <button 
                    className="filter-btn" 
                    onClick={() => setShowFilterMenu(!showFilterMenu)}
                  >
                    <img src="/assets/icons/drop-down.png" alt="Filter" />
                  </button>
                </div>
                {showFilterMenu && (
                  <div className="filter-dropdown" ref={filterRef}>
                    <div className="filter-group">
                      <label>Organization</label>
                      <select
                        value={filters.organization}
                        onChange={(e) => handleFilterChange('organization', e.target.value)}
                      >
                        <option value="">Select</option>
                        {uniqueOrganizations.map(org => (
                          <option key={org} value={org}>{org}</option>
                        ))}
                      </select>
                    </div>

                    <div className="filter-group">
                      <label>Username</label>
                      <input
                        type="text"
                        placeholder="User"
                        value={filters.username}
                        onChange={(e) => handleFilterChange('username', e.target.value)}
                      />
                    </div>

                    <div className="filter-group">
                      <label>Email</label>
                      <input
                        type="email"
                        placeholder="Email"
                        value={filters.email}
                        onChange={(e) => handleFilterChange('email', e.target.value)}
                      />
                    </div>

                    <div className="filter-group">
                      <label>Date</label>
                      <div className="date-input-wrapper">
                        <input
                          type="date"
                          placeholder="Date"
                          value={filters.date}
                          onChange={(e) => handleFilterChange('date', e.target.value)}
                        />
                        <img src="/assets/icons/calender.png" alt="Calendar" className="calendar-icon" />
                      </div>
                    </div>

                    <div className="filter-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        placeholder="Phone Number"
                        value={filters.phoneNumber}
                        onChange={(e) => handleFilterChange('phoneNumber', e.target.value)}
                      />
                    </div>

                    <div className="filter-group">
                      <label>Status</label>
                      <select
                        value={filters.status}
                        onChange={(e) => handleFilterChange('status', e.target.value)}
                      >
                        <option value="">Select</option>
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                        <option value="Pending">Pending</option>
                        <option value="Blacklisted">Blacklisted</option>
                      </select>
                    </div>

                    <div className="filter-actions">
                      <button className="reset-btn" onClick={handleFilterReset}>
                        Reset
                      </button>
                      <button className="filter-submit-btn" onClick={handleFilterSubmit}>
                        Filter
                      </button>
                    </div>
                  </div>
                )}
              </th>
              <th>
                <div className="th-content">
                  <span>USERNAME</span>
                  <button className="filter-btn">
                    <img src="/assets/icons/drop-down.png" alt="Filter" />
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>EMAIL</span>
                  <button className="filter-btn">
                    <img src="/assets/icons/drop-down.png" alt="Filter" />
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>PHONE NUMBER</span>
                  <button className="filter-btn">
                    <img src="/assets/icons/drop-down.png" alt="Filter" />
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>DATE JOINED</span>
                  <button className="filter-btn">
                    <img src="/assets/icons/drop-down.png" alt="Filter" />
                  </button>
                </div>
              </th>
              <th>
                <div className="th-content">
                  <span>STATUS</span>
                  <button className="filter-btn">
                    <img src="/assets/icons/drop-down.png" alt="Filter" />
                  </button>
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map((user) => (
              <tr key={user.id}>
                <td onClick={() => handleUserClick(user.id)}>{user.organization}</td>
                <td onClick={() => handleUserClick(user.id)}>{user.username}</td>
                <td onClick={() => handleUserClick(user.id)}>{user.email}</td>
                <td onClick={() => handleUserClick(user.id)}>{user.phoneNumber}</td>
                <td onClick={() => handleUserClick(user.id)}>{user.dateJoined}</td>
                <td onClick={() => handleUserClick(user.id)}>
                  <span className={getStatusClass(user.status)}>{user.status}</span>
                </td>
                <td>
                  <div className="action-menu-wrapper" ref={actionMenuRef}>
                    <button 
                      className="action-btn" 
                      onClick={(e) => toggleMenu(user.id, e)}
                    >
                      <img src="/assets/icons/click.png" alt="More" />
                    </button>
                    {activeMenu === user.id && (
                      <div className="action-menu">
                        <button 
                          className="action-menu-item"
                          onClick={() => handleUserClick(user.id)}
                        >
                          <img src="/assets/icons/view.png" alt="View" />
                          <span>View Details</span>
                        </button>
                        <button 
                          className="action-menu-item"
                          onClick={() => handleBlacklistUser(user.id)}
                        >
                          <img src="/assets/icons/bad.png" alt="Blacklist" />
                          <span>Blacklist User</span>
                        </button>
                        <button 
                          className="action-menu-item"
                          onClick={() => handleActivateUser(user.id)}
                        >
                          <img src="/assets/icons/good.png" alt="Activate" />
                          <span>Activate User</span>
                        </button>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="pagination">
        <div className="pagination-info">
          <span>Showing</span>
          <select
            className="items-per-page"
            value={itemsPerPage}
            onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
          >
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
          <span>out of {filteredUsers.length}</span>
        </div>

        <div className="pagination-controls">
          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <img src="/assets/icons/left.png" alt="Previous" />
          </button>

          {getPageNumbers().map((page, index) =>
            page === '...' ? (
              <span key={`ellipsis-${index}`} className="page-ellipsis">
                ...
              </span>
            ) : (
              <button
                key={page}
                className={`page-number ${currentPage === page ? 'active' : ''}`}
                onClick={() => handlePageChange(page as number)}
              >
                {page}
              </button>
            )
          )}

          <button
            className="page-btn"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            <img src="/assets/icons/right.png" alt="Next" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default UsersTable;