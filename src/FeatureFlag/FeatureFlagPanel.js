import React, { useState } from 'react';
import { shape, arrayOf, string, func } from 'prop-types';
import './featureFlag.scss';
import closeSVG from './close.svg';
import FeatureItem from './FeatureItem';
import FeatureOptionItem from './FeatureOptionItem';

const FeatureFlagPanel = ({
  config,
  flags,
  handleFeatureToggleChange,
  handleOptionValueChange
}) => {
  const [isFeatureToggleContentOpen, setIsFeatureToggleContentOpen] = useState(false);

  const [isPermanentlyClosed, setPermanentlyClosed] = useState(false);
  const toggleContent = () => {
    setIsFeatureToggleContentOpen(!isFeatureToggleContentOpen);
  }

  const closePermanent = (e) => {
    setPermanentlyClosed(e.currentTarget.checked);
  }

  if (!isFeatureToggleContentOpen && isPermanentlyClosed) return null; 

  return (
    <div className="feature-toggle-wrapper">
      {!isFeatureToggleContentOpen && (
        <div
          className="feature-toggle-content-opener"
          onClick={toggleContent}
        >
          Gear Icon
        </div>
      )}
      {isFeatureToggleContentOpen && (
        <div className="feature-toggle-container">
          <div className="feature-toggle-header">
            {`Here Is the List of ${config.length} Features`}
            <div
              className="feature-toggle-header-close"
              onClick={toggleContent}
            >
              <img
                alt="logo"
                className="feature-toggle-header-close"
                onClick={toggleContent}
                src={closeSVG}
              />
            </div>
          </div>
          <div className="feature-toggle-content">
            {config.map((feature, featureIndex) => {
              const featureIsChecked = flags[feature.id];
              return (
                <div
                  key={feature.id}
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
      )}
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
};

FeatureFlagPanel.defaultProps = {
  config: [],
  flags: {},
  handleFeatureToggleChange: () => () => {},
  handleOptionValueChange: () => () => {},
}

export default FeatureFlagPanel;
