import React from 'react';
import { IImage } from '@/types/image';
import Image from 'next/image';

const Viewer = ({ image }: { image: IImage }) => {
  return (
    <div className='px-8' data-testid='catalog-view'>
      <div className='w-[300px] h-[300px] overflow-hidden'>
        <Image
          src={image.url}
          alt={`image-${image.name}`}
          width={500}
          height={500}
          className='w-full h-full object-cover object-center'
          priority
        />
      </div>
    </div>
  );
};

export default Viewer;
