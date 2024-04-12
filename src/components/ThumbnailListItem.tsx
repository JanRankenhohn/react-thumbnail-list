import { Card, CardActionArea, Stack } from '@mui/material';
import { ReactNode } from 'react';
import ThumbnailListItemTitle from './ThumbnailListItemTitle';
import ThumbnailListItemInfoLabel from './ThumbnailListItemInfoLabel';

const ThumbnailListItem = (props: ThumbnailListItemProps) => {
  // console.log('ThumbnailListItems renders');
  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <CardActionArea disabled={!props.onClick} onClick={() => props.onClick(props.id)}>
          <Stack direction="row" width="100%">
            {/* <ImageCropper width={{ xs: '45%', sm: '45%' }} height={{ xs: '100%', sm: '100%' }}> */}
            <img src={props.thumbnailUrl} width={'45%'} />
            {/* </ImageCropper> */}
            <Stack direction="row" justifyContent="space-between" width="100%" gap={1}>
              {props.children}
            </Stack>
          </Stack>
        </CardActionArea>
      </Card>
    </>
  );
};

ThumbnailListItem.Title = ThumbnailListItemTitle;
ThumbnailListItem.InfoLabel = ThumbnailListItemInfoLabel;

export type ThumbnailListItemProps = {
  id: string;
  onClick?: (id: string) => any;
  thumbnailUrl: string;
  children: ReactNode;
};

export default ThumbnailListItem;
