import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, expect } from 'vitest';
import * as mui from '@mui/material';
import ThumbnailListFilterTag from '../components/ThumbnailListFilterTag';

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof mui>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

describe('ThumbnailListFilterTag', () => {
  const useMediaQueryMock = mui.useMediaQuery as unknown as jest.Mock;

  afterEach(() => {
    useMediaQueryMock.mockReset();
  });

  it('renders Chip if no icon', () => {
    useMediaQueryMock.mockReturnValue(false);

    render(<ThumbnailListFilterTag label="Test Label" value="1" variant="outlined" onClickCallback={vi.fn()} />);

    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('renders IconButton if useMediaQuery false and icon exists', () => {
    useMediaQueryMock.mockReturnValue(false);

    render(
      <ThumbnailListFilterTag
        label="Test Label"
        value="1"
        variant="filled"
        icon={<span data-testid="icon">Icon</span>}
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('calls onClickCallback when Chip clicked', () => {
    useMediaQueryMock.mockReturnValue(true);
    const onClick = vi.fn();

    render(<ThumbnailListFilterTag label="Test Label" value="1" variant="outlined" onClickCallback={onClick} />);

    fireEvent.click(screen.getByText('Test Label'));
    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('1');
  });
});
