import React from 'react';

import Options from '@/components/entry/Options';

const EntryPage = () => {
  return (
    <div className="flex flex-col gap-8 p-8">
      <Options optionType="cups" />
      <Options optionType="fragrances" />
    </div>
  );
};

export default EntryPage;
