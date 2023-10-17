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
      <span className="text-info"> Terms and Conditions</span>
    </span>
  );

  return (
    <form className="form-control flex justify-start">
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
              className="absolute hidden md:inline-block text-xs text-neutral-content bg-neutral -right-[200px] top-1/2 -translate-y-1/2 rounded p-[6px]"
            >
              View our Terms and Conditions
            </div>
          ) : null}
        </div>
      </label>
      <button className="btn btn-primary" disabled={!tcChecked}>
        Confirm order
      </button>
    </form>
  );
}

export default SummaryForm;
