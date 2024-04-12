import { Box, IconButton, Tooltip } from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SortIcon from '@mui/icons-material/Sort';
import DropdownInput from './DropdownInput';
import { useThumbnailListItemContext } from './ThumbnailListItemContext';

const useThumbnailListHeaderSort = <T,>() => {
  const ThumbnailListHeaderSort = (props: ThumbnailListHeaderSortProps<T>) => {
    const { setSortAscending, sortAscending, setSortBy, sortBy } = useThumbnailListItemContext();
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
            defaultValue={sortBy}
            icon={
              <Tooltip title={'sort'}>
                <SortIcon />
              </Tooltip>
            }
            items={props.items.map((i) => {
              return { name: i.name, value: i.value.toString() };
            })}
            onChangeCallback={(value: string) => setSortBy(value)}
          />
        </Box>
      </>
    );
  };

  ThumbnailListHeaderSort.defaultProps = {
    align: 'start',
  };

  return ThumbnailListHeaderSort;
};

type ThumbnailListHeaderSortProps<T> = {
  items: { name: string; value: keyof T }[];
  align: AlignType;
};

export default useThumbnailListHeaderSort;
