import React from 'react';
import {
  bool,
  func,
  number,
  shape,
  string,
} from 'prop-types';

const FeatureOptionItem = ({
  checked,
  featureIndex,
  onChange,
  option,
  optionIndex,
}) => {
  return (
    <div className="feature-toggle-content-option">
      <div className="feature-toggle-content-option-container">
        <input
          type="radio"
          name={`option_${featureIndex}`}
          id={`option_${featureIndex}_${optionIndex}`}
          value={option.value}
          checked={checked}
          onChange={onChange}
        />
        <label
          key={option.value}
          className="feature-toggle-content-item-option-item"
          htmlFor={`option_${featureIndex}_${optionIndex}`}
        >
          {option.name}
        </label>
      </div>
    </div>
  );
}

FeatureOptionItem.propTypes = {
  checked: bool,
  featureIndex: number,
  onChange: func,
  option: shape({
    value: string,
    name: string,
  }),
  optionIndex: number,
}

FeatureOptionItem.defaultProps = {
  checked: false,
  featureIndex: -1,
  onChange: () => {},
  option: {
    value: '',
    name: '',
  },
  optionIndex: -1,
}

export default FeatureOptionItem;
