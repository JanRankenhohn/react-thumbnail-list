import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ThumbnailListItem from '../components/ThumbnailListItem';

describe('ThumbnailListItem', () => {
  const defaultProps = {
    id: '123',
    thumbnailUrl: '/test.jpg',
    title: 'Test Title',
    subTitle: 'Test Subtitle',
    infoLabel: <span>Info</span>,
  };

  it('renders title and subtitle', () => {
    render(<ThumbnailListItem {...defaultProps} />);

    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test Subtitle')).toBeInTheDocument();
  });

  it('renders the thumbnail image', () => {
    render(<ThumbnailListItem {...defaultProps} />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('src', '/test.jpg');
  });

  it('renders info label', () => {
    render(<ThumbnailListItem {...defaultProps} />);

    expect(screen.getByText('Info')).toBeInTheDocument();
  });

  it('calls onClick with id when clicked', () => {
    const onClick = vi.fn();

    render(<ThumbnailListItem {...defaultProps} onClick={onClick} />);

    fireEvent.click(screen.getByRole('button'));

    expect(onClick).toHaveBeenCalledTimes(1);
    expect(onClick).toHaveBeenCalledWith('123');
  });

  it('disables click when onClick is not provided', () => {
    const onClick = vi.fn();
    const { getByRole, rerender } = render(<ThumbnailListItem {...defaultProps} onClick={undefined} />);
    const button = getByRole('button');

    // Clicking should not throw, and nothing should happen
    fireEvent.click(button);

    // Now render with onClick
    rerender(<ThumbnailListItem {...defaultProps} onClick={onClick} />);
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
