import React, { useContext } from 'react';
import { FeatureToggleContext } from '../context/FeatureToggleContext';

export const useFeatureToggle = () => {
  const { enabledFeatures } = useContext(FeatureToggleContext);
  const isEnabled = (featureName) => {
    return enabledFeatures.includes(featureName);
  };

  return [isEnabled];
};
