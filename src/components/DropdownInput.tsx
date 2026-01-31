import {
  Breakpoint,
  FormControl,
  IconButton,
  InputLabel,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode, useState, MouseEvent } from 'react';

/**
 * Displays a generic MUI select dropdown.
 * Optional collapses to a sort icon at a certain breakpoint
 * @param props.label Select Label
 * @param props.width * Width of the input field
 * @param props.collapseBreakPoint * MUI breakpoint after that the select will collapse to the sort icon
 * @param props.onChangeCallback * Callback function that gets triggered once a item is selected
 * @param props.items * Array of items (name-value-pairs) that will be the select options
 * @returns Dropdown Input Component
 */
export default function DropdownInput(props: DropdownInputProps) {
  const [value, setValue] = useState(props.defaultValue ?? '');
  const theme = useTheme();
  const isAboveBreakpoint = useMediaQuery(theme.breakpoints.up(props.collapseBreakpoint ?? 0));
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleChange = (value: string, name?: string) => {
    setValue(value as string);
    setAnchorEl(null);
    props.onChangeCallback(value, name);
  };

  return (
    <>
      {isAboveBreakpoint ? (
        <FormControl sx={{ width: props.width, textAlign: 'start' }}>
          <InputLabel size="small">{props.label}</InputLabel>
          <Select
            value={value}
            size="small"
            label={props.label}
            onChange={(event: SelectChangeEvent) => handleChange(event.target.value, event.target.name)}
          >
            {props.items.map((item) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.name}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      ) : (
        <IconButton
          onClick={(event: MouseEvent<HTMLButtonElement>) => setAnchorEl(event.currentTarget)}
        >
          {props.icon}
        </IconButton>
      )}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={() => setAnchorEl(null)}>
        {props.items.map((item) => (
          <MenuItem key={item.value} onClick={() => handleChange(item.value)}>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}

type DropdownInputProps = {
  label: string;
  width: string;
  collapseBreakpoint?: Breakpoint;
  defaultValue?: string;
  icon?: ReactNode;
  onChangeCallback: (value: string, name?: string) => void;
  items: Array<{ name: string; value: string }>;
};
