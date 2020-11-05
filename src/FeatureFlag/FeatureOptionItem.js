import React from 'react';

const FeatureOptionItem = ({
  checked,
  featureIndex,
  onChange,
  option,
  optionIndex,
}) => {
  return (
    <label
      key={option.value}
      className="feature-toggle-content-item-option-item"
      htmlFor={`option_${featureIndex}_${optionIndex}`}
    >
      <input
        type="radio"
        name={`option_${featureIndex}`}
        id={`option_${featureIndex}_${optionIndex}`}
        value={option.value}
        checked={checked}
        onChange={onChange}
      />
      <div className="feature-toggle-content-item-option-item-name">
        {option.name}
      </div>
    </label>
  );
}

export default FeatureOptionItem;
