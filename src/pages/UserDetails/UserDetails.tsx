import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UserDetails.scss';
import Sidebar from '../../components/Sidebar/Sidebar';
import Header from '../../components/Header/Header';

interface UserData {
  id: string;
  organization: string;
  username: string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
  // Additional fields for details page
  accountBalance?: string;
  accountNumber?: string;
  bank?: string;
  bvn?: string;
  gender?: string;
  maritalStatus?: string;
  children?: string;
  typeOfResidence?: string;
  levelOfEducation?: string;
  employmentStatus?: string;
  sectorOfEmployment?: string;
  durationOfEmployment?: string;
  officeEmail?: string;
  monthlyIncome?: string;
  loanRepayment?: string;
  twitter?: string;
  facebook?: string;
  instagram?: string;
  guarantor1?: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
  guarantor2?: {
    fullName: string;
    phoneNumber: string;
    email: string;
    relationship: string;
  };
}

const UserDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('general');
  const [userData, setUserData] = useState<UserData | null>(null);

  // Enrich user data with additional mock details - MOVED BEFORE useEffect
  const enrichUserData = (user: UserData): UserData => {
    return {
      ...user,
      accountBalance: '200,000.00',
      accountNumber: '9912345678',
      bank: 'Providus Bank',
      bvn: '07060780922',
      gender: 'Female',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: "Parent's Apartment",
      levelOfEducation: 'B.Sc',
      employmentStatus: 'Employed',
      sectorOfEmployment: 'FinTech',
      durationOfEmployment: '2 years',
      officeEmail: 'grace@lendsqr.com',
      monthlyIncome: '₦200,000.00- ₦400,000.00',
      loanRepayment: '40,000',
      twitter: '@grace_effiom',
      facebook: 'Grace Effiom',
      instagram: '@grace_effiom',
      guarantor1: {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        email: 'debby@gmail.com',
        relationship: 'Sister',
      },
      guarantor2: {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        email: 'debby@gmail.com',
        relationship: 'Sister',
      },
    };
  };

  // Generate mock user details if not found - MOVED BEFORE useEffect
  const generateMockUserDetails = (userId: string): UserData => {
    return {
      id: userId,
      organization: 'Lendsqr',
      username: 'Grace Effiom',
      email: 'grace@gmail.com',
      phoneNumber: '07060780922',
      dateJoined: 'May 15, 2020 10:00 AM',
      status: 'Active',
      accountBalance: '200,000.00',
      accountNumber: '9912345678',
      bank: 'Providus Bank',
      bvn: '07060780922',
      gender: 'Female',
      maritalStatus: 'Single',
      children: 'None',
      typeOfResidence: "Parent's Apartment",
      levelOfEducation: 'B.Sc',
      employmentStatus: 'Employed',
      sectorOfEmployment: 'FinTech',
      durationOfEmployment: '2 years',
      officeEmail: 'grace@lendsqr.com',
      monthlyIncome: '₦200,000.00- ₦400,000.00',
      loanRepayment: '40,000',
      twitter: '@grace_effiom',
      facebook: 'Grace Effiom',
      instagram: '@grace_effiom',
      guarantor1: {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        email: 'debby@gmail.com',
        relationship: 'Sister',
      },
      guarantor2: {
        fullName: 'Debby Ogana',
        phoneNumber: '07060780922',
        email: 'debby@gmail.com',
        relationship: 'Sister',
      },
    };
  };

  useEffect(() => {
    // Try to get user data from localStorage first
    const storedUser = localStorage.getItem(`user_${id}`);
    
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserData(enrichUserData(user));
    } else {
      // If not in localStorage, generate mock data
      setUserData(generateMockUserDetails(id || ''));
    }
  }, [id]);

  const handleBackToUsers = () => {
    navigate('/users');
  };

  const handleBlacklist = () => {
    console.log('Blacklist user:', id);
    // Implement blacklist logic
  };

  const handleActivate = () => {
    console.log('Activate user:', id);
    // Implement activate logic
  };

  const getUserTier = () => {
    // Mock user tier (1-3)
    return 1;
  };

  if (!userData) {
    return (
      <div className="user-details-page">
        <Sidebar showExtraItems={true} />
        <div className="user-details-main">
          <Header />
          <div className="user-details-content">
            <div className="loading">Loading user details...</div>
          </div>
        </div>
      </div>
    );
  }

  const userTier = getUserTier();

  return (
    <div className="user-details-page">
      <Sidebar showExtraItems={true} />
      <div className="user-details-main">
        <Header />
        <div className="user-details-content">
          {/* Back Button */}
          <button className="back-button" onClick={handleBackToUsers}>
            <img src="/assets/icons/ar.png" alt="Back" />
            <span>Back to Users</span>
          </button>

          {/* Page Header */}
          <div className="page-header">
            <h1>User Details</h1>
            <div className="action-buttons">
              <button className="blacklist-btn" onClick={handleBlacklist}>
                BLACKLIST USER
              </button>
              <button className="activate-btn" onClick={handleActivate}>
                ACTIVATE USER
              </button>
            </div>
          </div>

          {/* User Profile Card - SEPARATE CONTAINER */}
          <div className="user-profile-card">
            <div className="profile-top">
              <div className="profile-avatar-section">
                <div className="avatar">
                  <img src="/assets/icons/profile.png" alt="User" />
                </div>
                <div className="profile-info">
                  <h2>{userData.username}</h2>
                  <p className="user-id">LSQF587g90</p>
                </div>
              </div>

              <div className="user-tier-section">
                <p className="tier-label">User's Tier</p>
                <div className="tier-stars">
                  {[1, 2, 3].map((star) => (
                    <img
                      key={star}
                      src={
                        star <= userTier
                          ? '/assets/icons/star1.png'
                          : '/assets/icons/star2.png'
                      }
                      alt="Star"
                    />
                  ))}
                </div>
              </div>

              <div className="bank-info-section">
                <h3>₦{userData.accountBalance}</h3>
                <p>{userData.accountNumber}/{userData.bank}</p>
              </div>
            </div>
            {/* Tabs */}
            <div className="profile-tabs">
              <button
                className={`tab ${activeTab === 'general' ? 'active' : ''}`}
                onClick={() => setActiveTab('general')}
              >
                General Details
              </button>
              <button
                className={`tab ${activeTab === 'documents' ? 'active' : ''}`}
                onClick={() => setActiveTab('documents')}
              >
                Documents
              </button>
              <button
                className={`tab ${activeTab === 'bank' ? 'active' : ''}`}
                onClick={() => setActiveTab('bank')}
              >
                Bank Details
              </button>
              <button
                className={`tab ${activeTab === 'loans' ? 'active' : ''}`}
                onClick={() => setActiveTab('loans')}
              >
                Loans
              </button>
              <button
                className={`tab ${activeTab === 'savings' ? 'active' : ''}`}
                onClick={() => setActiveTab('savings')}
              >
                Savings
              </button>
              <button
                className={`tab ${activeTab === 'app' ? 'active' : ''}`}
                onClick={() => setActiveTab('app')}
              >
                App and System
              </button>
            </div>
          </div>
          {/* Rest of your JSX remains the same */}
          {activeTab === 'general' && (
            <div className="details-content">
              {/* Personal Information */}
              <div className="info-section">
                <h3 className="section-title">Personal Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="label">FULL NAME</p>
                    <p className="value">{userData.username}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">PHONE NUMBER</p>
                    <p className="value">{userData.phoneNumber}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">EMAIL ADDRESS</p>
                    <p className="value">{userData.email}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">BVN</p>
                    <p className="value">{userData.bvn}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">GENDER</p>
                    <p className="value">{userData.gender}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">MARITAL STATUS</p>
                    <p className="value">{userData.maritalStatus}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">CHILDREN</p>
                    <p className="value">{userData.children}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">TYPE OF RESIDENCE</p>
                    <p className="value">{userData.typeOfResidence}</p>
                  </div>
                </div>
              </div>

              {/* Education and Employment */}
              <div className="info-section">
                <h3 className="section-title">Education and Employment</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="label">LEVEL OF EDUCATION</p>
                    <p className="value">{userData.levelOfEducation}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">EMPLOYMENT STATUS</p>
                    <p className="value">{userData.employmentStatus}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">SECTOR OF EMPLOYMENT</p>
                    <p className="value">{userData.sectorOfEmployment}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">DURATION OF EMPLOYMENT</p>
                    <p className="value">{userData.durationOfEmployment}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">OFFICE EMAIL</p>
                    <p className="value">{userData.officeEmail}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">MONTHLY INCOME</p>
                    <p className="value">{userData.monthlyIncome}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">LOAN REPAYMENT</p>
                    <p className="value">{userData.loanRepayment}</p>
                  </div>
                </div>
              </div>
              {/* Socials */}
              <div className="info-section">
                <h3 className="section-title">Socials</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="label">TWITTER</p>
                    <p className="value">{userData.twitter}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">FACEBOOK</p>
                    <p className="value">{userData.facebook}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">INSTAGRAM</p>
                    <p className="value">{userData.instagram}</p>
                  </div>
                </div>
              </div>
              {/* Guarantor */}
              <div className="info-section">
                <h3 className="section-title">Guarantor</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <p className="label">FULL NAME</p>
                    <p className="value">{userData.guarantor1?.fullName}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">PHONE NUMBER</p>
                    <p className="value">{userData.guarantor1?.phoneNumber}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">EMAIL ADDRESS</p>
                    <p className="value">{userData.guarantor1?.email}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">RELATIONSHIP</p>
                    <p className="value">{userData.guarantor1?.relationship}</p>
                  </div>
                </div>
              </div>

              {/* Guarantor 2 */}
              <div className="info-section">
                <div className="info-grid">
                  <div className="info-item">
                    <p className="label">FULL NAME</p>
                    <p className="value">{userData.guarantor2?.fullName}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">PHONE NUMBER</p>
                    <p className="value">{userData.guarantor2?.phoneNumber}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">EMAIL ADDRESS</p>
                    <p className="value">{userData.guarantor2?.email}</p>
                  </div>
                  <div className="info-item">
                    <p className="label">RELATIONSHIP</p>
                    <p className="value">{userData.guarantor2?.relationship}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* Other tabs content (placeholder) */}
          {activeTab !== 'general' && (
            <div className="details-content">
              <div className="placeholder-content">
                <p>Content for {activeTab} tab will be displayed here.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetails;