import { render, screen } from '@testing-library/react';
import ThumbnailListItemTitle from '../components/ThumbnailListItemTitle';

describe('ThumbnailListItemTitle', () => {
  it('renders title and subtitle', () => {
    render(<ThumbnailListItemTitle title="Main title" subTitle="Subtitle text" />);

    expect(screen.getByText('Main title')).toBeInTheDocument();
    expect(screen.getByText('Subtitle text')).toBeInTheDocument();
  });
});
