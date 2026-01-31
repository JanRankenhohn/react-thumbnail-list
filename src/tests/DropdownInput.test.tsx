import { render, screen, fireEvent } from '@testing-library/react';
import { vi, describe, it, beforeEach, expect } from 'vitest';
import * as mui from '@mui/material';
import DropdownInput from '../components/DropdownInput';

vi.mock('@mui/material', async () => {
  const actual = await vi.importActual<typeof mui>('@mui/material');
  return {
    ...actual,
    useMediaQuery: vi.fn(),
  };
});

describe('DropdownInput', () => {
  const useMediaQueryMock = mui.useMediaQuery as unknown as jest.Mock;

  const items = [
    { name: 'Option 1', value: '1' },
    { name: 'Option 2', value: '2' },
  ];

  const onChangeMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders Select when media query matches (large screen)', () => {
    useMediaQueryMock.mockReturnValue(true); // large screen

    render(<DropdownInput label="Test" width="200px" items={items} onChangeCallback={onChangeMock} />);

    const select = screen.getByRole('combobox');
    expect(select).toBeInTheDocument();
    fireEvent.mouseDown(select);

    items.forEach((item) => expect(screen.getByText(item.name)).toBeInTheDocument());
  });

  it('calls onChangeCallback when selecting a value from Select', () => {
    useMediaQueryMock.mockReturnValue(true); // large screen

    render(<DropdownInput label="Test" width="200px" items={items} onChangeCallback={onChangeMock} />);

    // Step 1: open the select
    const select = screen.getByRole('combobox');
    fireEvent.mouseDown(select);

    // Step 2: click a menu item
    const option2 = screen.getByText('Option 2');
    fireEvent.click(option2);

    // Step 3: assert callback
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(onChangeMock).toHaveBeenCalledWith('2', undefined);
  });

  it('renders IconButton when media query does not match (small screen)', () => {
    useMediaQueryMock.mockReturnValue(false); // small screen

    render(
      <DropdownInput
        label="Test"
        width="200px"
        items={items}
        onChangeCallback={onChangeMock}
        icon={<span data-testid="icon">Icon</span>}
      />
    );

    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
