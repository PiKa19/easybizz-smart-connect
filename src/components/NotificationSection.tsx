
import React from 'react';

interface NotificationSectionProps {
  onBack: () => void;
}

const NotificationSection: React.FC<NotificationSectionProps> = ({ onBack }) => {
  return (
    <div>
      <h2>Notifications Section</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default NotificationSection;
