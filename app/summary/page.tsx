import OrderSummary from '@/components/summary/OrderSummary';
import SummaryForm from '@/components/summary/SummaryForm';
import React from 'react';

function SummaryPage() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen">
      <OrderSummary />
    </div>
  );
}

export default SummaryPage;
