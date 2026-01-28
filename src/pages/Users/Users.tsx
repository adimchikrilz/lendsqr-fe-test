import React, { useState, useEffect } from 'react';
import './Users.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';
import StatsCard from '../../components/StatsCard/StatsCard';
import UsersTable from '../../components/UsersTable/UsersTable';

// Types
interface User {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Fetch users from mock API
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, we'll use mock data
      const mockUsers = generateMockUsers(500);
      setUsers(mockUsers);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching users:', error);
      setLoading(false);
    }
  };

  // Generate mock users (will be replaced with actual API)
  const generateMockUsers = (count: number): User[] => {
    const organizations = ['Lendsqr', 'Lendstar', 'Irorun'];
    const statuses: Array<'Active' | 'Inactive' | 'Pending' | 'Blacklisted'> = [
      'Active',
      'Inactive',
      'Pending',
      'Blacklisted',
    ];
    const names = [
      'Adedeji',
      'Debby Ogana',
      'Grace Effiom',
      'Tosin Dokunmu',
      'Peter Williams',
      'John Doe',
      'Jane Smith',
    ];

    return Array.from({ length: count }, (_, index) => ({
      id: `user-${index + 1}`,
      organization: organizations[Math.floor(Math.random() * organizations.length)],
      username: names[Math.floor(Math.random() * names.length)],
      email: `user${index + 1}@example.com`,
      phoneNumber: `080${Math.floor(10000000 + Math.random() * 90000000)}`,
      dateJoined: new Date(2020, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
        .toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
          hour: 'numeric',
          minute: '2-digit',
          hour12: true,
        }),
      status: statuses[Math.floor(Math.random() * statuses.length)],
    }));
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Calculate statistics
  const totalUsers = users.length;
  const activeUsers = users.filter((user) => user.status === 'Active').length;
  const usersWithLoans = Math.floor(totalUsers * 5.08); // Mock calculation
  const usersWithSavings = Math.floor(totalUsers * 41.8); // Mock calculation

  return (
    <div className="users-page">
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      <div className="users-main">
        <Header />
        
        

        <div className="users-content">
          <h1 className="page-title">Users</h1>

          {/* Statistics Cards */}
          <div className="stats-grid">
            <StatsCard
              icon="/assets/icons/u3.png"
              title="USERS"
              value={totalUsers.toLocaleString()}
              iconBg="#DF18FF1A"
            />
            <StatsCard
              icon="/assets/icons/people.png"
              title="ACTIVE USERS"
              value={activeUsers.toLocaleString()}
              iconBg="#5718FF1A"
            />
            <StatsCard
              icon="/assets/icons/money.png"
              title="USERS WITH LOANS"
              value={usersWithLoans.toLocaleString()}
              iconBg="#F55F441A"
            />
            <StatsCard
              icon="/assets/icons/coins.png"
              title="USERS WITH SAVINGS"
              value={usersWithSavings.toLocaleString()}
              iconBg="#FF33001A"
            />
          </div>

          {/* Users Table */}
          <UsersTable users={users} loading={loading} />
        </div>
      </div>
    </div>
  );
};

export default Users;