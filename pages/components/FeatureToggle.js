import React from 'react';
import { FeatureToggleContext } from '../../context/FeatureToggleContext';

export const FeatureToggle = ({ children, enabledFeatures }) => {
  return (
    <FeatureToggleContext.Provider value={{ enabledFeatures }}>
      {children}
    </FeatureToggleContext.Provider>
  );
};

export default FeatureToggle;
