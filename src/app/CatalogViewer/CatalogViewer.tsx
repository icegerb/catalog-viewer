'use client';

import React, { useEffect, useState } from 'react';
import { IImage } from '@/types/image';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import Viewer from './Viewer';
import Thumbs from './Thumbs';
import IconButton from '../components/IconButton';

const images: IImage[] = [
  {
    name: 'candle holder 1',
    url: '/images/1.jpeg',
  },
  {
    name: 'candle holder 2',
    url: '/images/2.jpeg',
  },
  {
    name: 'candle holder 3',
    url: '/images/3.jpeg',
  },
  {
    name: 'candle holder 4',
    url: '/images/4.jpeg',
  },
];

const CatalogViewer = () => {
  const [isChecked, setIsChecked] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<IImage>(images[0]);

  const slideNavigation = (direction: 'prev' | 'next') => {
    if (!images || images.length === 0) return;

    setSelectedImage((prev) => {
      const currentIndex = images.indexOf(prev);

      const newIndex =
        direction === 'next'
          ? (currentIndex + 1) % images.length
          : (currentIndex - 1 + images.length) % images.length;
      return images[newIndex];
    });
  };

  useEffect(() => {
    if (isChecked) {
      const interval = setInterval(() => slideNavigation('next'), 3000);
      return () => clearInterval(interval);
    }
  }, [isChecked]);

  return (
    <div className='shadow-md pb-4'>
      <h2 className='text-l bg-slate-600 text-green-500 p-2 text-center font-bold'>
        Catalog Viewer
      </h2>
      <div className='shadow-md mx-8 mt-12 mb-4 flex flex-col gap-5 border pt-5 pb-2 px-2'>
        <Viewer image={selectedImage} />
        <div className='flex justify-between items-center'>
          <IconButton
            icon={<FaArrowLeft />}
            onClick={() => slideNavigation('prev')}
            dataTestId={'prev-slide-btn'}
          />
          <Thumbs images={images} setSelectedImage={setSelectedImage} />
          <IconButton
            icon={<FaArrowRight />}
            onClick={() => slideNavigation('next')}
            dataTestId={'next-slide-btn'}
          />
        </div>
      </div>

      <form className='flex justify-center gap-2'>
        <input
          type='checkbox'
          id='slideShow'
          name='slideShow'
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
          data-testid='slide-show-checkbox'
        />
        <label htmlFor='slideShow'>Start Slide Show</label>
      </form>
    </div>
  );
};

export default CatalogViewer;
