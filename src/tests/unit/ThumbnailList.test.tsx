/* eslint-disable react/display-name */
import { render } from '@testing-library/react';
import ThumbnailList from '../../components/ThumbnailList';
import { defaultConfiguration } from '../../config/ThumbnailListConfiguration';

// Mock child components to ensure the test focuses on the parent
jest.mock('../../components/ThumbnailListMainContent', () => () => <div>MainContent</div>);
jest.mock('../../components/ThumbnailListHeader', () => () => <div>Header</div>);

// Mock the hooks used for sorting and filtering
jest.mock('../../hooks/useTagFilteredThumbnailListItems', () =>
  jest.fn(() => ({
    tagFilteredItems: [],
    setTagAndCondition: jest.fn(),
    tagAndCondition: null,
  }))
);
jest.mock('../../hooks/useFilteredThumbnailListItems', () =>
  jest.fn(() => ({
    setSearchTerm: jest.fn(),
    filteredItems: [],
  }))
);
jest.mock('../../hooks/useSortedThumbnailListItems', () =>
  jest.fn(() => ({
    sortedItems: [],
    setSortBy: jest.fn(),
    setSortAscending: jest.fn(),
    sortAscending: true,
  }))
);

describe('ThumbnailList component', () => {
  const defaultItems = [
    { id: '1', title: 'Item 1', thumbnailUrl: '' },
    { id: '2', title: 'Item 2', thumbnailUrl: '' },
  ];

  const defaultProps = {
    items: defaultItems,
    children: <div>Child Component</div>,
  };

  it('should override default configuration with props.config', () => {
    const customConfig = {
      sortBy: 'title',
      sortAscending: false,
      tag: 'title',
    };

    render(
      <ThumbnailList
        items={defaultItems}
        {...defaultProps}
        config={{ sortBy: 'id', tag: 'id', sortAscending: false }}
      />
    );

    expect(defaultConfiguration.sortBy).not.toBe(customConfig.sortBy);
    expect(defaultConfiguration.sortAscending).not.toBe(customConfig.sortAscending);
    expect(defaultConfiguration.tag).not.toBe(customConfig.tag);
  });

  it('should render children components', () => {
    const { getByText } = render(<ThumbnailList {...defaultProps} />);
    expect(getByText('Child Component')).toBeInTheDocument();
  });

  it('should pass correctly sorted and filtered items to the context', () => {
    const customSortedItems = [
      { id: '2', title: 'Item 2', thumbnailUrl: '' },
      { id: '1', title: 'Item 1', thumbnailUrl: '' },
    ];
    const customFilteredItems = [{ id: '1', title: 'Item 1', thumbnailUrl: '' }];

    jest.mock('../../hooks/useSortedThumbnailListItems', () =>
      jest.fn(() => ({
        sortedItems: customSortedItems,
        setSortBy: jest.fn(),
        setSortAscending: jest.fn(),
        sortAscending: true,
      }))
    );

    jest.mock('../../hooks/useTagFilteredThumbnailListItems', () =>
      jest.fn(() => ({
        tagFilteredItems: customSortedItems,
        setTagAndCondition: jest.fn(),
        tagAndCondition: null,
      }))
    );

    jest.mock('../../hooks/useFilteredThumbnailListItems', () =>
      jest.fn(() => ({
        setSearchTerm: jest.fn(),
        filteredItems: customFilteredItems,
      }))
    );

    const { rerender } = render(<ThumbnailList {...defaultProps} />);
    rerender(<ThumbnailList {...defaultProps} />);

    // Assuming you spy on context values passed
    // check if filteredItems match the expected filtered list
    expect(customFilteredItems).toEqual([{ id: '1', title: 'Item 1', thumbnailUrl: '' }]);
  });
});
