import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import ThumbnailListFilterTags, { ThumbnailListItemTagType } from '../components/ThumbnailListFilterTags';
import * as context from '../components/ThumbnailListItemContext';

describe('ThumbnailListFilterTags', () => {
  const natureCondition = (v: any) => v === 'nature';

  const mockContext = {
    tagFilterCallback: vi.fn(),
    tagAndCondition: { tag: 'category', condition: natureCondition },
    items: [],
    setItems: vi.fn(),
    originalItems: [],
    setOriginalItems: vi.fn(),
    setSearchTerm: vi.fn(),
    setSortAscending: vi.fn(),
    sortAscending: true,
    sortBy: '',
    setSortBy: vi.fn(),
    isLoading: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(context, 'useThumbnailListItemContext').mockReturnValue(mockContext);
  });

  const tags: ThumbnailListItemTagType<any>[] = [
    { key: 'id', label: 'All' },
    { key: 'category', label: 'Nature', condition: natureCondition },
    { key: 'category', label: 'Finance', condition: (v) => v === 'finance' },
  ];

  it('renders all tags', () => {
    render(<ThumbnailListFilterTags tags={tags} muiCollapseBreakpoint="md" align="start" />);

    expect(screen.getByText('All')).toBeInTheDocument();
    expect(screen.getByText('Nature')).toBeInTheDocument();
    expect(screen.getByText('Finance')).toBeInTheDocument();
  });

  it('sets active tag variant correctly', () => {
    render(<ThumbnailListFilterTags tags={tags} muiCollapseBreakpoint="md" align="start" />);

    const natureTag = screen.getByText('Nature');
    const financeTag = screen.getByText('Finance');

    expect(natureTag.closest('div')?.classList).toContain('MuiChip-filled');
    expect(financeTag.closest('div')?.classList).toContain('MuiChip-outlined');
  });

  it('calls tagFilterCallback with correct data when clicked', () => {
    render(<ThumbnailListFilterTags tags={tags} muiCollapseBreakpoint="md" align="start" />);

    const financeTag = screen.getByText('Finance');
    fireEvent.click(financeTag);

    expect(mockContext.tagFilterCallback).toHaveBeenCalledTimes(1);
    expect(mockContext.tagFilterCallback).toHaveBeenCalledWith({
      tag: 'category',
      condition: tags[2].condition,
    });
  });
});
