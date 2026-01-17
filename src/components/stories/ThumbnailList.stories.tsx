import { Meta, StoryObj } from '@storybook/react';
import ThumbnailList from '../ThumbnailList';
import ThumbnailListMainContent from '../ThumbnailListMainContent';
import ThumbnailListHeader from '../ThumbnailListHeader';

const items = [
  {
    id: '1',
    title: 'Item 1',
    subTitle: 'This is the subtitle for item 1',
    thumbnailUrl: '/images/1.png',
    category: 'nature',
  },
  {
    id: '2',
    title: 'Item 2',
    subTitle: 'Another subtitle for item 2',
    thumbnailUrl: '/images/2.png',
    category: 'nature',
  },
  {
    id: '3',
    title: 'Item 3',
    subTitle: 'Some other subtitle for item 3',
    thumbnailUrl: '/images/3.png',
    category: 'finance',
  },
  {
    id: '4',
    title: 'Item 4',
    subTitle: 'This is the subtitle for item 3',
    thumbnailUrl: '/images/4.png',
    category: 'finance',
  },
  {
    id: '5',
    title: 'Item 5',
    subTitle: 'This is the subtitle for item 3',
    thumbnailUrl: '/images/5.png',
    category: 'finance',
  },
];

const extendedItems = Array.from({ length: 50 }).flatMap((_, repeatIndex) =>
  items.map((item, itemIndex) => {
    const index = repeatIndex * items.length + itemIndex + 1;

    return {
      ...item,
      id: index.toString(),
      title: `Item ${index}`,
      subTitle: `This is the subtitle for item ${index}`,
    };
  })
);

const meta = {
  title: 'Components/ThumbnailList',
  component: ThumbnailList,
  tags: ['autodocs'],
} satisfies Meta<typeof ThumbnailList>;

export default meta;

type Story = StoryObj<typeof ThumbnailList>;

export const Minimal: Story = {
  render: (args) => (
    <ThumbnailList {...args} items={items}>
      <ThumbnailListMainContent></ThumbnailListMainContent>
    </ThumbnailList>
  ),
};

export const WithSort: Story = {
  render: (args) => (
    <ThumbnailList {...args} items={items}>
      <ThumbnailList.Header>
        <ThumbnailListHeader.Sort
          items={[
            {
              label: 'Title',
              key: 'title',
            },
            {
              label: 'Sub Title',
              key: 'subTitle',
            },
          ]}
          align="end"
          muiBreakpoint="md"
        />
      </ThumbnailList.Header>
      <ThumbnailListMainContent />
    </ThumbnailList>
  ),
};

export const WithFilter: Story = {
  render: (args) => (
    <ThumbnailList {...args} items={items} config={{ sortBy: 'title', sortAscending: true }}>
      <ThumbnailList.Header>
        <ThumbnailList.Header.SearchField />
        <ThumbnailList.Header.FilterTags
          tags={[
            { key: 'id', label: 'all' },
            { key: 'category', label: 'nature', condition: (cat) => cat === 'nature' },
            { key: 'category', label: 'finance', condition: (cat) => cat === 'finance' },
          ]}
        />
      </ThumbnailList.Header>
      <ThumbnailListMainContent />
    </ThumbnailList>
  ),
};

export const FullWithPaging: Story = {
  render: (args) => (
    <ThumbnailList {...args} items={extendedItems}>
      <ThumbnailList.Header>
        <ThumbnailList.Header.SearchField />
        <ThumbnailListHeader.Sort
          items={[
            {
              label: 'Title',
              key: 'title',
            },
            {
              label: 'Sub Title',
              key: 'subTitle',
            },
          ]}
          align="start"
          muiBreakpoint="md"
        />
        <ThumbnailList.Header.FilterTags
          tags={[
            { key: 'id', label: 'all' },
            { key: 'category', label: 'nature', condition: (cat) => cat === 'nature' },
            { key: 'category', label: 'finance', condition: (cat) => cat === 'finance' },
          ]}
        />
      </ThumbnailList.Header>
      <ThumbnailListMainContent />
    </ThumbnailList>
  ),
};
