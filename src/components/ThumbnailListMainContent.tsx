import { useThumbnailListItemContext } from './ThumbnailListItemContext';
import ThumbnailListItem from './ThumbnailListItem';
import { Breakpoint, Grid, styled } from '@mui/material';
import BreakpointType from '../types/BreakpointType';

export default function ThumbnailListMainContent(props: ThumbnailListMainContentProps) {
  // const children = Children.toArray(props.children);
  const { items } = useThumbnailListItemContext();
  const grid: BreakpointType = props.grid ?? {
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
  };
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

  return (
    <>
      {/* {children.map((child, index) => {
        return <Grid key={index} item xs={12} lg={6} xl={3}>
          {child}
        </Grid>;
      })} */}
      <Grid container spacing={props.spacing}>
        {items.map((item) => {
          return (
            <Grid key={item.id} item xs={grid.xs} sm={grid.sm} md={grid.md} lg={grid.lg} xl={grid.xl}>
              <RatioWrapper>
                <ThumbnailListItem
                  id={item.id}
                  // link={item.link}
                  thumbnailUrl={item.thumbnailUrl}
                >
                  <ThumbnailListItem.Title title={item.title}>
                    {/* <DateTimeRangeLabel startDateTimeStamp={event.startDateTimeStamp} endDateTimeStamp={event.endDateTimeStamp}/>
              <>{intl('label_views')}</> */}
                    {item.subTitle}
                  </ThumbnailListItem.Title>
                  {item.label}
                  {/* { /** Conditionally show views / live label
              isTimestampPastNow(event.startDateTimeStamp) &&
                        <ThumbnailListItem.InfoLabel
                          topContent={isCurrentTimeWithinRange(event.startDateTimeStamp, event.endDateTimeStamp) ?
                            <Typography color="success.main" variant='body2'>{intl('label_live')}</Typography> : undefined}
                        />
            } */}
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
