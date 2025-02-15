import React from 'react';
import { IImage } from '@/types/image';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import CatalogViewer from './CatalogViewer';

const mockImages: IImage[] = [
  { name: 'candle holder 1', url: '/images/1.jpeg' },
  { name: 'candle holder 2', url: '/images/2.jpeg' },
  { name: 'candle holder 3', url: '/images/3.jpeg' },
  { name: 'candle holder 4', url: '/images/4.jpeg' },
];

describe('CatalogViewer component', () => {
  beforeEach(() => {
    render(<CatalogViewer />);
  });

  it('renders all elements in CatalogViewer', () => {
    expect(
      screen.getByAltText(`image-${mockImages[0].name}`)
    ).toBeInTheDocument();
    expect(screen.getByTestId('next-slide-btn')).toBeInTheDocument();
    expect(screen.getByTestId('prev-slide-btn')).toBeInTheDocument();
    expect(screen.getByTestId('slide-show-checkbox')).toBeInTheDocument();
  });

  it('should navigate images when next and prev buttons are selected', () => {
    const prevBtn = screen.getByTestId('prev-slide-btn');
    const nextBtn = screen.getByTestId('next-slide-btn');

    fireEvent.click(nextBtn);
    expect(screen.getByAltText('candle holder 2')).toBeInTheDocument();

    fireEvent.click(prevBtn);
    expect(screen.getByAltText('candle holder 1')).toBeInTheDocument();
  });

  it('should toggle the image slide show when checkbox is checked', async () => {
    const checkbox = screen.getByTestId('slide-show-checkbox');
    expect(checkbox).not.toBeChecked();
    fireEvent.click(checkbox);
    expect(checkbox).toBeChecked();
    await waitFor(
      () => expect(screen.getByAltText('candle holder 2')).toBeInTheDocument(),
      { timeout: 3500 }
    );
  });
});
