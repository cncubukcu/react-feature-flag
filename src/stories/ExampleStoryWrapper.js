import React from 'react';
import App from '../App';
import featureConfig from '../featureConfig';
import { FeatureFlagProvider } from '../FeatureFlag';

export const ExampleStoryWrapper = () => {
  return (
    <FeatureFlagProvider config={featureConfig}>
      <App />
    </FeatureFlagProvider>
  )
}