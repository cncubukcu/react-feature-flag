import React from 'react';
import featureConfig from '../featureConfig';
import { FeatureFlagPanelWrapper } from './FeatureFlagPanelWrapper';


export default {
  title: 'Feature Flag/Feature Flag Panel',
  component: FeatureFlagPanelWrapper,
};

const Template = (args) => <FeatureFlagPanelWrapper {...args} />;

export const  FeatureFlagPanel = Template.bind({});
FeatureFlagPanel.args = {
  config: featureConfig,
  openAtStart: true,
};

