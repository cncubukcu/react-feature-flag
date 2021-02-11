import React, { useEffect, useState } from 'react';
import { bool } from 'prop-types';
import FeatureFlagPanel from '../FeatureFlag/FeatureFlagPanel';
import { extractFeatureFlagsFromConfig } from '../FeatureFlag/FeatureFlag';

const getFeatureValue = (feature, isChecked) => {
  if (!isChecked) return false;
  return feature.options ? feature.options[0].value : true;
}

export const FeatureFlagPanelWrapper = ({ config: _config, openPanelOnMount }) => {
  const [config, setConfig] = useState(_config);
  useEffect(() => {
    setConfig(_config);
  }, [_config])

  const handleOptionValueChange = (id) => (value) => (e) => {
    const feature = config.find(feat => feat.id === id);
    const featureIndex = config.findIndex(feat => feat.id === id);
    const __config = [...config.slice(0,featureIndex), {...feature, defaultValue: value }, ...config.slice(featureIndex + 1, config.length)]
    setConfig(__config);
  };

  const handleFeatureToggleChange = (id) => (e) => {
    const isChecked = e.currentTarget.checked;

    const feature = config.find(feat => feat.id === id);
    const featureIndex = config.findIndex(feat => feat.id === id);
    const featureValue = getFeatureValue(feature, isChecked);

    const __config = [...config.slice(0,featureIndex), {...feature, defaultValue: featureValue }, ...config.slice(featureIndex + 1, config.length)]
    setConfig(__config);
  };

  const flags = extractFeatureFlagsFromConfig(config, false);

  return (
    <FeatureFlagPanel
      config={config}
      flags={flags}
      handleOptionValueChange={handleOptionValueChange}
      handleFeatureToggleChange={handleFeatureToggleChange}
      openPanelOnMount={openPanelOnMount}
    />
  )
}

FeatureFlagPanelWrapper.propTypes = {
  openPanelOnMount: bool,
}

FeatureFlagPanelWrapper.defaultProps = {
  openPanelOnMount: true,
}
