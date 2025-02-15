import React from 'react';
import { IImage } from '@/types/image';
import { fireEvent, render } from '@testing-library/react';
import Thumbs from './Thumbs';

const mockImages: IImage[] = [
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

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({
    alt,
    src,
    priority,
  }: {
    alt: string;
    src: string;
    priority?: boolean;
  }) => {
    if (priority) {
      console.log('Priority prop:', priority);
    }
    return (
      <picture>
        <img alt={alt} src={src} data-priority={priority ? 'true' : 'false'} />
      </picture>
    );
  },
}));

describe('Thumbs component', () => {
  let setSelectedImage: jest.Mock;
  let getByAltText: ReturnType<typeof render>['getByAltText'];
  let getByTestId: ReturnType<typeof render>['getByTestId'];

  beforeEach(() => {
    setSelectedImage = jest.fn();
    const renderResult = render(
      <Thumbs images={mockImages} setSelectedImage={setSelectedImage} />
    );
    getByAltText = renderResult.getByAltText;
    getByTestId = renderResult.getByTestId;
  });

  it('should render images and their respective buttons', () => {
    mockImages.forEach((image) => {
      expect(getByAltText(image.name)).toBeInTheDocument();
    });

    mockImages.forEach((_, index) => {
      const element = getByTestId(`thumb-button-${index}`);
      expect(element).toBeInTheDocument();
    });
  });
  it('should call setSelectedImage when a thumbnail button is selected', () => {
    fireEvent.click(getByTestId('thumb-button-0'));
    expect(setSelectedImage).toHaveBeenCalledWith(mockImages[0]);
    expect(setSelectedImage).toHaveBeenCalledTimes(1);
  });
});
