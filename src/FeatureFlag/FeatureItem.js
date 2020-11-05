import React from 'react';

const FeatureItem = ({
  checked,
  feature,
  featureIndex,
  onChange,
}) => {
  return (
    <label
      className="feature-toggle-content-item"
      htmlFor={`featureIndex_${featureIndex}`}
    >
      <input
        type="checkbox"
        name="future-toggle-checkbox"
        id={`featureIndex_${featureIndex}`}
        value={feature.id}
        checked={checked}
        onChange={onChange}
      />
      <div className="feature-toggle-content-item-name">
        {feature.name}
      </div>
    </label>
  )
}

export default FeatureItem;
