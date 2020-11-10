/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The title for this sub-plot.
 */
export type Title = string;
/**
 * The x-axis label.
 */
export type XAxisLabel = string;
/**
 * The y-axis label.
 */
export type YAxisLabel = string;
/**
 * Whether to show the x ticks and labels.
 */
export type ShowXTicks = boolean;
/**
 * Whether to show the y ticks and labels.
 */
export type ShowYTicks = boolean;
/**
 * The name of the trace.
 */
export type Name = string;
/**
 * The x-values of the data.
 */
export type X = (number | string)[];
/**
 * The y-values of the data.
 */
export type Y = number[];
/**
 * The x-error bars associated with the data.
 */
export type ErrorX = ErrorBar;
export type Type = string;
/**
 * Whether the error bars are symmetric around the data points.
 */
export type Symmetric = boolean;
/**
 * The array of error bar values if `symmetric` is, otherwise an array of the plus error bar values (i.e. those added to the series values).
 */
export type Array = number[];
/**
 * The array of the minus error bar values (i.e. those subtracted from the series values). This must be set if `symmetric` is true.
 */
export type Arrayminus = number[];
/**
 * The y-error bars associated with the data.
 */
export type ErrorY = ErrorBar;
/**
 * The marker style.
 */
export type Marker = MarkerStyle;
/**
 * The color of the marker.
 */
export type Color = string;
/**
 * The symbol to use for the marker.
 */
export type Symbol = string;
/**
 * The line style.
 */
export type Line = LineStyle;
/**
 * The color of the marker.
 */
export type Color1 = string;
/**
 * The group which this trace belongs to in the legend.
 */
export type Legendgroup = string;
/**
 * Whether to display the legend.
 */
export type Showlegend = boolean;
/**
 * The trace information to show when hovering over a data point.
 */
export type Hoverinfo = string;
/**
 * The type of chart the data will be displayed on.
 */
export type Type1 = string;
/**
 * The name of the trace.
 */
export type Name1 = string;
/**
 * The x-values of the data.
 */
export type X1 = (number | string)[];
/**
 * The y-values of the data.
 */
export type Y1 = number[];
/**
 * The x-error bars associated with the data.
 */
export type ErrorX1 = ErrorBar;
/**
 * The y-error bars associated with the data.
 */
export type ErrorY1 = ErrorBar;
/**
 * The marker style.
 */
export type Marker1 = MarkerStyle;
/**
 * The line style.
 */
export type Line1 = LineStyle;
/**
 * The group which this trace belongs to in the legend.
 */
export type Legendgroup1 = string;
/**
 * Whether to display the legend.
 */
export type Showlegend1 = boolean;
/**
 * The trace information to show when hovering over a data point.
 */
export type Hoverinfo1 = string;
/**
 * The type of chart the data will be displayed on.
 */
export type Type2 = string;
/**
 * The scatter display mode.
 */
export type Mode = string;
/**
 * The traces to include in the subplot.
 */
export type Traces = (BarTrace | ScatterTrace)[];
/**
 * The subplots to include in a figure.
 */
export type Subplots = Subplot[];
/**
 * Settings for the figures legend.
 */
export type Legend1 = Legend;
/**
 * Whether the legend should be placed to the right of (v) or below (h) the figure.
 */
export type Orientation = string;
/**
 * Whether all axes (both x and y) should have the same limits.
 */
export type SharedAxes = boolean;

/**
 * A collection of subplots to draw in the same figure.
 */
export interface Figure {
  subplots: Subplots;
  legend?: Legend1;
  shared_axes?: SharedAxes;

  [k: string]: unknown;
}

/**
 * Store information about a subplot, including the traces to plot and the titles
 * to include.
 *
 * Notes
 * -----
 * * This model does not conform to any plotly schemas. Rather, it provides enough
 *   information to populate the `layout` section of a figures schema.
 */
export interface Subplot {
  title?: Title;
  x_axis_label?: XAxisLabel;
  y_axis_label?: YAxisLabel;
  show_x_ticks?: ShowXTicks;
  show_y_ticks?: ShowYTicks;
  traces?: Traces;

  [k: string]: unknown;
}

/**
 * Stores information about data to display as a bar chart.
 */
export interface BarTrace {
  name: Name;
  x: X;
  y: Y;
  error_x?: ErrorX;
  error_y?: ErrorY;
  marker?: Marker;
  line?: Line;
  legendgroup: Legendgroup;
  showlegend: Showlegend;
  hoverinfo?: Hoverinfo;
  type?: Type1;

  [k: string]: unknown;
}

/**
 * Stores information about the error bars on each data point in a series.
 */
export interface ErrorBar {
  type?: Type;
  symmetric: Symmetric;
  array: Array;
  arrayminus: Arrayminus;

  [k: string]: unknown;
}

/**
 * Stores properties about markers on a plot.
 */
export interface MarkerStyle {
  color: Color;
  symbol?: Symbol;

  [k: string]: unknown;
}

/**
 * Stores properties about markers on a plot.
 */
export interface LineStyle {
  color: Color1;

  [k: string]: unknown;
}

/**
 * Stores information about data to display as a scatter chart.
 *
 * Notes
 * -----
 * * Scatter traces can also be used to produce line plots by setting the mode
 *   to `lines`, `lines+markers` or `lines+markers+text`.
 */
export interface ScatterTrace {
  name: Name1;
  x: X1;
  y: Y1;
  error_x?: ErrorX1;
  error_y?: ErrorY1;
  marker?: Marker1;
  line?: Line1;
  legendgroup: Legendgroup1;
  showlegend: Showlegend1;
  hoverinfo?: Hoverinfo1;
  type?: Type2;
  mode?: Mode;

  [k: string]: unknown;
}

/**
 * Stores settings about a figures legend.
 */
export interface Legend {
  orientation?: Orientation;

  [k: string]: unknown;
}
