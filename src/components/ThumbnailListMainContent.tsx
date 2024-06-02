import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import ThumbnailListItem from './ThumbnailListItem';
import { Grid, styled } from '@mui/material';
import BreakpointType from '../types/BreakpointType';
import { useMemo } from 'react';

const RatioWrapper = styled('div')(() => ({
  // Assuming a 16:9 aspect ratio
  paddingTop: '27.75%', // 9 / 16 = 0.5625
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

export default function ThumbnailListMainContent(props: ThumbnailListMainContentProps) {
  const { items } = useThumbnailListItemContext();
  console.log('main content rerenders');

  const memoizedItems = useMemo(() => {
    return items.map((item) => (
      <Grid
        key={item.id}
        item
        xs={props.muiBreakpoints.xs}
        sm={props.muiBreakpoints.sm}
        md={props.muiBreakpoints.md}
        lg={props.muiBreakpoints.lg}
        xl={props.muiBreakpoints.xl}
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
  }, [items, props.muiBreakpoints]);

  return (
    <>
      <Grid container spacing={props.spacing}>
        {memoizedItems}
      </Grid>
    </>
  );
}

type ThumbnailListMainContentProps = {
  muiBreakpoints?: BreakpointType;
  spacing: number;
};

ThumbnailListMainContent.defaultProps = {
  spacing: 2,
  muiBreakpoints: { xs: 12, sm: 6, md: 6, lg: 4, xl: 3 },
};
