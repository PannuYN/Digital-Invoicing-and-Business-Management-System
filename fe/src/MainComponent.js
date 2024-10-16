// MainComponent.jsx
import React from 'react';
import UpperHome from './UpperHome';
import LowerHome from './LowerHome';
import './CustomStyles.css';

const MainComponent = () => {
  return (
    <div>
      <UpperHome />
      <LowerHome />
    </div>
  );
}

export default MainComponent;
