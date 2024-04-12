import { useNavigate } from 'react-router-dom';
import useThumbnailList from '../../src/components/ThumbnailList';
import './App.css';

function ListDemo() {
  const navigate = useNavigate();
  const items = [
    {
      id: '1d',
      name: 'A',
      title: 'A',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      isScheduled: true,
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      onClick: (item: MyItem) => navigate(`/${item.id}`),
      link: `/eventadmin/sd`,
    },
    {
      id: '2f',
      name: 'B',
      title: 'Mein asddd tolles Event',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      isScheduled: true,
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '3g',
      name: 'C',
      title: 'Me!',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      isScheduled: true,
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '41',
      name: '!',
      title: 'Mein neues121212',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '1h',
      title: 'Mein neues tolles Event',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '2j',
      title: 'Mein asddd tolles Event',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '3k',
      title: 'Mein neughghjes ghjgh llll',
      subTitle: '!!Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '41s',
      title: 'Mein neues121212',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '128',
      title: 'Mein neues tolles Event',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '23',
      title: 'Mein asddd tolles Event',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '32',
      title: 'Mein neughghjes ghjgh llll',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '414',
      title: 'Mein neues121212',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '1222',
      title: 'Mein neues tolles Event',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '25',
      title: 'Mein asddd tolles Event',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '35',
      title: 'Mein neughghjes ghjgh lll stimestl',
      subTitle: 'Subtitle für mein tollses EVent',
      label: 'sd',
      startDateTimeStamp: 1212,
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
    {
      id: '415',
      title: 'Mein neues121212 timest',
      subTitle: 'Subtitle für mein tollses EVent',
      startDateTimeStamp: 1212,
      label: 'sd',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      link: `/eventadmin/sd`,
    },
  ];

  const ThumbnailList = useThumbnailList<MyItem>(items);

  return (
    <>
      <div style={{ width: '100%' }}>
        <ThumbnailList>
          <ThumbnailList.Header>
            <ThumbnailList.Header.SearchField />
            <ThumbnailList.Header.FilterTags
              tags={[
                { value: 'id', label: 'all' },
                { value: 'isScheduled', label: 'scheduled' },
                {
                  value: 'isScheduled',
                  condition: (timeStamp: number) => timeStamp > 345,
                  label: 'passed',
                },
              ]}
              collapseBreakpoint="md"
            />
            <ThumbnailList.Header.Sort
              items={[
                {
                  name: 'Name',
                  value: 'name',
                },
                {
                  name: 'Scheduled',
                  value: 'isScheduled',
                },
                {
                  name: 'Some',
                  value: 'something',
                },
              ]}
              align="end"
            />
          </ThumbnailList.Header>
          <ThumbnailList.MainContent grid={{ xs: 12, sm: 6, md: 6, lg: 4, xl: 3 }} />
        </ThumbnailList>
      </div>
    </>
  );
}

interface MyItem {
  id: string;
  name?: string;
  title: string;
  something?: string;
  subTitle: string;
  label: string;
  isScheduled?: boolean;
  thumbnailUrl: string;
  link: string;
}

export default ListDemo;

// import './App.css';
// import {HelloWorld} from 'react-thumbnail-list';

// function App() {
//   return (
//     <div className="App">
//       <HelloWorld />
//     </div>
//   );
// }
