import useThumbnailList from '../../../src/components/ThumbnailList';

// Demo Type
type MyItem = {
  // these 4 fields are required
  id: string;
  title: string;
  subTitle: string;
  thumbnailUrl: string;
};

// Demo Data
const items = [
  {
    id: '1',
    title: '1 My first entry',
    subTitle: 'My first subtitle',
    thumbnailUrl:
      'https://media.istockphoto.com/id/1456795251/de/foto/steinherz-in-glitzerndem-flie%C3%9Fendem-wasser.jpg?s=1024x1024&w=is&k=20&c=u5XRhbTe_XEfuGPJJy3kBLXuF41OZvTP0ERVzra1l9o=',
  },
  {
    id: '2f',
    title: '2 My second entry',
    subTitle: 'Another subtitle',
    thumbnailUrl:
      'https://media.istockphoto.com/id/1317323736/de/foto/blick-in-die-b%C3%A4ume-richtung-himmel.jpg?s=1024x1024&w=is&k=20&c=Jjq7lH60lly7z6sI0l4KcOJ-L6JiWKY5o57EEe5d0N4=',
  },
];

function SimpleDemo() {
  // get the list component from the hook passing your item type and items
  const ThumbnailList = useThumbnailList<MyItem>(items);

  return (
    <>
      <ThumbnailList>
        {/* List sub-components can be switched / removed / added as needed */}
        <ThumbnailList.Header>
          <ThumbnailList.Header.SearchField />
          <ThumbnailList.Header.FilterTags tags={[{ key: 'id', label: 'all' }]} />
          <ThumbnailList.Header.Sort
            // sort dropdown entries
            items={[
              {
                label: 'Title', // label of the sort dropdown
                key: 'title', // key name of MyItem for sorting
              },
              {
                label: 'Sub Title',
                key: 'subTitle',
              },
            ]}
          />
        </ThumbnailList.Header>
        <ThumbnailList.MainContent />
      </ThumbnailList>
    </>
  );
}

export default SimpleDemo;
