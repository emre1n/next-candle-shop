'use client';

import OrderConfirmation from '@/components/confirmation/OrderConfirmation';
import React, { useState } from 'react';

type TOrderPhase = 'inProgress' | 'review' | 'completed';

function ConfirmationPage() {
  const [orderPhase, setOrderPhase] = useState<TOrderPhase>('inProgress');
  return (
    <>
      <OrderConfirmation setOrderPhase={setOrderPhase} />
    </>
  );
}

export default ConfirmationPage;
