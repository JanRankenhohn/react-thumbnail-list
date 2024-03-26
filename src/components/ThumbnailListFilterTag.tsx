import {Breakpoint, Chip, IconButton, Tooltip, useMediaQuery, useTheme} from '@mui/material';
import {ReactNode} from 'react';

export default function ThumbnailListFilterTag(props: ThumbnailListFilterTagProps) {
  const theme = useTheme();
  const handleOnClick = (value: string) => {
    if (props.onClickCallback) {
      props.onClickCallback(value);
    }
  };

  return (
    <>
      {useMediaQuery(theme.breakpoints.up(props.collapseBreakpoint ?? 0)) || !props.icon ?
        <>
          <Chip
            label={props.label}
            variant={props.variant}
            onClick={props.onClickCallback ? () => handleOnClick(props.value) : undefined} />
        </> :
        <>
          <Tooltip title={props.label}>
            <IconButton onClick={props.onClickCallback ? () => handleOnClick(props.value) : undefined}>
              {props.icon}
            </IconButton>
          </Tooltip>
        </>
      }
    </>
  );
}

type ThumbnailListFilterTagProps = {
  collapseBreakpoint?: Breakpoint,
  label: string,
  value: string,
  variant: 'filled' | 'outlined',
  icon?: ReactNode,
  onClickCallback?: (value: string) => void,
}
