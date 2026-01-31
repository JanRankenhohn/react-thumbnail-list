/**
 * Type definition for Material-UI Grid breakpoint configuration.
 * Defines how many columns an item should span at each screen size.
 * Grid has 12 columns total at each breakpoint.
 * 
 * @property {number} xs - Extra small screens (<600px) - Number of columns to span
 * @property {number} sm - Small screens (≥600px) - Number of columns to span
 * @property {number} md - Medium screens (≥900px) - Number of columns to span
 * @property {number} lg - Large screens (≥1200px) - Number of columns to span
 * @property {number} xl - Extra large screens (≥1536px) - Number of columns to span
 * 
 * @example
 * ```tsx
 * const breakpoints: BreakpointType = { xs: 12, sm: 6, md: 4, lg: 3, xl: 2 };
 * // On xs: 1 column, sm: 2 columns, md: 3 columns, lg: 4 columns, xl: 6 columns
 * ```
 */
type BreakpointType = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export default BreakpointType;
