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
 * The refit force field produced by the optimization.
 */
export type RefitForceField = ForceField;
/**
 * The string representation of a set of force field parameters.This should either be an OpenFF SMIRNOFF representation, or an OpenFF Evaluator JSON serialized `ForceFieldSource`.
 */
export type InnerContent = string;

export interface OptimizationResult {
  project_id: ProjectId;
  study_id: StudyId;
  id: Id;
  objective_function: ObjectiveFunction;
  statistics: Statistics;
  refit_force_field: RefitForceField;
  [k: string]: unknown;
}
/**
 * The value of the objective function at each iteration
 */
export interface ObjectiveFunction {
  [k: string]: number;
}
/**
 * Statistics measuring the performance of the force field being refit against the training set at each iteration.
 */
export interface Statistics {
  [k: string]: StatisticsEntry[];
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
export interface ForceField {
  inner_content: InnerContent;
  [k: string]: unknown;
}
