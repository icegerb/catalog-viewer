import React from 'react';
import { IImage } from '@/types/image';
import Image from 'next/image';

interface IThumbs {
  images: IImage[];
  setSelectedImage: (image: IImage) => void;
}
const Thumbs = ({ images, setSelectedImage }: IThumbs) => {
  return (
    <>
      {images.map((image, index) => (
        <div key={image.url} className='relative'>
          <button
            className='absolute hover:border-solid hover:border-gray-500 hover:border-2 w-[80px] h-[75px] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'
            onClick={() => setSelectedImage(image)}
            data-testid={`thumb-button-${index}`}
          ></button>
          <div className='w-16 h-16'>
            <Image
              src={image.url}
              alt={image.name}
              width={100}
              height={100}
              className='w-full h-full object-cover object-center'
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default Thumbs;
