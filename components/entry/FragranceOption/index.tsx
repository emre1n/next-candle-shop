import Image from 'next/image';
import React, { ChangeEvent } from 'react';
import config from '@/config';
import { useOrderDetails } from '@/contexts/OrderDetails';

interface TProps {
  name: string;
  imagePath: string;
  description: string;
  price: number;
}

function FragranceOption({ name, description, price, imagePath }: TProps) {
  const { updateItemCount } = useOrderDetails();

  const imageProps = {
    source: `${config.api}${imagePath}`,
    alt: `${name} fragrance`,
  };

  const handleRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
    updateItemCount(name, e.target.checked ? 1 : 0, 'fragrances');
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
          <h2 className="card-title">
            <label
              className="cursor-pointer"
              htmlFor={`${name}-fragrances-checkbox`}
            >
              {name}
            </label>
          </h2>
          <p>{description}</p>
          <div className="card-actions justify-between">
            <input
              type="checkbox"
              name="checkbox"
              id={`${name}-fragrances-checkbox`}
              className="checkbox checkbox-primary"
              onChange={handleRadioChange}
            />
            <div className="text-xl font-semibold text-primary-500">
              ${price.toFixed(2)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FragranceOption;
