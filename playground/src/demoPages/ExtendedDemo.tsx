import { useNavigate } from 'react-router-dom';
import useThumbnailList from '../../../src/components/ThumbnailList';
import SelectAllIcon from '@mui/icons-material/SelectAll';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import StopCircleIcon from '@mui/icons-material/StopCircle';

function ExtendedDemo() {
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
  const items = [
    {
      id: '1',
      title: '1 My first entry',
      subTitle: 'My first subtitle',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      name: 'First',
      startDate: Date.now() + 86_400_000,
      isActive: false,
    },
    {
      id: '2f',
      title: '2 My second entry',
      subTitle: 'Another subtitle',
      thumbnailUrl:
        'https://www.creativefabrica.com/wp-content/uploads/2023/04/02/Nature-Background-Graphics-66003217-1-1-580x387.jpg',
      name: 'Second',
      startDate: Date.now() - 86_400_000,
      isActive: true,
    },
  ];

  // adding onClick functions to items. This will make them clickable.
  // Here we use react-router navigate-functions as an example.
  const navigate = useNavigate();
  const itemsWithOnClick = items.map((item) => ({
    ...item,
    onClick: () => navigate(`/items/${item.id}`),
  }));

  // get the list component from the hook passing your item type and items. Also using a custom config for inital list settings.
  const ThumbnailList = useThumbnailList<MyItem>(itemsWithOnClick, {
    sortBy: 'name',
    sortAscending: true,
    tag: 'id',
  });

  return (
    <>
      <ThumbnailList>
        {/* List sub-components can be switched / removed / added as needed */}
        <ThumbnailList.Header>
          <ThumbnailList.Header.SearchField />
          <ThumbnailList.Header.FilterTags
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
          <ThumbnailList.Header.Sort
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
              {
                label: 'Start Date',
                key: 'startDate',
              },
              {
                label: 'Active',
                key: 'isActive',
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

export default ExtendedDemo;
