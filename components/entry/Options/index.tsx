'use client';

import { ItemType } from '@/libs/models/item.model';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CupOption from '../CupOption';

import config from '@/config';
import FragranceOption from '../FragranceOption';

import AlertBanner from '@/components/common/AlertBanner';

interface TProps {
  optionType: string; // @todo - write an enum for cups and fragrances
}

function Options({ optionType }: TProps) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [error, setError] = useState(false);

  // optionType is 'cups' or 'fragrances'
  useEffect(() => {
    // Create a headers object with the Authorization header
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    };
    axios
      .get(`${config.api}/api/${optionType}?populate=*`, { headers })
      .then(response => setItems(response.data.data))
      .catch(error => setError(true));
  }, [optionType]);

  if (error) {
    return <AlertBanner message={''} variant={'alert-error'} />;
  }

  // @todo - replace 'null' with FragranceOption when available
  const ItemComponent = optionType === 'cups' ? CupOption : FragranceOption;

  const optionItems = items.map(item =>
    ItemComponent ? (
      <ItemComponent
        key={item.attributes.name}
        name={item.attributes.name}
        description={item.attributes.description}
        imagePath={item.attributes.image.data.attributes.url}
      />
    ) : null
  );

  return (
    <div className="flex flex-col flex-wrap gap-8 sm:flex-row items-center justify-start p-8">
      {optionItems}
    </div>
  );
}

export default Options;
