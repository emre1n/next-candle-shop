'use client';

import React from 'react';
import Options from '../Options';
import { useOrderDetails } from '@/contexts/OrderDetails';
import { formatCurrency } from '@/utils';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

type TOrderPhase = 'inProgress' | 'review' | 'completed';

type TProps = {
  setOrderPhase: (orderPhase: TOrderPhase) => void;
};

function OrderEntry({ setOrderPhase }: TProps) {
  const { totals } = useOrderDetails();

  function handleClick() {
    // send to summary page
    setOrderPhase('review');
  }

  return (
    <div className="flex flex-col gap-8 p-8">
      <h1 className="text-2xl">Make your own candle!</h1>
      <Options optionType="cups" />
      <Options optionType="fragrances" />
      <h2>Grand total: {formatCurrency(totals.cups + totals.fragrances)}</h2>

      <button
        onClick={handleClick}
        className="btn btn-active btn-primary md:w-1/4"
      >
        Order Candle
      </button>
    </div>
  );
}

export default OrderEntry;
