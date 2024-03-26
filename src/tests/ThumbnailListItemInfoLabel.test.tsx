import React from 'react';
import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import ThumbnailListItemInfoLabel from '../components/ThumbnailListItemInfoLabel';

// Note: Make sure to adjust the path based on the actual structure of your project

describe('ThumbnailListItemInfoLabel', () => {
  it('renders ThumbnailListItemInfoLabel with correct content', () => {
    const topContent = <span data-testid="top-content">Top Content</span>;
    const bottomContent = <span data-testid="bottom-content">Bottom Content</span>;

    render(
        <ThumbnailListItemInfoLabel topContent={topContent} bottomContent={bottomContent} />,
    );

    // Assertions
    expect(screen.getByTestId('top-content')).toBeInTheDocument();
    expect(screen.getByTestId('bottom-content')).toBeInTheDocument();
  });
});
