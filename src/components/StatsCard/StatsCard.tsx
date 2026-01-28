import React from 'react';
import './StatsCard.scss';

interface StatsCardProps {
  icon: string;
  title: string;
  value: string;
  iconBg: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ icon, title, value, iconBg }) => {
  return (
    <div className="stats-card">
      <div className="stats-icon" style={{ background: iconBg }}>
        <img src={icon} alt={title} />
      </div>
      <h3 className="stats-title">{title}</h3>
      <p className="stats-value">{value}</p>
    </div>
  );
};

export default StatsCard;