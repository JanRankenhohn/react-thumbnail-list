import { render, screen } from '@testing-library/react';
import EllipsisContainer from '../components/EllipsisContainer';

describe('EllipsisContainer', () => {
  it('renders children', () => {
    render(
      <EllipsisContainer lineClamp={{ xs: 2, sm: 3 }}>
        <div data-testid="child">Hello</div>
      </EllipsisContainer>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
