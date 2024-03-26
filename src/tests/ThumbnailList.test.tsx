import {render, screen} from '@testing-library/react';
import '@testing-library/jest-dom';
import {MemoryRouter} from 'react-router';
import ThumbnailList from '../ThumbnailList';

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  Children: {
    ...jest.requireActual('react').Children,
    toArray: jest.fn((children) => Array.isArray(children) ? children : [children]),
  },
}));
describe('ThumbnailList', () => {
  it('renders ThumbnailList with correct content combined Header and Main Content', () => {
    render(
        <MemoryRouter>
          <ThumbnailList>
            <ThumbnailList.Header>
              <span data-testid="list-header"></span>
            </ThumbnailList.Header>
            <ThumbnailList.MainContent>
              <span data-testid="list-main"></span>
            </ThumbnailList.MainContent>
          </ThumbnailList>
        </MemoryRouter>,
    );

    // Assertions
    expect(screen.getByTestId('list-header')).toBeInTheDocument();
    expect(screen.getByTestId('list-main')).toBeInTheDocument();
  });
});
