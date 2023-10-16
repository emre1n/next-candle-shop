'use client';

import React, { useState } from 'react';

function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const display = isHovered ? 'inline-block' : 'none';

  const checkboxLabel = (
    <span>
      I agree to
      <span className="text-info-content"> Terms and Conditions</span>
    </span>
  );

  return (
    <div>
      <div className="form-control w-full flex justify-start">
        <label className="relative label cursor-pointer gap-2">
          <input
            type="checkbox"
            className="checkbox"
            onChange={e => setTcChecked(e.target.checked)}
          />

          <div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="label-text"
          >
            {checkboxLabel}
            {isHovered ? (
              <div
                role="tooltip"
                className="absolute text-sm text-base-100 bg-primary-content -right-[240px] top-0"
                style={{ display: 'inline-block' }}
              >
                View our Terms and Conditions
              </div>
            ) : null}
          </div>
        </label>
        <button className="btn btn-primary" disabled={!tcChecked}>
          Confirm order
        </button>
      </div>
    </div>
  );
}

export default SummaryForm;
