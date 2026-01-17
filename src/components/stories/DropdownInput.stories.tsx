import { Meta, StoryObj } from '@storybook/react';
import DropdownInput from '../DropdownInput';
import SortIcon from '@mui/icons-material/Sort';
import { fn } from 'storybook/test';

const meta = {
  title: 'Internal/DropdownInput',
  component: DropdownInput,
  args: {
    label: 'My Dropdown',
    width: '200px',
    onChangeCallback: fn(),
    items: [
      { name: 'Option 1', value: 'option1' },
      { name: 'Option 2', value: 'option2' },
      { name: 'Option 3', value: 'option3' },
    ],
  },
} satisfies Meta<typeof DropdownInput>;

export default meta;

type Story = StoryObj<typeof DropdownInput>;

export const Default: Story = {
  args: {
    onChangeCallback: (value) => console.log('Selected:', value),
  },
};

export const Collapsed: Story = {
  render: (args) => <DropdownInput {...args} icon={<SortIcon />} collapseBreakpoint="xl" />,
  parameters: {
    viewPort: {
      defaultViewport: 'mobile1',
    },
  },
};
