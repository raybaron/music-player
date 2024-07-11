import React from 'react';
import './tab-switch.css';

const TabSwitcher = ({ currentTab, onTabChange }) => {
  return (
    <div className="tab-switcher">
      <a
        className={currentTab === 'forYou' ? 'active' : ''}
        onClick={() => onTabChange('forYou')}
      >
        For You
      </a>
      <a
        className={currentTab === 'topTracks' ? 'active' : ''}
        onClick={() => onTabChange('topTracks')}
      >
        Top Tracks
      </a>
    </div>
  );
};

export default TabSwitcher;
