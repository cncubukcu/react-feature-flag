import React from 'react';

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

export default FeatureOptionItem;
