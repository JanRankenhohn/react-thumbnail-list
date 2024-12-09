'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var jsxRuntime = require('react/jsx-runtime');
var material = require('@mui/material');
var React = require('react');
var system = require('@mui/system');
var SearchIcon = require('@mui/icons-material/Search');
var ClearIcon = require('@mui/icons-material/Clear');
var lodash = require('lodash');
var SwapVertIcon = require('@mui/icons-material/SwapVert');
var SortIcon = require('@mui/icons-material/Sort');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var SearchIcon__default = /*#__PURE__*/_interopDefaultLegacy(SearchIcon);
var ClearIcon__default = /*#__PURE__*/_interopDefaultLegacy(ClearIcon);
var SwapVertIcon__default = /*#__PURE__*/_interopDefaultLegacy(SwapVertIcon);
var SortIcon__default = /*#__PURE__*/_interopDefaultLegacy(SortIcon);

const ThumbnailListItemContext = /*#__PURE__*/React.createContext(undefined);
const useThumbnailListItemContext = () => {
  const context = React.useContext(ThumbnailListItemContext);
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
  const EllipsisContainer = material.styled('div')(p => ({
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
  return jsxRuntime.jsx(EllipsisContainer, {
    children: props.children
  });
}

function ThumbnailListItemTitle(props) {
  const StyledCardContent = material.styled('div')(p => ({
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
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: jsxRuntime.jsx(material.Box, {
      children: jsxRuntime.jsxs(StyledCardContent, {
        children: [jsxRuntime.jsx(EllipsisContainer, {
          lineClamp: {
            xs: 1,
            sm: 2
          },
          children: jsxRuntime.jsx(material.Typography, {
            variant: "subtitle2",
            sx: {
              fontWeight: 'bold'
            },
            children: props.title
          })
        }), jsxRuntime.jsx(system.Stack, {
          direction: "row",
          gap: 1,
          children: jsxRuntime.jsx(EllipsisContainer, {
            lineClamp: {
              xs: 1,
              sm: 2
            },
            children: jsxRuntime.jsx(material.Typography, {
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
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: jsxRuntime.jsx(material.Card, {
      sx: {
        display: 'flex'
      },
      children: jsxRuntime.jsx(material.CardActionArea, {
        disabled: !props.onClick,
        onClick: () => props.onClick(props.id),
        children: jsxRuntime.jsxs(material.Stack, {
          direction: "row",
          width: "100%",
          children: [jsxRuntime.jsx("img", {
            src: props.thumbnailUrl,
            width: '45%'
          }), jsxRuntime.jsxs(material.Stack, {
            direction: "row",
            justifyContent: "space-between",
            width: "100%",
            gap: 1,
            children: [jsxRuntime.jsx(ThumbnailListItemTitle, {
              title: props.title,
              subTitle: props.subTitle
            }), props.infoLabel]
          })]
        })
      })
    })
  });
};
var ThumbnailListItem$1 = /*#__PURE__*/React__default["default"].memo(ThumbnailListItem);

const RatioWrapper = material.styled('div')(() => ({
  // Assuming a 16:9 aspect ratio
  paddingTop: '27.75%',
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
  const memoizedItems = React.useMemo(() => {
    return items.map(item => jsxRuntime.jsx(material.Grid, {
      item: true,
      xs: props.muiBreakpoints.xs,
      sm: props.muiBreakpoints.sm,
      md: props.muiBreakpoints.md,
      lg: props.muiBreakpoints.lg,
      xl: props.muiBreakpoints.xl,
      children: jsxRuntime.jsx(RatioWrapper, {
        children: jsxRuntime.jsx(ThumbnailListItem$1, {
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
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [jsxRuntime.jsx(material.Box, {
      sx: {
        mt: 0.75,
        mb: 0.75
      },
      children: jsxRuntime.jsx(material.LinearProgress, {
        sx: {
          opacity: isLoading ? 1 : 0
        }
      })
    }), jsxRuntime.jsx(material.Grid, {
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
  const [tagAndCondition, setTagAndCondition] = React.useState({
    tag: initialTag,
    condition: initialCondition
  });
  const setTagWithCondition = (t, c) => {
    setTagAndCondition({
      tag: t,
      condition: c
    });
  };
  const tagFilteredItems = React.useMemo(() => {
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
  const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);
  const filteredItems = React.useMemo(() => {
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
  const [sortBy, setSortBy] = React.useState(initialSortBy);
  const [sortAscending, setSortAscending] = React.useState(initialSortAscending);
  const sortedItems = React.useMemo(() => {
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
  const [input, setInput] = React.useState('');
  const [showClearIcon, setShowClearIcon] = React.useState('hidden');
  const {
    setSearchTerm
  } = useThumbnailListItemContext();
  console.log('Searchfield rerenders');
  const handleChange = value => {
    setInput(value);
    setShowClearIcon(value === '' ? 'hidden' : '');
  };
  const debouncedSetSearchTerm = React.useCallback(lodash.debounce(setSearchTerm, 50), []);
  React.useEffect(() => {
    debouncedSetSearchTerm(input);
    return () => {
      debouncedSetSearchTerm.cancel();
    };
  }, [input, debouncedSetSearchTerm]);
  return jsxRuntime.jsx(material.Box, {
    sx: {
      marginLeft: 'auto'
    },
    children: jsxRuntime.jsx(material.FormControl, {
      children: jsxRuntime.jsx(material.TextField, {
        fullWidth: true,
        value: input,
        size: "small",
        variant: "outlined",
        onChange: event => handleChange(event.target.value),
        InputProps: {
          startAdornment: jsxRuntime.jsx(material.InputAdornment, {
            position: "start",
            children: jsxRuntime.jsx(SearchIcon__default["default"], {})
          }),
          endAdornment: jsxRuntime.jsx(material.InputAdornment, {
            position: "end",
            children: jsxRuntime.jsx(material.IconButton, {
              onClick: () => handleChange(''),
              sx: {
                visibility: showClearIcon,
                padding: 0
              },
              children: jsxRuntime.jsx(ClearIcon__default["default"], {})
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
var ThumbnailListSearchField$1 = /*#__PURE__*/React__default["default"].memo(ThumbnailListSearchField);

function ThumbnailListFilterTag(props) {
  var _props$collapseBreakp;
  const theme = material.useTheme();
  const handleOnClick = value => {
    if (props.onClickCallback) {
      props.onClickCallback(value);
    }
  };
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: material.useMediaQuery(theme.breakpoints.up((_props$collapseBreakp = props.collapseBreakpoint) !== null && _props$collapseBreakp !== void 0 ? _props$collapseBreakp : 0)) || !props.icon ? jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: jsxRuntime.jsx(material.Chip, {
        label: props.label,
        variant: props.variant,
        onClick: props.onClickCallback ? () => handleOnClick(props.value) : undefined
      })
    }) : jsxRuntime.jsx(jsxRuntime.Fragment, {
      children: jsxRuntime.jsx(material.Tooltip, {
        title: props.label,
        children: jsxRuntime.jsx(material.IconButton, {
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
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: props.tags.map((tag, index) => {
      return jsxRuntime.jsx(ThumbnailListFilterTag, {
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
  const [value, setValue] = React.useState((_props$defaultValue = props.defaultValue) !== null && _props$defaultValue !== void 0 ? _props$defaultValue : '');
  const theme = material.useTheme();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleChange = (value, name) => {
    setValue(value);
    setAnchorEl(null);
    props.onChangeCallback(value, name);
  };
  return jsxRuntime.jsxs(jsxRuntime.Fragment, {
    children: [material.useMediaQuery(theme.breakpoints.up((_props$collapseBreakp = props.collapseBreakpoint) !== null && _props$collapseBreakp !== void 0 ? _props$collapseBreakp : 0)) ? jsxRuntime.jsxs(material.FormControl, {
      sx: {
        width: props.width,
        textAlign: 'start'
      },
      children: [jsxRuntime.jsx(material.InputLabel, {
        size: "small",
        children: props.label
      }), jsxRuntime.jsx(material.Select, {
        value: value,
        size: "small",
        label: props.label,
        onChange: event => handleChange(event.target.value, event.target.name),
        children: props.items.map(item => {
          return jsxRuntime.jsx(material.MenuItem, {
            value: item.value,
            children: item.name
          }, item.value);
        })
      })]
    }) : jsxRuntime.jsx(material.IconButton
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    , {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onClick: event => setAnchorEl(event.currentTarget),
      children: props.icon
    }), jsxRuntime.jsx(material.Menu, {
      anchorEl: anchorEl,
      open: Boolean(anchorEl),
      onClose: () => setAnchorEl(null),
      children: props.items.map(item => jsxRuntime.jsx(material.MenuItem, {
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
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: jsxRuntime.jsxs(material.Box, {
      sx: {
        minWidth: '80px'
      },
      children: [jsxRuntime.jsx(material.Tooltip, {
        title: "asc/desc",
        children: jsxRuntime.jsx(material.IconButton, {
          onClick: () => setSortAscending(!sortAscending),
          children: jsxRuntime.jsx(SwapVertIcon__default["default"], {})
        })
      }), jsxRuntime.jsx(DropdownInput, {
        width: "130px",
        collapseBreakpoint: props.muiBreakpoint,
        label: 'sort',
        defaultValue: sortBy,
        icon: jsxRuntime.jsx(material.Tooltip, {
          title: 'sort',
          children: jsxRuntime.jsx(SortIcon__default["default"], {})
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
  React.Children.forEach(props.children, child => {
    if ( /*#__PURE__*/React__default["default"].isValidElement(child)) {
      const alignment = child.props.align || 'start';
      if (alignment === 'end') {
        endAlignedItems.push(child);
      } else {
        startAlignedItems.push(child);
      }
    }
  });
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: jsxRuntime.jsxs(material.Stack, {
      direction: "row",
      alignItems: "center",
      justifyContent: (_props$justifyContent = props.justifyContent) !== null && _props$justifyContent !== void 0 ? _props$justifyContent : 'space-between',
      gap: 2,
      children: [jsxRuntime.jsx(material.Stack, {
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
  const [listItems, setListItems] = React.useState(props.items);
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
  return jsxRuntime.jsx(jsxRuntime.Fragment, {
    children: jsxRuntime.jsx(ThumbnailListItemContext.Provider, {
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
      children: jsxRuntime.jsx(material.Stack, {
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

exports.ThumbnailList = ThumbnailList;
