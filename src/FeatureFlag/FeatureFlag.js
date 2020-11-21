/* eslint-disable react/no-unused-state */
import React, { createContext, useContext, PureComponent } from 'react';
import { arrayOf, bool, shape, string } from 'prop-types';
import FeatureFlagPanel from './FeatureFlagPanel';

const FeatureFlagContext = createContext({
  config: {},
  getFeatureFlag: () => { },
  flags: {},
});

export let getFeatureFlag = (key) => {
  console.error('Feature Flag Provider has not initialize yet!');
}

export const useFeatureFlag = (key) => {
  const context = useContext(FeatureFlagContext);
  if (!context) {
    throw new Error('FeatureFlagContext must be used with FeatureFlagProvider!');
  }

  const { getFeatureFlag } = context;

  return getFeatureFlag(key);
};

export class FeatureFlagProvider extends PureComponent {
  static getDerivedStateFromProps(nextProps, prevState) {
    const updates = {};
    const {
      config,
    } = prevState;

    if (nextProps.config !== config) {
      updates.config = nextProps.config;
    }

    return updates;
  }

  constructor(props) {
    super(props);
    this.state = {
      config: props.config,
      flags: props.config.map(feature => ({
        key: feature.id,
        value: localStorage.getItem(feature.id) || feature.defaultValue || false,
      }))
        .reduce((acc, currentFeature) => {
          acc[currentFeature.key] = currentFeature.value;
          return acc;
        }, {}),
      getFeatureFlag: this.getFeatureFlag,
    };

    getFeatureFlag = this.getFeatureFlag;
  }

  handleFeatureToggleChange = (id) => (e) => {
    const isChecked = e.currentTarget.checked;

    if (isChecked) {
      const feature = this.state.config.find(feat => feat.id === id);
      const featureValue = feature.options ? feature.options[0].value : true;

      localStorage.setItem(id, featureValue);

      this.setState({
        flags: {
          ...this.state.flags,
          [id]: featureValue,
        }
      });
    } else {
      localStorage.removeItem(id);
      this.setState({
        flags: {
          ...this.state.flags,
          [id]: false,
        }
      })
    }
  };

  handleOptionValueChange = (id) => (value) => (e) => {
    localStorage.setItem(id, value);

    this.setState({
      flags: {
        ...this.state.flags,
        [id]: value,
      },
    });
  };

  _getFeatureFlag = key => {
    if (this.state.flags[key] === undefined) {
      console.error(`You should add ${key} to your config Object`);
    }
    return this.state.flags[key];
  }

  getFeatureFlag = (key) => {
    if (Array.isArray(key)) return key.map(k => this._getFeatureFlag(k));

    return this._getFeatureFlag(key);
  }

  render() {
    const { children, isPanelOpen } = this.props;
    return (
      <FeatureFlagContext.Provider value={this.state}>
        {children}
        {isPanelOpen && (
          <FeatureFlagPanel
            config={this.state.config}
            flags={this.state.flags}
            handleFeatureToggleChange={this.handleFeatureToggleChange}
            handleOptionValueChange={this.handleOptionValueChange}
          />
        )}
      </FeatureFlagContext.Provider>
    );
  }
}

FeatureFlagProvider.propTypes = {
  config: arrayOf(shape({
    name: string.isRequired,
    id: string.isRequired,
    options: arrayOf(shape({
      name: string,
      value: string,
    }))
  })),
  isPanelOpen: bool,
};

FeatureFlagProvider.defaultProps = {
  config: [],
  isPanelOpen: true,
};
