'use client';

import React from 'react';
import SummaryForm from '../SummaryForm';

import { useOrderDetails } from '@/contexts/OrderDetails';
import { formatCurrency } from '@/utils';

function OrderSummary() {
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
    <>
      <h1>Order Summary</h1>
      <div>
        {cupList} Cup: {formatCurrency(totals.cups)}
      </div>
      <h2>Fragrances</h2>
      <ul>{fragranceList}</ul>
      <h2>Fragrance Subtotal: {formatCurrency(totals.fragrances)}</h2>
      <SummaryForm />
    </>
  );
}

export default OrderSummary;
