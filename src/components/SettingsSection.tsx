
import React from 'react';

interface SettingsSectionProps {
  onBack: () => void;
}

const SettingsSection: React.FC<SettingsSectionProps> = ({ onBack }) => {
  return (
    <div>
      <h2>Settings Section</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );
};

export default SettingsSection;
