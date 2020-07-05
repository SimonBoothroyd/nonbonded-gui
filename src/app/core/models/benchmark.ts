/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * The id of the project that these results were generated for.
 */
export type ProjectId = string;
/**
 * The id of the study that these results were generated for.
 */
export type StudyId = string;
/**
 * The unique id assigned to these results. This should match the id of the benchmark / optimization which yielded this result.
 */
export type Id = string;
/**
 * The analysed results of the benchmark
 */
export type AnalysedResult1 = AnalysedResult;
/**
 * The type of statistic recorded by this entry.
 */
export type StatisticsType = 'R^2' | 'RMSE' | 'MSE';
/**
 * The type of property which the statistic was calculated for.
 */
export type PropertyType = string;
/**
 * The number of components in the systems which the statistic was calculated for (pure, binary, etc.).
 */
export type NComponents = number;
/**
 * The category which this statistic has been placed into.
 */
export type Category = string;
/**
 * The value of the statistic.
 */
export type Value = number;
/**
 * The lower 95% confidence interval of the statistic.
 */
export type Lower95Ci = number;
/**
 * The upper 95% confidence interval of the statistic.
 */
export type Upper95Ci = number;
/**
 * Overall statistics about the results, including values such as the RMSE and R^2 of each type of property.
 */
export type StatisticEntries = StatisticsEntry[];
/**
 * The identifier of the original data point which has been estimated.
 */
export type ReferenceId = number;
/**
 * The estimated value.
 */
export type EstimatedValue = number;
/**
 * The estimated std error
 */
export type EstimatedStdError = number;
/**
 * The category which this data point has been placed into.
 */
export type Category1 = string;
/**
 * A comparison of the estimated and reference values for each of the properties which were analysed.
 */
export type ResultsEntries = ResultsEntry[];

export interface BenchmarkResult {
  project_id: ProjectId;
  study_id: StudyId;
  id: Id;
  analysed_result: AnalysedResult1;
  [k: string]: unknown;
}
export interface AnalysedResult {
  statistic_entries: StatisticEntries;
  results_entries: ResultsEntries;
  [k: string]: unknown;
}
export interface StatisticsEntry {
  statistics_type: StatisticsType;
  property_type: PropertyType;
  n_components: NComponents;
  category?: Category;
  value: Value;
  lower_95_ci: Lower95Ci;
  upper_95_ci: Upper95Ci;
  [k: string]: unknown;
}
export interface ResultsEntry {
  reference_id: ReferenceId;
  estimated_value: EstimatedValue;
  estimated_std_error: EstimatedStdError;
  category: Category1;
  [k: string]: unknown;
}
