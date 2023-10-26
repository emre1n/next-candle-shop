import Image from 'next/image';
import React from 'react';

import config from '@/config';

interface TProps {
  name: string;
  imagePath: string;
  description: string;
}

function CupOption({ name, description, imagePath }: TProps) {
  const imageProps = {
    source: `${config.api}${imagePath}`,
    alt: `${name} cup`,
  };

  return (
    <div>
      <div className="card card-compact w-48 bg-base-100 shadow-xl">
        <figure>
          <Image
            src={imageProps.source}
            width={500}
            height={500}
            alt={imageProps.alt}
          />
        </figure>
        <div className="card-body">
          <p>{description}</p>
          <h2 className="card-title">
            <input
              type="radio"
              name="radio"
              id={`id-${name}`}
              className="radio radio-primary"
            />
            <label htmlFor={`id-${name}`}>{name}</label>
          </h2>
          <div className="card-actions justify-end"></div>
        </div>
      </div>
    </div>
  );
}

export default CupOption;
