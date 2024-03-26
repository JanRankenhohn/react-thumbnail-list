import { Box, IconButton, Tooltip } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SortIcon from '@mui/icons-material/Sort';
import DropdownInput from './DropdownInput';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import { ThumbnailListItemSortType } from '../types/ThumbnailListItemSortType copy';

const ThumbnailListHeaderSort = (props: ThumbnailListFilterTagProps) => {
  const { setSortAscending, sortAscending, setSortBy } = useThumbnailListItemContext();
  console.log('Header sort rerenders');
  return (
    <>
      <Box sx={{ minWidth: '80px' }}>
        <Tooltip title="asc/desc">
          <IconButton onClick={() => setSortAscending(!sortAscending)}>
            <SwapVertIcon />
          </IconButton>
        </Tooltip>
        <DropdownInput
          width="130px"
          collapseBreakpoint="md"
          label={'sort'}
          defaultValue="creationTimeStamp"
          icon={
            <Tooltip title={'sort'}>
              <SortIcon />
            </Tooltip>
          }
          items={props.items}
          onChangeCallback={(value: string) => setSortBy(value)}
        />
      </Box>
    </>
  );
};

type ThumbnailListFilterTagProps = {
  items: ThumbnailListItemSortType[];
  align: AlignType;
};

ThumbnailListHeaderSort.defaultProps = {
  align: 'start',
};

export default ThumbnailListHeaderSort;
