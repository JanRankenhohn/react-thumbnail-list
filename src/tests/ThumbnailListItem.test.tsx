import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ThumbnailListItem from '../components/ThumbnailListItem';
import { MemoryRouter } from 'react-router';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Children: {
    ...jest.requireActual('react').Children,
    toArray: jest.fn((children) => (Array.isArray(children) ? children : [children])),
  },
}));
describe('ThumbnailListItem', () => {
  const event = {
    id: '123',
    name: 'Test Event',
    startDateTimeStamp: new Date().getTime() - 10000, // Past timestamp
    endDateTimeStamp: new Date().getTime() + 10000, // Future timestamp
    posterImageUrl: 'https://example.com/poster.jpg',
  };

  it('renders ThumbnailListItem with correct content combined with ThumbnailListItemTitle and ThumbnailListItemInfoLabel', () => {
    render(
      <MemoryRouter>
        <ThumbnailListItem
          id={event.id}
          key={event.id}
          // link={`/eventadmin/${event.id}`}
          thumbnailUrl={event.posterImageUrl}
        >
          <ThumbnailListItem.Title title={event.name}>
            <span data-testid="label_views">label_views</span>
          </ThumbnailListItem.Title>
          <ThumbnailListItem.InfoLabel topContent={<span data-testid="label_live">label_live</span>} />
        </ThumbnailListItem>
        ,
      </MemoryRouter>
    );

    // Assertions
    expect(screen.getByRole('img')).toBeInTheDocument();
    expect(screen.getByText('Test Event')).toBeInTheDocument();
    expect(screen.getByText('label_views')).toBeInTheDocument();
    expect(screen.getByText('label_live')).toBeInTheDocument();
  });
});
