import React from 'react';
import { IImage } from '@/types/image';
import { render } from '@testing-library/react';
import Viewer from './Viewer';

const mockImage: IImage = {
  name: 'candle holder 1',
  url: '/images/1.jpeg',
};

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

describe('Viewer component', () => {
  let imageElement: HTMLElement;
  let getByAltText: ReturnType<typeof render>['getByAltText'];
  let getByTestId: ReturnType<typeof render>['getByTestId'];

  beforeEach(() => {
    const renderResult = render(<Viewer image={mockImage} />);
    getByAltText = renderResult.getByAltText;
    getByTestId = renderResult.getByTestId;
    imageElement = getByAltText(`image-${mockImage.name}`);
  });

  it('renders the image with correct alt text and source', () => {
    expect(getByTestId('catalog-view')).toBeInTheDocument();
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.getAttribute('src')).toContain(mockImage.url);
    expect(imageElement).toHaveAttribute('alt', `image-${mockImage.name}`);
  });

  it('should have the priority attribute for LCP image', () => {
    expect(imageElement).toHaveAttribute('data-priority', 'true');
  });
});
