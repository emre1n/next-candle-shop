'use client';

import React, { useState } from 'react';

import OrderEntry from '@/components/entry/OrderEntry';
import OrderSummary from '@/components/summary/OrderSummary';
import OrderConfirmation from '@/components/confirmation/OrderConfirmation';

type TOrderPhase = 'inProgress' | 'review' | 'completed';

function OrderProcess() {
  // orderPhase needs to be 'inProgress', 'review', 'completed'
  const [orderPhase, setOrderPhase] = useState<TOrderPhase>('inProgress');

  let Component = OrderEntry;
  switch (orderPhase) {
    case 'inProgress':
      Component = OrderEntry;
      break;
    case 'review':
      Component = OrderSummary;
      break;
    case 'completed':
      Component = OrderConfirmation;
      break;
    default:
  }

  return (
    <>
      <Component setOrderPhase={setOrderPhase} />
    </>
  );
}

export default OrderProcess;
