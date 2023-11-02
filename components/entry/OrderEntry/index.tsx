'use client';

import React from 'react';
import Options from '../Options';
import { useOrderDetails } from '@/contexts/OrderDetails';
import { formatCurrency } from '@/utils';

function OrderEntry() {
  const { totals } = useOrderDetails();

  return (
    <>
      <h1 className="text-2xl">Make your own candle!</h1>
      <Options optionType="cups" />
      <Options optionType="fragrances" />
      <h2>Grand total: {formatCurrency(totals.cups + totals.fragrances)}</h2>
    </>
  );
}

export default OrderEntry;
