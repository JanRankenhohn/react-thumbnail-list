import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThumbnailListItemTitle from '../components/ThumbnailListItemTitle';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Children: {
    ...jest.requireActual('react').Children,
    toArray: jest.fn((children) => (Array.isArray(children) ? children : [children])),
  },
}));
describe('ThumbnailListItemTitle', () => {
  it('renders ThumbnailListItemTitle with correct content', () => {
    render(
      <ThumbnailListItemTitle title="Test Title">
        <span>Child 1</span>
        <span>Child 2</span>
      </ThumbnailListItemTitle>
    );

    // Assertions
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Child 1')).toBeInTheDocument();
    expect(screen.getByText('Child 2')).toBeInTheDocument();
  });
});
