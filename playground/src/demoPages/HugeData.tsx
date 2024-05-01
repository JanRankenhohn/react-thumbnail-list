import { useNavigate } from 'react-router-dom';
import ThumbnailList from '../../../src/components/ThumbnailList';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopCircleIcon from '@mui/icons-material/StopCircle';

function HugeDataDemo() {
  // Demo Type
  type MyItem = {
    // these 4 fields are required
    id: string;
    title: string;
    subTitle: string;
    thumbnailUrl: string;
    // additional custom fields
    name: string;
    startDate: number;
    isActive: boolean;
  };

  // Demo Data
  const items: MyItem[] = [
    {
      id: '1',
      title: 'Test Data',
      subTitle: 'My test subtitle',
      thumbnailUrl:
        'https://media.istockphoto.com/id/1456795251/de/foto/steinherz-in-glitzerndem-flie%C3%9Fendem-wasser.jpg?s=1024x1024&w=is&k=20&c=u5XRhbTe_XEfuGPJJy3kBLXuF41OZvTP0ERVzra1l9o=',
      isActive: true,
      startDate: 100,
      name: 'Test Data',
    },
  ];
  // create 200 list items
  for (let i = 0; i < 200; i++) {
    items.push({
      ...items[0],
      id: (i + 2).toString(),
    });
  }

  // adding onClick functions to items. This will make them clickable.
  // Here we use react-router navigate-functions as an example.
  const navigate = useNavigate();
  const itemsWithOnClick = items.map((item) => ({
    ...item,
    onClick: () => navigate(`/items/${item.id}`),
  }));

  return (
    <>
      {/* Pass items to list with custom config */}
      <ThumbnailList items={itemsWithOnClick} config={{ sortBy: 'title', sortAscending: true, tag: 'id' }}>
        {/* List sub-components can be switched / removed / added as needed */}
        <ThumbnailList.Header>
          <ThumbnailList.Header.SearchField />
          <ThumbnailList.Header.FilterTags<MyItem>
            tags={[
              { key: 'id', label: 'all', icon: <SelectAllIcon /> },
              {
                key: 'isActive',
                label: 'active',
                icon: <AccessTimeIcon />,
              },
              {
                key: 'startDate',
                condition: (t: number) => t > Date.now(), // tag will filter items based on a custom condition, here: startdate > now
                label: 'not started',
                icon: <StopCircleIcon />,
              },
            ]}
            muiCollapseBreakpoint="sm" // Breakpoint where tag icons will be displayed instead of labels
          />
          <ThumbnailList.Header.Sort<MyItem>
            // sort dropdown entries
            items={[
              {
                label: 'Name',
                key: 'name',
              },
              {
                label: 'Title',
                key: 'title',
              },
              {
                label: 'Sub Title',
                key: 'subTitle',
              },
            ]}
            align="end" // right-align sort dropdown
            muiBreakpoint="md" // Breakpoint where sort dropdown will collapse to icon
          />
        </ThumbnailList.Header>
        <ThumbnailList.MainContent />
      </ThumbnailList>
    </>
  );
}

export default HugeDataDemo;
