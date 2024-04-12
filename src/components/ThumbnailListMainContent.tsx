import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import ThumbnailListItem from './ThumbnailListItem';
import { Grid, styled } from '@mui/material';
import BreakpointType from '../types/BreakpointType';
import React from 'react';

const MemoTitle = React.memo(ThumbnailListItem.Title);
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
  const grid: BreakpointType = props.grid ?? {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };

  return (
    <>
      <Grid container spacing={props.spacing}>
        {items.map((item) => {
          console.log(item);
          return (
            <Grid key={item.id} item xs={grid.xs} sm={grid.sm} md={grid.md} lg={grid.lg} xl={grid.xl}>
              <RatioWrapper>
                <ThumbnailListItem id={item.id} onClick={item.onClick} thumbnailUrl={item.thumbnailUrl}>
                  <MemoTitle title={item.title}>{item.subTitle}</MemoTitle>
                  {item.label}
                </ThumbnailListItem>
              </RatioWrapper>
            </Grid>
          );
        })}
      </Grid>
    </>
  );
}

type ThumbnailListMainContentProps = {
  grid?: BreakpointType;
  spacing: number;
};

ThumbnailListMainContent.defaultProps = {
  spacing: 2,
};
