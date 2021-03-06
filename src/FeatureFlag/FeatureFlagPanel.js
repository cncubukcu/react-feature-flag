import React, { useState } from 'react';
import { bool, shape, arrayOf, string, func } from 'prop-types';
import './featureFlag.scss';
import { ReactComponent as CloseSVG } from './close.svg';
import { ReactComponent as GearSVG } from './gear.svg';
import FeatureItem from './FeatureItem';
import FeatureOptionItem from './FeatureOptionItem';

const FeatureFlagPanel = ({
  config,
  flags,
  handleFeatureToggleChange,
  handleOptionValueChange,
  openPanelOnMount
}) => {
  const [isFeatureToggleContentOpen, setIsFeatureToggleContentOpen] = useState(openPanelOnMount);

  const [isPermanentlyClosed, setPermanentlyClosed] = useState(false);
  const toggleContent = () => {
    setIsFeatureToggleContentOpen(!isFeatureToggleContentOpen);
  }

  const closePermanent = (e) => {
    setPermanentlyClosed(e.currentTarget.checked);
  }

  if (!isFeatureToggleContentOpen && isPermanentlyClosed) return null; 

  return (
    <div className="feature-toggle-panel">
      {isFeatureToggleContentOpen && (
        <div className="feature-toggle-panel feature-toggle-panel-position"> 
          <div className="feature-toggle-container">
            <div className="feature-toggle-header">
              <span className="feature-toggle-header-text">
                Feature Flags
              </span>
              <div
                // className="feature-toggle-header-close"
                onClick={toggleContent}
                className="feature-toggle-header-close"

              >
                <CloseSVG className="closeSVG" />
              </div>
            </div>
            <div className="feature-toggle-content">
              {config.map((feature, featureIndex) => {
                const featureIsChecked = flags[feature.id];
                return (
                  <div
                    key={feature.id}
                    className="feature-toggle-content-wrapper"
                  >
                    <FeatureItem
                      key={feature.id}
                      checked={!!flags[feature.id]}
                      feature={feature}
                      featureIndex={featureIndex}
                      onChange={handleFeatureToggleChange(feature.id)}
                    />
                    {featureIsChecked && feature.options && (
                      <div className="feature-toggle-content-item-option-container">
                        {feature.options.map((option, optionIndex) => (
                          <FeatureOptionItem
                            key={option.value}
                            checked={flags[feature.id] === option.value}
                            featureIndex={featureIndex}
                            onChange={handleOptionValueChange(feature.id)(option.value)}
                            option={option}
                            optionIndex={optionIndex}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                )
              }
              )}
            </div>
            <div className="feature-toggle-footer">
              <div>
                Hide panel until next refresh
                <input
                  type="checkbox"
                  name="untilNextRefresh"
                  onChange={closePermanent}
                />
              </div>
            </div>
          </div>
        </div>
      )}
      <div
        className="feature-toggle-panel-opener feature-toggle-panel-position"
        onClick={toggleContent}
      >
        <GearSVG className="gearSVG"/>
      </div>
    </div>
  );
};

FeatureFlagPanel.propTypes = {
  config: arrayOf(shape({
    name: string.isRequired,
    id: string.isRequired,
    enum: arrayOf(string)
  })),
  flags: shape({}),
  handleFeatureToggleChange: func,
  handleOptionValueChange: func,
  openPanelOnMount: bool,
};

FeatureFlagPanel.defaultProps = {
  config: [],
  flags: {},
  handleFeatureToggleChange: () => () => {},
  handleOptionValueChange: () => () => {},
  openPanelOnMount: false,
}

export default FeatureFlagPanel;
