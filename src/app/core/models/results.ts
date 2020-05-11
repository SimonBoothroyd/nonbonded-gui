/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The project that this results set belongs to.
 */
export type ProjectIdentifier = string;
/**
 * The study that this results set belongs to.
 */
export type StudyIdentifier = string;
/**
 * The type of property that these results were collected for.
 */
export type PropertyType = string;
/**
 * The number of components in the system for which the property was measured / estimated.
 */
export type NComponents = number;
/**
 * The name of the force field used to generate the results.
 */
export type ForceFieldName = string;
/**
 * The reference values vs the estimated of the property obtained using this force field.
 */
export type ScatterData1 = ScatterData;
/**
 * The name of this series.
 */
export type Name = string;
/**
 * The x values of the series.
 */
export type X = number[];
/**
 * The y values of the series.
 */
export type Y = number[];
/**
 * String metadata (e.g. smiles) associated with each data point.
 */
export type Metadata = string[];
/**
 * The different series of this set.
 */
export type Series = ScatterSeries[];
/**
 * Bootstrapped-statistics about the scatter data.
 */
export type StatisticData1 = StatisticData;
/**
 * The results obtained for each force field that was benchmarked against.
 */
export type ForceFieldResults1 = ForceFieldResults[];
/**
 * The results of each class of property which was benchmarked against.
 */
export type PropertyResults1 = PropertyResults[];
/**
 * A collection of benchmark results.
 */
export type Results = BenchmarkResults[];
/**
 * The optimization that this data set belongs to.
 */
export type OptimizationIdentifier = string;
/**
 * A collection of optimization results.
 */
export type OptimizedResultsType = OptimizationResult[];

export interface OptimizationResultCollection {
  results?: OptimizedResultsType;
}
export interface OptimizationResult {
  project_identifier: ProjectIdentifier;
  study_identifier: StudyIdentifier;
  optimization_identifier: OptimizationIdentifier;
  objective_function: ObjectiveFunction;
}
/**
 * The value of the objective function at each iteration
 */
export interface ObjectiveFunction {
  [k: string]: number;
}

export interface BenchmarkResultsCollection {
  results?: Results;
}
export interface BenchmarkResults {
  project_identifier: ProjectIdentifier;
  study_identifier: StudyIdentifier;
  property_results: PropertyResults1;
}
export interface PropertyResults {
  property_type: PropertyType;
  n_components: NComponents;
  force_field_results: ForceFieldResults1;
}
export interface ForceFieldResults {
  force_field_name: ForceFieldName;
  scatter_data: ScatterData1;
  statistic_data: StatisticData1;
}
export interface ScatterData {
  series: Series;
}
export interface ScatterSeries {
  name: Name;
  x: X;
  y: Y;
  metadata: Metadata;
}
export interface StatisticData {
  values: Values;
  confidence_intervals: ConfidenceIntervals;
}
/**
 * The value of this series statistic.
 */
export interface Values {
  [k: string]: number;
}
/**
 * The 95% confidence intervals.
 */
export interface ConfidenceIntervals {
  [k: string]: [] | [number] | [number, number];
}