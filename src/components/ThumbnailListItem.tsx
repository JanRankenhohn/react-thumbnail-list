import { Card, CardActionArea, Stack } from '@mui/material';
import React, { ReactNode } from 'react';
import ThumbnailListItemTitle from './ThumbnailListItemTitle';
import { logDev } from '../utils/logHelper';

const ThumbnailListItem = (props: ThumbnailListItemProps) => {
  logDev('ThumbnailListItems renders');
  return (
    <>
      <Card sx={{ display: 'flex' }}>
        <CardActionArea disabled={!props.onClick} onClick={() => props.onClick(props.id)}>
          <Stack direction="row" width="100%">
            <img src={props.thumbnailUrl} width={'45%'} />
            <Stack direction="row" justifyContent="space-between" width="100%" gap={1}>
              <ThumbnailListItemTitle title={props.title} subTitle={props.subTitle} />
              {props.infoLabel}
            </Stack>
          </Stack>
        </CardActionArea>
      </Card>
    </>
  );
};

export type ThumbnailListItemProps = {
  id: string;
  onClick?: (id: string) => any;
  thumbnailUrl: string;
  title: string;
  subTitle: ReactNode;
  infoLabel: ReactNode;
};

export default React.memo(ThumbnailListItem);
