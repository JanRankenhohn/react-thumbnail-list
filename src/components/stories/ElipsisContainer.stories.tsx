import { Meta, StoryObj } from '@storybook/react';
import EllipsisContainer from '../EllipsisContainer';

const meta = {
  title: 'Internal/EllipsisContainer',
  component: EllipsisContainer,
  args: {
    lineClamp: { xs: 1, sm: 2 },
    children:
      'This is a very long text that should be truncated with an ellipsis when it exceeds the specified number of lines in the container. Let us see how it behaves on different screen sizes.',
  },
} satisfies Meta<typeof EllipsisContainer>;

export default meta;

type Story = StoryObj<typeof EllipsisContainer>;

export const Default: Story = {};
