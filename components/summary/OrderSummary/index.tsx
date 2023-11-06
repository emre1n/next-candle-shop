'use client';

import React from 'react';
import SummaryForm from '../SummaryForm';

import { useOrderDetails } from '@/contexts/OrderDetails';
import { formatCurrency } from '@/utils';

type TOrderPhase = 'inProgress' | 'review' | 'completed';

type TProps = {
  setOrderPhase: (orderPhase: TOrderPhase) => void;
};

function OrderSummary({ setOrderPhase }: TProps) {
  const { totals, optionCounts } = useOrderDetails();

  // const testObject = {
  //   cups: { Charcoal: 1 }, // example: { Charcoal: 1, Cream: 2 }
  //   fragrances: { Cedar: 1, Cream: 1 }, // example: { Cedar: 1 }
  // };

  const cupArray = Object.entries(optionCounts.cups);
  const cupList = cupArray.map(([key]) => {
    return <span key={key}>{key}</span>;
  });

  const fragranceArray = Object.keys(optionCounts.fragrances);
  const fragranceList = fragranceArray.map(key => <li key={key}>{key}</li>);

  return (
    <div className="flex flex-col gap-4 p-32">
      <h1 className="text-4xl">Order Summary</h1>
      {cupList}
      <h2 className="border-b border-gray-500">
        Cup: {formatCurrency(totals.cups)}
      </h2>
      <div>
        <ul>{fragranceList}</ul>
        <h2 className="border-b border-gray-500">
          Fragrance Subtotal: {formatCurrency(totals.fragrances)}
        </h2>
      </div>

      <strong className="text-2xl">
        Grand Total: {formatCurrency(totals.cups + totals.fragrances)}
      </strong>
      <SummaryForm setOrderPhase={setOrderPhase} />
    </div>
  );
}

export default OrderSummary;
