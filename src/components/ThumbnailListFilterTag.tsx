import { Breakpoint, Chip, IconButton, Tooltip, useMediaQuery, useTheme } from '@mui/material';
import { ReactNode } from 'react';

/**
 * Individual filter tag component that displays as either a chip or icon button.
 * Automatically collapses to icon-only view on smaller screens if an icon is provided.
 * 
 * @param {ThumbnailListFilterTagProps} props - Component props
 * @param {string} props.label - Display text for the tag
 * @param {string} props.value - Value passed to the callback when clicked
 * @param {'filled' | 'outlined'} props.variant - Visual style of the chip (filled for active, outlined for inactive)
 * @param {Breakpoint} [props.collapseBreakpoint] - Screen size below which the chip shows as an icon
 * @param {ReactNode} [props.icon] - Optional icon to display in collapsed mode
 * @param {function} [props.onClickCallback] - Callback function triggered when tag is clicked
 * @returns {JSX.Element} The rendered filter tag as a Chip or IconButton
 */
export default function ThumbnailListFilterTag(props: ThumbnailListFilterTagProps) {
  const theme = useTheme();
  const handleOnClick = (value: string) => {
    if (props.onClickCallback) {
      props.onClickCallback(value);
    }
  };

  return (
    <>
      {useMediaQuery(theme.breakpoints.up(props.collapseBreakpoint ?? 0)) || !props.icon ? (
        <>
          <Chip
            label={props.label}
            variant={props.variant}
            onClick={props.onClickCallback ? () => handleOnClick(props.value) : undefined}
          />
        </>
      ) : (
        <>
          <Tooltip title={props.label}>
            <IconButton onClick={props.onClickCallback ? () => handleOnClick(props.value) : undefined}>
              {props.icon}
            </IconButton>
          </Tooltip>
        </>
      )}
    </>
  );
}

type ThumbnailListFilterTagProps = {
  collapseBreakpoint?: Breakpoint;
  label: string;
  value: string;
  variant: 'filled' | 'outlined';
  icon?: ReactNode;
  onClickCallback?: (value: string) => void;
};
