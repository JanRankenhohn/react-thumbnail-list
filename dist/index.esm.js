import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { styled, Box, Typography, Card, CardActionArea, Stack as Stack$1, Grid, LinearProgress, FormControl, TextField, InputAdornment, IconButton, useTheme, useMediaQuery, Chip, Tooltip, InputLabel, Select, MenuItem, Menu } from '@mui/material';
import React, { createContext, useContext, useMemo, useState, useCallback, useEffect, Children } from 'react';
import { Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import { debounce } from 'lodash';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SortIcon from '@mui/icons-material/Sort';

const ThumbnailListItemContext = /*#__PURE__*/createContext(undefined);
const useThumbnailListItemContext = () => {
  const context = useContext(ThumbnailListItemContext);
  if (!context) {
    throw new Error('no context provider available');
  }
  return context;
};

/**
 * Creates a ellipies text with webkit css styles
 * @param props lineClamp: lines till ellipses
 * @returns component
 */
function EllipsisContainer(props) {
  const EllipsisContainer = styled('div')(p => ({
    [p.theme.breakpoints.up('xs')]: {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: props.lineClamp.xs.toString() /* number of lines to show */,
      WebkitBoxOrient: 'vertical'
    },
    [p.theme.breakpoints.up('sm')]: {
      overflow: 'hidden',
      display: '-webkit-box',
      WebkitLineClamp: props.lineClamp.sm.toString() /* number of lines to show */,
      WebkitBoxOrient: 'vertical' /* number of lines to show */
    }
  }));
  return jsx(EllipsisContainer, {
    children: props.children
  });
}

function ThumbnailListItemTitle(props) {
  const StyledCardContent = styled('div')(p => ({
    [p.theme.breakpoints.up('xs')]: {
      padding: p.theme.spacing(1),
      flex: '1 0 auto',
      '&:last-child': {
        paddingBottom: 0
      },
      overflow: 'hidden'
    }
  }));
  console.log('item title rerenders');
  return jsx(Fragment, {
    children: jsx(Box, {
      children: jsxs(StyledCardContent, {
        children: [jsx(EllipsisContainer, {
          lineClamp: {
            xs: 1,
            sm: 2
          },
          children: jsx(Typography, {
            variant: "subtitle2",
            sx: {
              fontWeight: 'bold'
            },
            children: props.title
          })
        }), jsx(Stack, {
          direction: "row",
          gap: 1,
          children: jsx(EllipsisContainer, {
            lineClamp: {
              xs: 1,
              sm: 2
            },
            children: jsx(Typography, {
              variant: "subtitle2",
              sx: {
                fontSize: '0.84rem'
              },
              color: "text.secondary",
              children: props.subTitle
            })
          })
        })]
      })
    })
  });
}

const ThumbnailListItem = props => {
  console.log('ThumbnailListItems renders');
  return jsx(Fragment, {
    children: jsx(Card, {
      sx: {
        display: 'flex'
      },
      children: jsx(CardActionArea, {
        disabled: !props.onClick,
        onClick: () => props.onClick(props.id),
        children: jsxs(Stack$1, {
          direction: "row",
          width: "100%",
          children: [jsx("img", {
            src: props.thumbnailUrl,
            width: '45%'
          }), jsxs(Stack$1, {
            direction: "row",
            justifyContent: "space-between",
            width: "100%",
            gap: 1,
            children: [jsx(ThumbnailListItemTitle, {
              title: props.title,
              subTitle: props.subTitle
            }), props.infoLabel]
          })]
        })
      })
    })
  });
};
var ThumbnailListItem$1 = /*#__PURE__*/React.memo(ThumbnailListItem);

const RatioWrapper = styled('div')(() => ({
  // Assuming a 16:9 aspect ratio
  paddingTop: '27.75%',
  // 9 / 16 = 0.5625
  position: 'relative',
  width: '100%',
  '& > *': {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
}));
function ThumbnailListMainContent(props) {
  const {
    items,
    isLoading
  } = useThumbnailListItemContext();
  console.log('main content rerenders');
  const memoizedItems = useMemo(() => {
    return items.map(item => jsx(Grid, {
      item: true,
      xs: props.muiBreakpoints.xs,
      sm: props.muiBreakpoints.sm,
      md: props.muiBreakpoints.md,
      lg: props.muiBreakpoints.lg,
      xl: props.muiBreakpoints.xl,
      children: jsx(RatioWrapper, {
        children: jsx(ThumbnailListItem$1, {
          id: item.id,
          thumbnailUrl: item.thumbnailUrl,
          title: item.title,
          subTitle: item.subTitle,
          infoLabel: item.label,
          onClick: item.onClick
        })
      })
    }, item.id));
  }, [items, props.muiBreakpoints]);
  return jsxs(Fragment, {
    children: [jsx(Box, {
      sx: {
        mt: 0.75,
        mb: 0.75
      },
      children: jsx(LinearProgress, {
        sx: {
          opacity: isLoading ? 1 : 0
        }
      })
    }), jsx(Grid, {
      container: true,
      spacing: props.spacing,
      children: memoizedItems
    })]
  });
}
ThumbnailListMainContent.defaultProps = {
  spacing: 2,
  muiBreakpoints: {
    xs: 12,
    sm: 6,
    md: 6,
    lg: 4,
    xl: 3
  }
};

/**
 * Generic method that sorts an array of items based on an item key
 * @param values The array that should be sorted
 * @param orderType The key of the entity that the array should be sorted by
 * @returns A new reference of the ordered array
 */
function orderByArray(values, orderType) {
  return [...values].sort((a, b) => {
    const valueA = getComparableValue(a[orderType]);
    const valueB = getComparableValue(b[orderType]);
    return compareValues(valueA, valueB);
  });
}
function getComparableValue(value) {
  if (typeof value === 'number') {
    return value;
  } else {
    return String(value);
  }
}
function compareValues(a, b) {
  if (typeof a === 'string' && typeof b === 'string') {
    return a.localeCompare(b, undefined, {
      sensitivity: 'base'
    });
  } else {
    return a < b ? -1 : a > b ? 1 : 0;
  }
}
function filterByTag(array, tagType, condition) {
  const filteredArray = array.filter(item => {
    const tagValue = item[tagType];
    return condition ? condition(tagValue) : !!tagValue;
  });
  console.log('filter array');
  console.log(filteredArray);
  return [...filteredArray];
}

const useTagFilteredThumbnailListItems = _ref => {
  let {
    allItems,
    initialTag,
    initialCondition
  } = _ref;
  const [tagAndCondition, setTagAndCondition] = useState({
    tag: initialTag,
    condition: initialCondition
  });
  const setTagWithCondition = (t, c) => {
    setTagAndCondition({
      tag: t,
      condition: c
    });
  };
  const tagFilteredItems = useMemo(() => {
    const tagFiltered = tagAndCondition.tag === 'id' ? allItems : filterByTag(allItems, tagAndCondition.tag, tagAndCondition.condition);
    return tagFiltered;
  }, [allItems, tagAndCondition]);
  return {
    tagAndCondition,
    setTagAndCondition,
    tagFilteredItems,
    setTagWithCondition
  };
};

/**
 * Filters a list of event by a search term
 * @param allEvents event list that will be formatted
 * @param initialSearchTerm
 * @returns
 */
const useFilteredThumbnailListItems = function (allItems) {
  let initialSearchTerm = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const filteredItems = useMemo(() => {
    const filtered = [...allItems].filter(item => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    return filtered;
  }, [allItems, searchTerm]);
  return {
    searchTerm,
    setSearchTerm,
    filteredItems
  };
};

const useSortedThumbnailListItems = (allItems, initialSortBy, initialSortAscending) => {
  const [sortBy, setSortBy] = useState(initialSortBy);
  const [sortAscending, setSortAscending] = useState(initialSortAscending);
  const sortedItems = useMemo(() => {
    let sorted = orderByArray(allItems, sortBy);
    if (!sortAscending) {
      sorted = sorted.reverse();
    }
    return sorted;
  }, [allItems, sortBy, sortAscending]);
  return {
    sortBy,
    sortAscending,
    setSortBy,
    setSortAscending,
    sortedItems
  };
};

const defaultConfiguration = {
  sortBy: 'id',
  sortAscending: true,
  tag: 'id'
};

const ThumbnailListSearchField = () => {
  const [input, setInput] = useState('');
  const [showClearIcon, setShowClearIcon] = useState('hidden');
  const {
    setSearchTerm
  } = useThumbnailListItemContext();
  console.log('Searchfield rerenders');
  const handleChange = value => {
    setInput(value);
    setShowClearIcon(value === '' ? 'hidden' : '');
  };
  const debouncedSetSearchTerm = useCallback(debounce(setSearchTerm, 50), []);
  useEffect(() => {
    debouncedSetSearchTerm(input);
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [input, debouncedSetSearchTerm]);
  return jsx(Box, {
    sx: {
      marginLeft: 'auto'
    },
    children: jsx(FormControl, {
      children: jsx(TextField, {
        fullWidth: true,
        value: input,
        size: "small",
        variant: "outlined",
        onChange: event => handleChange(event.target.value),
        InputProps: {
          startAdornment: jsx(InputAdornment, {
            position: "start",
            children: jsx(SearchIcon, {})
          }),
          endAdornment: jsx(InputAdornment, {
            position: "end",
            children: jsx(IconButton, {
              onClick: () => handleChange(''),
              sx: {
                visibility: showClearIcon,
                padding: 0
              },
              children: jsx(ClearIcon, {})
            })
          })
        }
      })
    })
  });
};
ThumbnailListSearchField.defaultProps = {
  align: 'start'
};
var ThumbnailListSearchField$1 = /*#__PURE__*/React.memo(ThumbnailListSearchField);

function ThumbnailListFilterTag(props) {
  var _props$collapseBreakp;
  const theme = useTheme();
  const handleOnClick = value => {
    if (props.onClickCallback) {
      props.onClickCallback(value);
    }
  };
  return jsx(Fragment, {
    children: useMediaQuery(theme.breakpoints.up((_props$collapseBreakp = props.collapseBreakpoint) !== null && _props$collapseBreakp !== void 0 ? _props$collapseBreakp : 0)) || !props.icon ? jsx(Fragment, {
      children: jsx(Chip, {
        label: props.label,
        variant: props.variant,
        onClick: props.onClickCallback ? () => handleOnClick(props.value) : undefined
      })
    }) : jsx(Fragment, {
      children: jsx(Tooltip, {
        title: props.label,
        children: jsx(IconButton, {
          onClick: props.onClickCallback ? () => handleOnClick(props.value) : undefined,
          children: props.icon
        })
      })
    })
  });
}

function ThumbnailListFilterTags(props) {
  const {
    tagFilterCallback,
    tagAndCondition
  } = useThumbnailListItemContext();
  console.log('filter tags rerenders');
  return jsx(Fragment, {
    children: props.tags.map((tag, index) => {
      return jsx(ThumbnailListFilterTag, {
        label: tag.label,
        value: tag.key.toString(),
        variant: tagAndCondition.tag === tag.key ? 'filled' : 'outlined',
        collapseBreakpoint: props.muiCollapseBreakpoint,
        onClickCallback: value => tagFilterCallback({
          tag: value,
          condition: tag.condition
        }),
        icon: tag.icon
      }, "".concat(index, "_").concat(tag.key.toString()));
    })
  });
}
ThumbnailListFilterTags.defaultProps = {
  align: 'start',
  muiCollapseBreakpoint: 'md'
};

/**
 * Displays a generic MUI select dropdown.
 * Optinal collapses to a sort icon at a certain breakpoint
 * @param props.label Select Label
 * @param props.width * Width of the input field
 * @param props.collapseBreakPoint * MUI breakpoint after that the select will collapse to the sort icon
 * @param props.onChangeCallback * Callback function that gets triggered once a item is selected
 * @param props.items * Array of items (name-value-pairs) that will be the select options
 * @returns Drowpdown Input Component
 */
function DropdownInput(props) {
  var _props$defaultValue, _props$collapseBreakp;
  const [value, setValue] = useState((_props$defaultValue = props.defaultValue) !== null && _props$defaultValue !== void 0 ? _props$defaultValue : '');
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleChange = (value, name) => {
    setValue(value);
    setAnchorEl(null);
    props.onChangeCallback(value, name);
  };
  return jsxs(Fragment, {
    children: [useMediaQuery(theme.breakpoints.up((_props$collapseBreakp = props.collapseBreakpoint) !== null && _props$collapseBreakp !== void 0 ? _props$collapseBreakp : 0)) ? jsxs(FormControl, {
      sx: {
        width: props.width,
        textAlign: 'start'
      },
      children: [jsx(InputLabel, {
        size: "small",
        children: props.label
      }), jsx(Select, {
        value: value,
        size: "small",
        label: props.label,
        onChange: event => handleChange(event.target.value, event.target.name),
        children: props.items.map(item => {
          return jsx(MenuItem, {
            value: item.value,
            children: item.name
          }, item.value);
        })
      })]
    }) : jsx(IconButton
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    , {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: event => setAnchorEl(event.currentTarget),
      children: props.icon
    }), jsx(Menu, {
      anchorEl: anchorEl,
      open: Boolean(anchorEl),
      onClose: () => setAnchorEl(null),
      children: props.items.map(item => jsx(MenuItem, {
        onClick: () => handleChange(item.value),
        children: item.name
      }, item.value))
    })]
  });
}

function ThumbnailListHeaderSort(props) {
  const {
    setSortAscending,
    sortAscending,
    setSortBy,
    sortBy
  } = useThumbnailListItemContext();
  console.log('Header sort rerenders');
  return jsx(Fragment, {
    children: jsxs(Box, {
      sx: {
        minWidth: '80px'
      },
      children: [jsx(Tooltip, {
        title: "asc/desc",
        children: jsx(IconButton, {
          onClick: () => setSortAscending(!sortAscending),
          children: jsx(SwapVertIcon, {})
        })
      }), jsx(DropdownInput, {
        width: "130px",
        collapseBreakpoint: props.muiBreakpoint,
        label: 'sort',
        defaultValue: sortBy,
        icon: jsx(Tooltip, {
          title: 'sort',
          children: jsx(SortIcon, {})
        }),
        items: props.items.map(i => {
          return {
            name: i.label,
            value: i.key.toString()
          };
        }),
        onChangeCallback: value => setSortBy(value)
      })]
    })
  });
}
ThumbnailListHeaderSort.defaultProps = {
  align: 'start',
  muiBreakpoint: 'md'
};

const ThumbnailListHeader = function (props) {
  var _props$justifyContent;
  const startAlignedItems = [];
  const endAlignedItems = [];
  // Iterate through each child to categorize them based on their 'align' prop
  Children.forEach(props.children, child => {
    if ( /*#__PURE__*/React.isValidElement(child)) {
      const alignment = child.props.align || 'start';
      if (alignment === 'end') {
        endAlignedItems.push(child);
      } else {
        startAlignedItems.push(child);
      }
    }
  });
  return jsx(Fragment, {
    children: jsxs(Stack$1, {
      direction: "row",
      alignItems: "center",
      justifyContent: (_props$justifyContent = props.justifyContent) !== null && _props$justifyContent !== void 0 ? _props$justifyContent : 'space-between',
      gap: 2,
      children: [jsx(Stack$1, {
        direction: "row",
        alignItems: "center",
        gap: 2,
        justifyContent: "start",
        children: startAlignedItems
      }), endAlignedItems]
    })
  });
};
ThumbnailListHeader.SearchField = ThumbnailListSearchField$1;
ThumbnailListHeader.FilterTags = ThumbnailListFilterTags;
ThumbnailListHeader.Sort = ThumbnailListHeaderSort;

/**
 * Main Component: Renders all sub components
 * Includes ThumbnailList Provider for context data
 * @param props react children, items
 * @returns component
 */
function ThumbnailList(props) {
  const combinedConfig = {
    ...defaultConfiguration,
    ...props.config // This will override the defaults with any props that are not undefined
  };
  const [listItems, setListItems] = useState(props.items);
  const {
    sortedItems,
    setSortBy,
    setSortAscending,
    sortAscending
  } = useSortedThumbnailListItems(listItems, combinedConfig.sortBy.toString(), combinedConfig.sortAscending);
  const {
    tagFilteredItems,
    setTagAndCondition,
    tagAndCondition
  } = useTagFilteredThumbnailListItems({
    allItems: sortedItems,
    initialTag: combinedConfig.tag.toString()
  });
  const {
    setSearchTerm,
    filteredItems
  } = useFilteredThumbnailListItems(tagFilteredItems);
  console.log('Thumbnaillist renders');
  return jsx(Fragment, {
    children: jsx(ThumbnailListItemContext.Provider, {
      value: {
        items: filteredItems,
        setItems: setListItems,
        originalItems: listItems,
        setOriginalItems: setListItems,
        tagFilterCallback: setTagAndCondition,
        tagAndCondition: tagAndCondition,
        setSearchTerm: setSearchTerm,
        setSortAscending: setSortAscending,
        sortAscending: sortAscending,
        setSortBy: setSortBy,
        sortBy: combinedConfig.sortBy.toString(),
        isLoading: false
      },
      children: jsx(Stack$1, {
        direction: "column",
        sx: {
          width: '100%',
          minWidth: '425px'
        },
        children: props.children
      })
    })
  });
}
ThumbnailList.MainContent = ThumbnailListMainContent;
ThumbnailList.Header = ThumbnailListHeader;

export { ThumbnailList };
