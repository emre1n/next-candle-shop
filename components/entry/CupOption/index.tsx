import Image from 'next/image';
import React from 'react';

interface TProps {
  name: string;
  imagePath: string;
}

function CupOption({ name, imagePath }: TProps) {
  const imageProps = {
    source: `http://localhost:3030/${imagePath}`,
    alt: `${name} cup`,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4">
      <Image
        src={imageProps.source}
        width={500}
        height={500}
        alt={imageProps.alt}
      ></Image>
    </div>
  );
}

export default CupOption;
