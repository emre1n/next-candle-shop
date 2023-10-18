'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CupOption from '../CupOption';

interface ItemType {
  name: string;
  imagePath: string;
}

interface TProps {
  optionType: string; // @todo - write an enum for cups and fragrances
}

function Options({ optionType }: TProps) {
  const [items, setItems] = useState<ItemType[]>([]);

  // optionType is 'cups' or 'fragrances'
  useEffect(() => {
    axios
      .get(`http://localhost:3030/${optionType}`)
      .then(response => setItems(response.data))
      .catch(error => {
        // @todo - handle error response
      });
  }, [optionType]);

  // @todo - replace 'null' with FragranceOption when available
  const ItemComponent = optionType === 'cups' ? CupOption : null;

  const optionItems = items.map(item =>
    ItemComponent ? (
      <ItemComponent
        key={item.name}
        name={item.name}
        imagePath={item.imagePath}
      />
    ) : null
  );

  return <div>{optionItems}</div>;
}

export default Options;
