import React from 'react';

import Options from '@/components/entry/Options';
import OrderEntry from '@/components/entry/OrderEntry';

const EntryPage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <OrderEntry />
    </div>
  );
};

export default EntryPage;
