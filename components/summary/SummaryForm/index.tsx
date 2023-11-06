'use client';

import Link from 'next/link';
import React, { useState } from 'react';

type TOrderPhase = 'inProgress' | 'review' | 'completed';

type TProps = {
  setOrderPhase: (orderPhase: TOrderPhase) => void;
};

function SummaryForm({ setOrderPhase }: TProps) {
  const [tcChecked, setTcChecked] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // The next page will handle submitting order from context
    setOrderPhase('completed');
  }

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const checkboxLabel = (
    <span>
      I agree to
      <span className="text-info"> Terms and Conditions</span>
    </span>
  );

  return (
    <form onSubmit={handleSubmit} className="form-control flex justify-start">
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
