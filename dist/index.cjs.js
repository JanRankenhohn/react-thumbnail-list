'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var material = require('@mui/material');
var React = require('react');
var jsxRuntime = require('react/jsx-runtime');
var system = require('@mui/system');
var SearchIcon = require('@mui/icons-material/Search');
var ClearIcon = require('@mui/icons-material/Clear');
var SwapVertIcon = require('@mui/icons-material/SwapVert');
var SortIcon = require('@mui/icons-material/Sort');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var React__default = /*#__PURE__*/_interopDefaultLegacy(React);
var SearchIcon__default = /*#__PURE__*/_interopDefaultLegacy(SearchIcon);
var ClearIcon__default = /*#__PURE__*/_interopDefaultLegacy(ClearIcon);
var SwapVertIcon__default = /*#__PURE__*/_interopDefaultLegacy(SwapVertIcon);
var SortIcon__default = /*#__PURE__*/_interopDefaultLegacy(SortIcon);

function HelloWorld() {
  return /*#__PURE__*/React__default["default"].createElement(React__default["default"].Fragment, null, /*#__PURE__*/React__default["default"].createElement("h1", null, "Hello World"), /*#__PURE__*/React__default["default"].createElement(material.Button, {
    variant: "contained"
  }, "Contained"));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const ThumbnailListItemContext = React.createContext(undefined);
// Create a custom hook to consume the context
const useThumbnailListItemContext = () => {
    const context = React.useContext(ThumbnailListItemContext);
    if (!context) {
        throw new Error('useMyContext must be used within a MyContextProvider');
    }
    return context;
};

/**
 * Can be used as parent component to crop a wrapped image
 * @param props width: width for cropping
 * height: height for cropping
 * seperate xs and sm values for mui breakpoints
 * @returns component
 */
function ImageCropper(props) {
    const ThumbnailImageCrop = material.styled('div')((p) => ({
        [p.theme.breakpoints.up('xs')]: {
            minWidth: props.width.xs,
            maxWidth: props.width.xs,
            height: props.height.xs,
            overflow: 'hidden'
        },
        [p.theme.breakpoints.up('sm')]: {
            minWidth: props.width.sm,
            maxwWidth: props.width.sm,
            height: props.height.sm,
        },
    }));
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(ThumbnailImageCrop, { children: props.children }) }));
}

/**
 * Creates a ellipies text with webkit css styles
 * @param props lineClamp: lines till ellipses
 * @returns component
 */
function EllipsisContainer(props) {
    const EllipsisContainer = material.styled('div')((p) => ({
        [p.theme.breakpoints.up('xs')]: {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: props.lineClamp.xs.toString(),
            WebkitBoxOrient: 'vertical',
        },
        [p.theme.breakpoints.up('sm')]: {
            overflow: 'hidden',
            display: '-webkit-box',
            WebkitLineClamp: props.lineClamp.sm.toString(),
            WebkitBoxOrient: 'vertical', /* number of lines to show */
        },
    }));
    return (jsxRuntime.jsx(EllipsisContainer, { children: props.children }));
}

function ThumbnailListItemTitle(props) {
    const StyledCardContent = material.styled('div')((props) => ({
        [props.theme.breakpoints.up('xs')]: {
            'padding': props.theme.spacing(1),
            'flex': '1 0 auto',
            '&:last-child': { paddingBottom: 0 },
            'overflow': 'hidden',
        },
    }));
    const children = React.Children.toArray(props.children);
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(material.Box, { children: jsxRuntime.jsxs(StyledCardContent, { children: [jsxRuntime.jsx(EllipsisContainer, { lineClamp: { xs: 1, sm: 2 }, children: jsxRuntime.jsx(material.Typography, { variant: 'h4', children: props.title }) }), jsxRuntime.jsx(system.Stack, { direction: "row", gap: 1, children: children.map((child, index) => jsxRuntime.jsx(material.Typography, { variant: "subtitle2", color: "text.secondary", children: child }, index)) })] }) }) });
}

function ThumbnailListItemInfoLabel(props) {
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(material.Stack, { textAlign: "right", justifyContent: "space-between", children: [jsxRuntime.jsx(material.Box, { textAlign: "right", padding: 1, children: props.topContent }), jsxRuntime.jsx(material.Box, { textAlign: "right", padding: 1, children: props.bottomContent })] }) });
}

// import {Link} from 'react-router-dom';
const ThumbnailListItem = (props) => {
    return jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(material.Card, { sx: { display: 'flex' }, children: jsxRuntime.jsx(material.CardActionArea, { children: jsxRuntime.jsxs(material.Stack, { direction: "row", width: "100%", children: [jsxRuntime.jsx(ImageCropper, { width: { xs: '98px', sm: '160px' }, height: { xs: '54px', sm: '90px' }, children: jsxRuntime.jsx(material.Box, { children: "Placeholder for image" }) }), jsxRuntime.jsx(material.Stack, { direction: "row", justifyContent: "space-between", width: "100%", gap: 1, children: props.children })] }) }) }) });
};
ThumbnailListItem.Title = ThumbnailListItemTitle;
ThumbnailListItem.InfoLabel = ThumbnailListItemInfoLabel;

function ThumbnailListMainContent( /* props: {children: ReactNode}*/) {
    // const children = Children.toArray(props.children);
    const { items } = useThumbnailListItemContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: items.map((item) => {
            return (jsxRuntime.jsx(material.Grid, { item: true, xs: 12, lg: 6, xl: 3, children: jsxRuntime.jsxs(ThumbnailListItem, { id: item.id, 
                    // link={item.link}
                    thumbnailUrl: item.thumbnailUrl, children: [jsxRuntime.jsx(ThumbnailListItem.Title, { title: item.title, children: item.subTitle }), item.label] }) }, item.id));
        }) }));
}

const ThumbnailListSearchField = () => {
    const [input, setInput] = React.useState('');
    const [showClearIcon, setShowClearIcon] = React.useState('hidden');
    const { setSearchTerm } = useThumbnailListItemContext();
    const handleChange = (value) => {
        setInput(value);
        setShowClearIcon(value === '' ? 'hidden' : '');
        setSearchTerm(value);
    };
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(material.FormControl, { children: jsxRuntime.jsx(material.TextField, { sx: { input: { color: 'white' } }, fullWidth: true, value: input, size: "small", variant: "outlined", onChange: (event) => handleChange(event.target.value), InputProps: {
                    startAdornment: (jsxRuntime.jsx(material.InputAdornment, { position: "start", children: jsxRuntime.jsx(SearchIcon__default["default"], {}) })),
                    endAdornment: (jsxRuntime.jsx(material.InputAdornment, { position: "end", children: jsxRuntime.jsx(material.IconButton, { onClick: () => handleChange(''), sx: { visibility: showClearIcon, padding: 0 }, children: jsxRuntime.jsx(ClearIcon__default["default"], {}) }) })),
                } }) }) }));
};

function ThumbnailListFilterTag(props) {
    const theme = material.useTheme();
    const handleOnClick = (value) => {
        if (props.onClickCallback) {
            props.onClickCallback(value);
        }
    };
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: material.useMediaQuery(theme.breakpoints.up(props.collapseBreakpoint ?? 0)) || !props.icon ?
            jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(material.Chip, { label: props.label, variant: props.variant, onClick: props.onClickCallback ? () => handleOnClick(props.value) : undefined }) }) :
            jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(material.Tooltip, { title: props.label, children: jsxRuntime.jsx(material.IconButton, { onClick: props.onClickCallback ? () => handleOnClick(props.value) : undefined, children: props.icon }) }) }) }));
}

function ThumbnailListFilterTags(props) {
    const { tagFilterCallback, tagAndCondition } = useThumbnailListItemContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: props.tags.map((tag) => {
            return (jsxRuntime.jsx(ThumbnailListFilterTag, { label: tag.label, value: tag.value, variant: tagAndCondition.tag === tag.value ? 'filled' : 'outlined', collapseBreakpoint: props.collapseBreakpoint, onClickCallback: (value) => tagFilterCallback({ tag: value, condition: tag.condition }), icon: tag.icon }));
        }) }));
}

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
    const [value, setValue] = React.useState(props.defaultValue ?? '');
    const theme = material.useTheme();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleChange = (value, name) => {
        setValue(value);
        setAnchorEl(null);
        props.onChangeCallback(value, name);
    };
    return (jsxRuntime.jsxs(jsxRuntime.Fragment, { children: [material.useMediaQuery(theme.breakpoints.up(props.collapseBreakpoint ?? 0)) ?
                jsxRuntime.jsxs(material.FormControl, { sx: { width: props.width, textAlign: 'start' }, children: [jsxRuntime.jsx(material.InputLabel, { size: 'small', id: "demo-simple-select-label", children: props.label }), jsxRuntime.jsx(material.Select, { value: value, size: 'small', label: props.label, onChange: (event) => handleChange(event.target.value, event.target.name), children: props.items.map((item) => {
                                return jsxRuntime.jsx(material.MenuItem, { value: item.value, children: item.name }, item.value);
                            }) })] }) : (jsxRuntime.jsx(material.IconButton
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            , { 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick: (event) => setAnchorEl(event.currentTarget), children: props.icon })), jsxRuntime.jsx(material.Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: () => setAnchorEl(null), children: props.items.map((item) => (jsxRuntime.jsx(material.MenuItem, { onClick: () => handleChange(item.value), children: item.name }, item.value))) })] }));
}

function ThumbnailListHeaderSort(props) {
    const { setSortAscending, sortAscending, setSortBy } = useThumbnailListItemContext();
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsxs(material.Box, { sx: { width: '-webkit-fill-available', textAlign: 'end' }, children: [jsxRuntime.jsx(material.Tooltip, { title: "asc/desc", children: jsxRuntime.jsx(material.IconButton, { onClick: () => setSortAscending(!sortAscending), children: jsxRuntime.jsx(SwapVertIcon__default["default"], {}) }) }), jsxRuntime.jsx(DropdownInput, { width: "130px", collapseBreakpoint: 'md', label: 'sort', defaultValue: "creationTimeStamp", icon: jsxRuntime.jsx(material.Tooltip, { title: 'sort', children: jsxRuntime.jsx(SortIcon__default["default"], {}) }), items: props.items, onChangeCallback: (value) => setSortBy(value) })] }) }));
}

const ThumbnailListHeader = function (props) {
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(material.Grid, { item: true, xs: 12, children: jsxRuntime.jsx(material.Stack, { direction: "row", alignItems: "center", justifyContent: props.justifyContent ?? 'space-between', gap: 2, children: props.children }) }) }));
};
ThumbnailListHeader.SearchField = ThumbnailListSearchField;
ThumbnailListHeader.FilterTags = ThumbnailListFilterTags;
ThumbnailListHeader.Sort = ThumbnailListHeaderSort;

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
    }
    else {
        return String(value);
    }
}
function compareValues(a, b) {
    if (typeof a === 'string' && typeof b === 'string') {
        return a.localeCompare(b, undefined, { sensitivity: 'base' });
    }
    else {
        return a < b ? -1 : a > b ? 1 : 0;
    }
}
function filterByTag(array, tagType, condition) {
    const filteredArray = array.filter((item) => {
        const tagValue = item[tagType];
        return condition ? condition(tagValue) : !!tagValue;
    });
    console.log('filter array');
    console.log(filteredArray);
    return [...filteredArray];
}

// /* eslint-disable @typescript-eslint/no-explicit-any */
const useTagFilteredThumbnailListItems = ({ allItems, initialTag, initialCondition }) => {
    const [tagAndCondition, setTagAndCondition] = React.useState({ tag: initialTag, condition: initialCondition });
    const [tagFilteredItems, setTagFilteredItems] = React.useState(allItems);
    const setTagWithCondition = (t, c) => {
        setTagAndCondition({ tag: t, condition: c });
    };
    React.useEffect(() => {
        const tagFiltered = tagAndCondition.tag === 'id' ?
            allItems :
            filterByTag(allItems, tagAndCondition.tag, tagAndCondition.condition);
        setTagFilteredItems(tagFiltered);
    }, [allItems, tagAndCondition]);
    return {
        tagAndCondition,
        setTagAndCondition,
        tagFilteredItems,
        setTagWithCondition,
    };
};

/**
 * Filters a list of event by a search term
 * @param allEvents event list that will be formatted
 * @param initialSearchTerm
 * @returns
 */
const useFilteredThumbnailListItems = (allItems, initialSearchTerm = '') => {
    const [searchTerm, setSearchTerm] = React.useState(initialSearchTerm);
    const [filteredItems, setFilteredItems] = React.useState(allItems);
    React.useEffect(() => {
        const filterEvents = () => {
            const filtered = [...allItems].filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredItems(filtered);
        };
        filterEvents();
    }, [allItems, searchTerm]);
    return { searchTerm, setSearchTerm, filteredItems };
};

const useSortedThumbnailListItems = (allItems, initialSortBy, initialSortAscending) => {
    const [sortBy, setSortBy] = React.useState(initialSortBy);
    const [sortAscending, setSortAscending] = React.useState(initialSortAscending);
    const [sortedItems, setSortedItems] = React.useState(allItems);
    React.useEffect(() => {
        let sorted = orderByArray(allItems, sortBy);
        if (!sortAscending) {
            sorted = sorted.reverse();
        }
        setSortedItems(sorted);
    }, [allItems, sortBy, sortAscending, initialSortBy, initialSortAscending]);
    return { sortBy, sortAscending, setSortBy, setSortAscending, sortedItems };
};

const ThumbnailList = function (props) {
    // const [originalItems, setOriginalItems] = useState(props.items);
    const [listItems, setListItems] = React.useState(props.items);
    const { sortedItems, setSortBy, setSortAscending, sortAscending } = useSortedThumbnailListItems(listItems, 'creationTimeStamp', false);
    const { setSearchTerm, filteredItems } = useFilteredThumbnailListItems(sortedItems);
    const { tagFilteredItems, setTagAndCondition, tagAndCondition } = useTagFilteredThumbnailListItems({ allItems: filteredItems, initialTag: 'id' });
    console.log('tag filterd');
    console.log(tagFilteredItems);
    console.log(listItems);
    React.useEffect(() => {
        if (props.items) {
            // setOriginalItems(props.items);
            setListItems(props.items);
        }
    }, [props.items]);
    return (jsxRuntime.jsx(jsxRuntime.Fragment, { children: jsxRuntime.jsx(ThumbnailListItemContext.Provider, { value: {
                items: tagFilteredItems,
                setItems: setListItems,
                originalItems: listItems,
                setOriginalItems: setListItems,
                tagFilterCallback: setTagAndCondition,
                tagAndCondition: tagAndCondition,
                setSearchTerm: setSearchTerm,
                setSortAscending: setSortAscending,
                sortAscending: sortAscending,
                setSortBy: setSortBy,
            }, children: jsxRuntime.jsx(material.Grid, { container: true, spacing: 2, children: props.children }) }) }));
};
ThumbnailList.MainContent = ThumbnailListMainContent;
ThumbnailList.Header = ThumbnailListHeader;

exports.HelloWorld = HelloWorld;
exports.ThumbnailList = ThumbnailList;
