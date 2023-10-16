'use client';

import React, { useState } from 'react';

function SummaryForm() {
  const [tcChecked, setTcChecked] = useState(false);

  const checkboxLabel = (
    <span>
      I agree to
      <span className="text-info-content"> Terms and Conditions</span>
    </span>
  );

  return (
    <div>
      <div className="form-control w-full flex justify-start">
        <label className="label cursor-pointer gap-2">
          <input
            type="checkbox"
            className="checkbox"
            onChange={e => setTcChecked(e.target.checked)}
          />
          <div className="label-text">{checkboxLabel}</div>
        </label>
        <button className="btn btn-primary" disabled={!tcChecked}>
          Confirm order
        </button>
      </div>
    </div>
  );
}

export default SummaryForm;
