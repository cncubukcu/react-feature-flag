import React, { useEffect, useState } from 'react';
import FeatureFlagPanel from '../FeatureFlag/FeatureFlagPanel';
import { extractFeatureFlagsFromConfig } from '../FeatureFlag/FeatureFlag';

export const FeatureFlagPanelWrapper = ({ config: _config }) => {
  const [config, setConfig] = useState(_config);
  useEffect(() => {
    setConfig(_config);
  }, [_config])
  const flags = extractFeatureFlagsFromConfig(config);

  return (
    <FeatureFlagPanel
      config={config}
      flags={flags}
    />
  )
}
