'use client';

import { ItemType } from '@/libs/models/item.model';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CupOption from '../CupOption';

import config from '@/config';
import FragranceOption from '../FragranceOption';

import AlertBanner from '@/components/common/AlertBanner';
import { pricePerItem } from '@/constants';
import { formatCurrency } from '../../../utils/index';

import { useOrderDetails } from '@/contexts/OrderDetails';

interface TProps {
  optionType: string; // @todo - write an enum for cups and fragrances
}

function Options({ optionType }: TProps) {
  const [items, setItems] = useState<ItemType[]>([]);
  const [error, setError] = useState(false);
  const { totals } = useOrderDetails();

  // optionType is 'cups' or 'fragrances'
  useEffect(() => {
    // Create an AbortController to attach to network request
    const controller = new AbortController();
    const signal = controller.signal;
    // Create a headers object with the Authorization header
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    };
    axios
      .get(`${config.api}/api/${optionType}?populate=*`, {
        headers,
        signal,
      })
      .then(response => setItems(response.data.data))
      .catch(error => {
        if (error.name !== 'CanceledError') setError(true);
      });

    // abort axios call on component unmount
    return () => {
      controller.abort();
    };
  }, [optionType]);

  if (error) {
    return <AlertBanner message={''} variant={'alert-error'} />;
  }

  // @todo - replace 'null' with FragranceOption when available
  const ItemComponent = optionType === 'cups' ? CupOption : FragranceOption;

  const title = optionType[0].toUpperCase() + optionType.slice(1).toLowerCase();

  const optionItems = items.map(item =>
    ItemComponent ? (
      <ItemComponent
        key={item.attributes.name}
        name={item.attributes.name}
        description={item.attributes.description}
        price={item.attributes.price}
        imagePath={item.attributes.image.data.attributes.url}
      />
    ) : null
  );
  return (
    <>
      <div>
        <h2>{title}</h2>
        <p>{formatCurrency(pricePerItem[optionType])} each</p>
        <p>
          {title}: {formatCurrency(totals[optionType as keyof typeof totals])}
        </p>
      </div>

      <div className="flex flex-col flex-wrap gap-8 sm:flex-row items-center justify-start">
        {optionItems}
      </div>
    </>
  );
}

export default Options;
