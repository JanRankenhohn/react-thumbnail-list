import { Button, styled, Box, Typography, Stack as Stack$1, Card, CardActionArea, Grid, FormControl, TextField, InputAdornment, IconButton, useTheme, useMediaQuery, Chip, Tooltip, InputLabel, Select, MenuItem, Menu } from '@mui/material';
import React, { createContext, useContext, Children, useState, useEffect } from 'react';
import { jsx, Fragment, jsxs } from 'react/jsx-runtime';
import { Stack } from '@mui/system';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import SortIcon from '@mui/icons-material/Sort';

function HelloWorld() {
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Hello World"), /*#__PURE__*/React.createElement(Button, {
    variant: "contained"
  }, "Contained"));
}

/* eslint-disable @typescript-eslint/no-explicit-any */
const ThumbnailListItemContext = createContext(undefined);
// Create a custom hook to consume the context
const useThumbnailListItemContext = () => {
    const context = useContext(ThumbnailListItemContext);
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
    const ThumbnailImageCrop = styled('div')((p) => ({
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
    return (jsx(Fragment, { children: jsx(ThumbnailImageCrop, { children: props.children }) }));
}

/**
 * Creates a ellipies text with webkit css styles
 * @param props lineClamp: lines till ellipses
 * @returns component
 */
function EllipsisContainer(props) {
    const EllipsisContainer = styled('div')((p) => ({
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
    return (jsx(EllipsisContainer, { children: props.children }));
}

function ThumbnailListItemTitle(props) {
    const StyledCardContent = styled('div')((props) => ({
        [props.theme.breakpoints.up('xs')]: {
            'padding': props.theme.spacing(1),
            'flex': '1 0 auto',
            '&:last-child': { paddingBottom: 0 },
            'overflow': 'hidden',
        },
    }));
    const children = Children.toArray(props.children);
    return jsx(Fragment, { children: jsx(Box, { children: jsxs(StyledCardContent, { children: [jsx(EllipsisContainer, { lineClamp: { xs: 1, sm: 2 }, children: jsx(Typography, { variant: 'h4', children: props.title }) }), jsx(Stack, { direction: "row", gap: 1, children: children.map((child, index) => jsx(Typography, { variant: "subtitle2", color: "text.secondary", children: child }, index)) })] }) }) });
}

function ThumbnailListItemInfoLabel(props) {
    return jsx(Fragment, { children: jsxs(Stack$1, { textAlign: "right", justifyContent: "space-between", children: [jsx(Box, { textAlign: "right", padding: 1, children: props.topContent }), jsx(Box, { textAlign: "right", padding: 1, children: props.bottomContent })] }) });
}

// import {Link} from 'react-router-dom';
const ThumbnailListItem = (props) => {
    return jsx(Fragment, { children: jsx(Card, { sx: { display: 'flex' }, children: jsx(CardActionArea, { children: jsxs(Stack$1, { direction: "row", width: "100%", children: [jsx(ImageCropper, { width: { xs: '98px', sm: '160px' }, height: { xs: '54px', sm: '90px' }, children: jsx(Box, { children: "Placeholder for image" }) }), jsx(Stack$1, { direction: "row", justifyContent: "space-between", width: "100%", gap: 1, children: props.children })] }) }) }) });
};
ThumbnailListItem.Title = ThumbnailListItemTitle;
ThumbnailListItem.InfoLabel = ThumbnailListItemInfoLabel;

function ThumbnailListMainContent( /* props: {children: ReactNode}*/) {
    // const children = Children.toArray(props.children);
    const { items } = useThumbnailListItemContext();
    return (jsx(Fragment, { children: items.map((item) => {
            return (jsx(Grid, { item: true, xs: 12, lg: 6, xl: 3, children: jsxs(ThumbnailListItem, { id: item.id, 
                    // link={item.link}
                    thumbnailUrl: item.thumbnailUrl, children: [jsx(ThumbnailListItem.Title, { title: item.title, children: item.subTitle }), item.label] }) }, item.id));
        }) }));
}

const ThumbnailListSearchField = () => {
    const [input, setInput] = useState('');
    const [showClearIcon, setShowClearIcon] = useState('hidden');
    const { setSearchTerm } = useThumbnailListItemContext();
    const handleChange = (value) => {
        setInput(value);
        setShowClearIcon(value === '' ? 'hidden' : '');
        setSearchTerm(value);
    };
    return (jsx(Fragment, { children: jsx(FormControl, { children: jsx(TextField, { sx: { input: { color: 'white' } }, fullWidth: true, value: input, size: "small", variant: "outlined", onChange: (event) => handleChange(event.target.value), InputProps: {
                    startAdornment: (jsx(InputAdornment, { position: "start", children: jsx(SearchIcon, {}) })),
                    endAdornment: (jsx(InputAdornment, { position: "end", children: jsx(IconButton, { onClick: () => handleChange(''), sx: { visibility: showClearIcon, padding: 0 }, children: jsx(ClearIcon, {}) }) })),
                } }) }) }));
};

function ThumbnailListFilterTag(props) {
    const theme = useTheme();
    const handleOnClick = (value) => {
        if (props.onClickCallback) {
            props.onClickCallback(value);
        }
    };
    return (jsx(Fragment, { children: useMediaQuery(theme.breakpoints.up(props.collapseBreakpoint ?? 0)) || !props.icon ?
            jsx(Fragment, { children: jsx(Chip, { label: props.label, variant: props.variant, onClick: props.onClickCallback ? () => handleOnClick(props.value) : undefined }) }) :
            jsx(Fragment, { children: jsx(Tooltip, { title: props.label, children: jsx(IconButton, { onClick: props.onClickCallback ? () => handleOnClick(props.value) : undefined, children: props.icon }) }) }) }));
}

function ThumbnailListFilterTags(props) {
    const { tagFilterCallback, tagAndCondition } = useThumbnailListItemContext();
    return (jsx(Fragment, { children: props.tags.map((tag) => {
            return (jsx(ThumbnailListFilterTag, { label: tag.label, value: tag.value, variant: tagAndCondition.tag === tag.value ? 'filled' : 'outlined', collapseBreakpoint: props.collapseBreakpoint, onClickCallback: (value) => tagFilterCallback({ tag: value, condition: tag.condition }), icon: tag.icon }));
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
    const [value, setValue] = useState(props.defaultValue ?? '');
    const theme = useTheme();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleChange = (value, name) => {
        setValue(value);
        setAnchorEl(null);
        props.onChangeCallback(value, name);
    };
    return (jsxs(Fragment, { children: [useMediaQuery(theme.breakpoints.up(props.collapseBreakpoint ?? 0)) ?
                jsxs(FormControl, { sx: { width: props.width, textAlign: 'start' }, children: [jsx(InputLabel, { size: 'small', id: "demo-simple-select-label", children: props.label }), jsx(Select, { value: value, size: 'small', label: props.label, onChange: (event) => handleChange(event.target.value, event.target.name), children: props.items.map((item) => {
                                return jsx(MenuItem, { value: item.value, children: item.name }, item.value);
                            }) })] }) : (jsx(IconButton
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            , { 
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onClick: (event) => setAnchorEl(event.currentTarget), children: props.icon })), jsx(Menu, { anchorEl: anchorEl, open: Boolean(anchorEl), onClose: () => setAnchorEl(null), children: props.items.map((item) => (jsx(MenuItem, { onClick: () => handleChange(item.value), children: item.name }, item.value))) })] }));
}

function ThumbnailListHeaderSort(props) {
    const { setSortAscending, sortAscending, setSortBy } = useThumbnailListItemContext();
    return (jsx(Fragment, { children: jsxs(Box, { sx: { width: '-webkit-fill-available', textAlign: 'end' }, children: [jsx(Tooltip, { title: "asc/desc", children: jsx(IconButton, { onClick: () => setSortAscending(!sortAscending), children: jsx(SwapVertIcon, {}) }) }), jsx(DropdownInput, { width: "130px", collapseBreakpoint: 'md', label: 'sort', defaultValue: "creationTimeStamp", icon: jsx(Tooltip, { title: 'sort', children: jsx(SortIcon, {}) }), items: props.items, onChangeCallback: (value) => setSortBy(value) })] }) }));
}

const ThumbnailListHeader = function (props) {
    return (jsx(Fragment, { children: jsx(Grid, { item: true, xs: 12, children: jsx(Stack$1, { direction: "row", alignItems: "center", justifyContent: props.justifyContent ?? 'space-between', gap: 2, children: props.children }) }) }));
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
    const [tagAndCondition, setTagAndCondition] = useState({ tag: initialTag, condition: initialCondition });
    const [tagFilteredItems, setTagFilteredItems] = useState(allItems);
    const setTagWithCondition = (t, c) => {
        setTagAndCondition({ tag: t, condition: c });
    };
    useEffect(() => {
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
    const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
    const [filteredItems, setFilteredItems] = useState(allItems);
    useEffect(() => {
        const filterEvents = () => {
            const filtered = [...allItems].filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
            setFilteredItems(filtered);
        };
        filterEvents();
    }, [allItems, searchTerm]);
    return { searchTerm, setSearchTerm, filteredItems };
};

const useSortedThumbnailListItems = (allItems, initialSortBy, initialSortAscending) => {
    const [sortBy, setSortBy] = useState(initialSortBy);
    const [sortAscending, setSortAscending] = useState(initialSortAscending);
    const [sortedItems, setSortedItems] = useState(allItems);
    useEffect(() => {
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
    const [listItems, setListItems] = useState(props.items);
    const { sortedItems, setSortBy, setSortAscending, sortAscending } = useSortedThumbnailListItems(listItems, 'creationTimeStamp', false);
    const { setSearchTerm, filteredItems } = useFilteredThumbnailListItems(sortedItems);
    const { tagFilteredItems, setTagAndCondition, tagAndCondition } = useTagFilteredThumbnailListItems({ allItems: filteredItems, initialTag: 'id' });
    console.log('tag filterd');
    console.log(tagFilteredItems);
    console.log(listItems);
    useEffect(() => {
        if (props.items) {
            // setOriginalItems(props.items);
            setListItems(props.items);
        }
    }, [props.items]);
    return (jsx(Fragment, { children: jsx(ThumbnailListItemContext.Provider, { value: {
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
            }, children: jsx(Grid, { container: true, spacing: 2, children: props.children }) }) }));
};
ThumbnailList.MainContent = ThumbnailListMainContent;
ThumbnailList.Header = ThumbnailListHeader;

export { HelloWorld, ThumbnailList };
