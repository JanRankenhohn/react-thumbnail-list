import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import ThumbnailListItem from './ThumbnailListItem';
import { Box, Grid, LinearProgress, styled } from '@mui/material';
import BreakpointType from '../types/BreakpointType';
import { useMemo } from 'react';
import { logDev } from '../utils/logHelper';

const RatioWrapper = styled('div')(() => ({
  paddingTop: '27.75%', // responsive card height
  position: 'relative',
  width: '100%',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
}));

export default function ThumbnailListMainContent({
  spacing = 2,
  muiBreakpoints = { xs: 12, sm: 6, md: 6, lg: 4, xl: 3 },
}: ThumbnailListMainContentProps) {
  const { items, isLoading } = useThumbnailListItemContext();
  logDev('main content rerenders');

  const memoizedItems = useMemo(() => {
    return items.map((item) => (
      <Grid
        key={item.id}
        item
        xs={muiBreakpoints.xs}
        sm={muiBreakpoints.sm}
        md={muiBreakpoints.md}
        lg={muiBreakpoints.lg}
        xl={muiBreakpoints.xl}
      >
        <RatioWrapper>
          <ThumbnailListItem
            id={item.id}
            thumbnailUrl={item.thumbnailUrl}
            title={item.title}
            subTitle={item.subTitle}
            infoLabel={item.label}
            onClick={item.onClick}
          ></ThumbnailListItem>
        </RatioWrapper>
      </Grid>
    ));
  }, [items, muiBreakpoints]);

  return (
    <>
      <Box sx={{ mt: 0.75, mb: 0.75 }}>
        <LinearProgress sx={{ opacity: isLoading ? 1 : 0 }} />
      </Box>
      <Grid container spacing={spacing}>
        {memoizedItems}
      </Grid>
    </>
  );
}

type ThumbnailListMainContentProps = {
  muiBreakpoints?: BreakpointType;
  spacing?: number;
};
