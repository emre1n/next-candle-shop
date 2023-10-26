'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CupOption from '../CupOption';

import config from '@/config';

interface ItemType {
  id: number;
  attributes: {
    name: string;
    imagePath: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string | null;
          caption: string | null;
          width: number | null;
          height: number | null;
          formats: Record<string, any> | null;
          hash: string;
          ext: string;
          mime: string;
          size: number;
          url: string;
          previewUrl: string | null;
          provider: string;
          provider_metadata: any | null;
          createdAt: string;
          updatedAt: string;
        };
      };
    };
  };
}

interface TProps {
  optionType: string; // @todo - write an enum for cups and fragrances
}

function Options({ optionType }: TProps) {
  const [items, setItems] = useState<ItemType[]>([]);

  // optionType is 'cups' or 'fragrances'
  useEffect(() => {
    // Create a headers object with the Authorization header
    const headers = {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    };
    axios
      .get(`${config.api}/api/${optionType}?populate=*`, { headers })
      .then(response => setItems(response.data.data))
      .catch(error => {
        // @todo - handle error response
      });
  }, [optionType]);

  // @todo - replace 'null' with FragranceOption when available
  const ItemComponent = optionType === 'cups' ? CupOption : null;

  const optionItems = items.map(item =>
    ItemComponent ? (
      <ItemComponent
        key={item.attributes.name}
        name={item.attributes.name}
        imagePath={item.attributes.image.data.attributes.url}
      />
    ) : null
  );

  return <div>{optionItems}</div>;
}

export default Options;
