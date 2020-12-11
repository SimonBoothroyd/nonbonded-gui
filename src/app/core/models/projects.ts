/* tslint:disable */
/**
 * This file was automatically generated by json-schema-to-typescript.
 * DO NOT MODIFY IT BY HAND. Instead, modify the source JSONSchema file,
 * and run json-schema-to-typescript to regenerate this file.
 */

/**
 * Metadata associated with a collection retrieved from a RESTful API such as pagination information.
 */
export type Metadata = CollectionMeta;
/**
 * The number of skipped records.
 */
export type Skip = number;
/**
 * The maximum number of records returned.
 */
export type Limit = number;
/**
 * The total number of records in the collection
 */
export type TotalRecords = number;
/**
 * The current version of this model. Models with different version numbers are incompatible.
 */
export type ModelVersion = number;
/**
 * The unique id assigned to the project.
 */
export type Id = string;
/**
 * The name of the project.
 */
export type Name = string;
/**
 * A description of the project.
 */
export type Description = string;
/**
 * The authors of the project.
 */
export type Authors = Author[];
/**
 * The full name of the author.
 */
export type Name1 = string;
/**
 * The author's email address.
 */
export type Email = string;
/**
 * The author's host institute.
 */
export type Institute = string;
/**
 * The current version of this model. Models with different version numbers are incompatible.
 */
export type ModelVersion1 = number;
/**
 * The unique id assigned to this study.
 */
export type Id1 = string;
/**
 * The id of the parent project.
 */
export type ProjectId = string;
/**
 * The name of the study.
 */
export type Name2 = string;
/**
 * A description of this study.
 */
export type Description1 = string;
/**
 * The unique id assigned to this sub-study.
 */
export type Id2 = string;
/**
 * The id of the parent study.
 */
export type StudyId = string;
/**
 * The id of the parent project.
 */
export type ProjectId1 = string;
/**
 * The name of the sub-study.
 */
export type Name3 = string;
/**
 * A description of this sub-study.
 */
export type Description2 = string;
/**
 * The force field which will be used in this sub-study. If this is a force field produced by an optimization from the parent study, the ``optimization_id`` input should be used instead. This option is mutually exclusive with `optimization_id`.
 */
export type ForceField1 = ForceField;
/**
 * The string representation of a set of force field parameters.This should either be an OpenFF SMIRNOFF representation, or an OpenFF Evaluator JSON serialized `ForceFieldSource`.
 */
export type InnerContent = string;
/**
 * The id of the optimization which produced the force field to use in this sub-study. This must be the id of an optimization which is part of the same study and project. This option is mutually exclusive with ``force_field``.
 */
export type OptimizationId = string;
/**
 * An enumeration.
 */
export type ChemicalEnvironment =
  | 'Alkane'
  | 'Cation'
  | 'Anion'
  | 'Carbonyl'
  | 'Aldehyde'
  | 'Ketone'
  | 'Thiocarbonyl'
  | 'Thioaldehyde'
  | 'Thioketone'
  | 'Imine'
  | 'Hydrazone'
  | 'Semicarbazone'
  | 'Thiosemicarbazone'
  | 'Oxime'
  | 'Oxime Ether'
  | 'Ketene'
  | 'Ketene Acetal Derivative'
  | 'Carbonyl Hydrate'
  | 'Hemiacetal'
  | 'Acetal'
  | 'Hemiaminal'
  | 'Aminal'
  | 'Thiohemiaminal'
  | 'Thioacetal'
  | 'Enamine'
  | 'Enol'
  | 'Enolether'
  | 'Hydroxy'
  | 'Alcohol'
  | 'Primary Alcohol'
  | 'Secondary Alcohol'
  | 'Tertiary Alcohol'
  | '1,2 Diol'
  | '1,2 Aminoalcohol'
  | 'Phenol'
  | '1,2 Diphenol'
  | 'Enediol'
  | 'Ether'
  | 'Dialkylether'
  | 'Alkylarylether'
  | 'Diarylether'
  | 'Thioether'
  | 'Disulfide'
  | 'Peroxide'
  | 'Hydroperoxide'
  | 'Hydrazine'
  | 'Hydroxylamine'
  | 'Amine'
  | 'Primary Amine'
  | 'Primary Aliphatic Amine'
  | 'Primary Aromatic Amine'
  | 'Secondary Amine'
  | 'Secondary Aliphatic Amine'
  | 'Secondary Mixed Amine'
  | 'Secondary Aromatic Amine'
  | 'Tertiary Amine'
  | 'Tertiary Aliphatic Amine'
  | 'Tertiary Mixed Amine'
  | 'Tertiary Aromatic Amine'
  | 'Quart Ammonium'
  | 'NOxide'
  | 'Halogen Derivative'
  | 'Alkyl Halide'
  | 'Alkyl Fluoride'
  | 'Alkyl Chloride'
  | 'Alkyl Bromide'
  | 'Alkyl Iodide'
  | 'Aryl Halide'
  | 'Aryl Fluoride'
  | 'Aryl Chloride'
  | 'Aryl Bromide'
  | 'Aryl Iodide'
  | 'Organometallic'
  | 'Organolithium'
  | 'Organomagnesium'
  | 'Carboxylic Acid Derivative'
  | 'Carboxylic Acid'
  | 'Carboxylic Acid Salt'
  | 'Carboxylic Acid Ester'
  | 'Lactone'
  | 'Carboxylic Acid Amide'
  | 'Carboxylic Acid Primary Amide'
  | 'Carboxylic Acid Secondary Amide'
  | 'Carboxylic Acid Tertiary Amide'
  | 'Lactam'
  | 'Carboxylic Acid Hydrazide'
  | 'Carboxylic Acid Azide'
  | 'Hydroxamic Acid'
  | 'Carboxylic Acid Amidine'
  | 'Carboxylic Acid Amidrazone'
  | 'Nitrile'
  | 'Acyl Halide'
  | 'Acyl Fluoride'
  | 'Acyl Chloride'
  | 'Acyl Bromide'
  | 'Acyl Iodide'
  | 'Acyl Cyanide'
  | 'Imido Ester'
  | 'Imidoyl Halide'
  | 'Thiocarboxylic Acid Derivative'
  | 'Thiocarboxylic Acid'
  | 'Thiocarboxylic Acid Ester'
  | 'Thiolactone'
  | 'Thiocarboxylic Acid Amide'
  | 'Thiolactam'
  | 'Imido Thioester'
  | 'Oxohetarene'
  | 'Thioxohetarene'
  | 'Iminohetarene'
  | 'Orthocarboxylic Acid Derivative'
  | 'Carboxylic Acid Orthoester'
  | 'Carboxylic Acid Amide Acetal'
  | 'Carboxylic Acid Anhydride'
  | 'Carboxylic Acid Imide'
  | 'Carboxylic Acid Unsubst Imide'
  | 'Carboxylic Acid Subst Imide'
  | 'CO2 Derivative'
  | 'Carbonic Acid Derivative'
  | 'Carbonic Acid Monoester'
  | 'Carbonic Acid Diester'
  | 'Carbonic Acid Ester Halide'
  | 'Thiocarbonic Acid Derivative'
  | 'Thiocarbonic Acid Monoester'
  | 'Thiocarbonic Acid Diester'
  | 'Thiocarbonic Acid Ester Halide'
  | 'Carbamic Acid Derivative'
  | 'Carbamic Acid'
  | 'Carbamic Acid Ester'
  | 'Carbamic Acid Halide'
  | 'Thiocarbamic Acid Derivative'
  | 'Thiocarbamic Acid'
  | 'Thiocarbamic Acid Ester'
  | 'Thiocarbamic Acid Halide'
  | 'Urea'
  | 'Isourea'
  | 'Thiourea'
  | 'Isothiourea'
  | 'Guanidine'
  | 'Semicarbazide'
  | 'Thiosemicarbazide'
  | 'Azide'
  | 'Azo Compound'
  | 'Diazonium Salt'
  | 'Isonitrile'
  | 'Cyanate'
  | 'Isocyanate'
  | 'Thiocyanate'
  | 'Isothiocyanate'
  | 'Carbodiimide'
  | 'Nitroso Compound'
  | 'Nitro Compound'
  | 'Nitrite'
  | 'Nitrate'
  | 'Sulfuric Acid Derivative'
  | 'Sulfuric Acid'
  | 'Sulfuric Acid Monoester'
  | 'Sulfuric Acid Diester'
  | 'Sulfuric Acid Amide Ester'
  | 'Sulfuric Acid Amide'
  | 'Sulfuric Acid Diamide'
  | 'Sulfuryl Halide'
  | 'Sulfonic Acid Derivative'
  | 'Sulfonic Acid'
  | 'Sulfonic Acid Ester'
  | 'Sulfonamide'
  | 'Sulfonyl Halide'
  | 'Sulfone'
  | 'Sulfoxide'
  | 'Sulfinic Acid Derivative'
  | 'Sulfinic Acid'
  | 'Sulfinic Acid Ester'
  | 'Sulfinic Acid Halide'
  | 'Sulfinic Acid Amide'
  | 'Sulfenic Acid Derivative'
  | 'Sulfenic Acid'
  | 'Sulfenic Acid Ester'
  | 'Sulfenic Acid Halide'
  | 'Sulfenic Acid Amide'
  | 'Thiol'
  | 'Alkylthiol'
  | 'Arylthiol'
  | 'Phosphoric Acid Derivative'
  | 'Phosphoric Acid'
  | 'Phosphoric Acid Ester'
  | 'Phosphoric Acid Halide'
  | 'Phosphoric Acid Amide'
  | 'Thiophosphoric Acid Derivative'
  | 'Thiophosphoric Acid'
  | 'Thiophosphoric Acid Ester'
  | 'Thiophosphoric Acid Halide'
  | 'Thiophosphoric Acid Amide'
  | 'Phosphonic Acid Derivative'
  | 'Phosphonic Acid'
  | 'Phosphonic Acid Ester'
  | 'Phosphine'
  | 'Phosphinoxide'
  | 'Boronic Acid Derivative'
  | 'Boronic Acid'
  | 'Boronic Acid Ester'
  | 'Alkene'
  | 'Alkyne'
  | 'Aromaticatic'
  | 'Heterocycle'
  | 'Alpha Aminoacid'
  | 'Alpha Hydroxyacid'
  | 'Aqueous';
/**
 * The chemical environments to consider when analysing the results of this sub-study.
 */
export type AnalysisEnvironments = ChemicalEnvironment[];
/**
 * The current version of this model. Models with different version numbers are incompatible.
 */
export type ModelVersion2 = number;
/**
 * The engine to use to drive the optimization.
 */
export type Engine = ForceBalance;
export type Type = string;
/**
 * The convergence criterion of the step size.
 */
export type ConvergenceStepCriteria = number;
/**
 * The convergence criterion of the objective function.
 */
export type ConvergenceObjectiveCriteria = number;
/**
 * The convergence criterion of the gradient norm.
 */
export type ConvergenceGradientCriteria = number;
/**
 * The number of convergence criteria that must be met for the optimizer to be declared converged.
 */
export type NCriteria = number;
/**
 * The initial trust radius.
 */
export type InitialTrustRadius = number;
/**
 * The minimum trust radius.
 */
export type MinimumTrustRadius = number;
/**
 * A list of the fitting targets to include in the optimization. These represent different kinds of contributions to the objective function, such as deviations from experimental measurements or from computed QM data.
 */
export type Targets = (EvaluatorTarget | RechargeTarget)[];
/**
 * The name of the fitting target.
 */
export type Id3 = string;
/**
 * The amount to weight this fitting targets contribution to the total objective function by.
 */
export type Weight = number;
/**
 * The current version of this model. Models with different version numbers are incompatible.
 */
export type ModelVersion3 = number;
/**
 * The unique identifiers of the physical property data sets to include in this optimization target.
 */
export type DataSetIds = string[];
/**
 * This option controls whether the OpenFF Evaluator should be allowed to attempt to estimate the physical property training set using the direct simulation calculation layer.
 */
export type AllowDirectSimulation = boolean;
/**
 * This field controls the number of molecules to use in the simulations of physical properties. This value is only used when simulating properties whose default simulation schema (see the OpenFF Evaluator documentation for details) accept this option. If no value is provided, or the option is not supported by the schema, the schema default will be used instead.
 */
export type NMolecules = number;
/**
 * This option controls whether the OpenFF Evaluator should be allowed to attempt to estimate the physical property training set using the cached simulation data reweighting calculation layer.
 */
export type AllowReweighting = boolean;
/**
 * This field controls the minimum number of effective samples which are required in order to estimate a physical property be reweighting cached simulation data. This value is only used when reweighting properties whose default reweighting schema (see the OpenFF Evaluator documentation for details) accept this option. If no value is provided, or the option is not supported by the schema the schema default will be used instead.
 */
export type NEffectiveSamples = number;
/**
 * The name of the fitting target.
 */
export type Id4 = string;
/**
 * The amount to weight this fitting targets contribution to the total objective function by.
 */
export type Weight1 = number;
/**
 * The current version of this model. Models with different version numbers are incompatible.
 */
export type ModelVersion4 = number;
/**
 * The unique identifiers of the QC data sets to include in this optimization target.
 */
export type QcDataSetIds = string[];
/**
 * The settings which define the grid to compute the ESP and electric field on for each entry in each QC data set (``qc_data_set_ids``).
 */
export type GridSettings1 = GridSettings;
/**
 * The type of grid to generate.
 */
export type Type1 = string;
/**
 * The grid spacing in units of angstroms.
 */
export type Spacing = number;
/**
 * A scalar which defines the inner radius of the shell around the molecule to retain grid points within.
 */
export type InnerVdwScale = number;
/**
 * A scalar which defines the outer radius of the shell around the molecule to retain grid points within.
 */
export type OuterVdwScale = number;
/**
 * The type of electrostatic property to train against.
 */
export type Property = string;
/**
 * The maximum number of optimization iterations to perform. The number actually performed may be less depending on if the optimization engine supports automatically detecting whether the optimization has converged.
 */
export type MaxIterations = number;
/**
 * The force field parameters to be optimized.
 */
export type ParametersToTrain = Parameter[];
/**
 * The type of the parameter handler associated with this parameter.
 */
export type HandlerType = string;
/**
 * The smirks identifier of the parameter.
 */
export type Smirks = string;
/**
 * The attribute name associated with the parameter.
 */
export type AttributeName = string;
/**
 * The optimizations to perform as part of this study.
 */
export type Optimizations = Optimization[];
/**
 * The unique id assigned to this sub-study.
 */
export type Id5 = string;
/**
 * The id of the parent study.
 */
export type StudyId1 = string;
/**
 * The id of the parent project.
 */
export type ProjectId2 = string;
/**
 * The name of the sub-study.
 */
export type Name4 = string;
/**
 * A description of this sub-study.
 */
export type Description3 = string;
/**
 * The force field which will be used in this sub-study. If this is a force field produced by an optimization from the parent study, the ``optimization_id`` input should be used instead. This option is mutually exclusive with `optimization_id`.
 */
export type ForceField2 = ForceField;
/**
 * The id of the optimization which produced the force field to use in this sub-study. This must be the id of an optimization which is part of the same study and project. This option is mutually exclusive with ``force_field``.
 */
export type OptimizationId1 = string;
/**
 * The chemical environments to consider when analysing the results of this sub-study.
 */
export type AnalysisEnvironments1 = ChemicalEnvironment[];
/**
 * The current version of this model. Models with different version numbers are incompatible.
 */
export type ModelVersion5 = number;
/**
 * The unique identifiers of the data sets to use as part of the benchmarking.
 */
export type TestSetIds = string[];
/**
 * The benchmarks to perform as part of this study.
 */
export type Benchmarks = Benchmark[];
/**
 * The studies conducted as part of the project.
 */
export type Studies = Study[];
/**
 * A collection of projects.
 */
export type Projects = Project[];
/**
 * Metadata associated with a collection retrieved from a RESTful API such as pagination information.
 */
export type Metadata1 = CollectionMeta;
/**
 * A collection of studies.
 */
export type Studies1 = Study[];
/**
 * Metadata associated with a collection retrieved from a RESTful API such as pagination information.
 */
export type Metadata2 = CollectionMeta;
/**
 * A collection of optimizations.
 */
export type Optimizations1 = Optimization[];
/**
 * Metadata associated with a collection retrieved from a RESTful API such as pagination information.
 */
export type Metadata3 = CollectionMeta;
/**
 * A collection of benchmarks.
 */
export type Benchmarks1 = Benchmark[];

export interface ProjectCollection {
  metadata?: Metadata;
  projects?: Projects;

  [k: string]: unknown;
}

/**
 * A data model which stores metadata about a retrieved collection, such as
 * pagination information.
 */
export interface CollectionMeta {
  skip: Skip;
  limit: Limit;
  total_records: TotalRecords;

  [k: string]: unknown;
}

export interface Project {
  model_version?: ModelVersion;
  id: Id;
  name: Name;
  description: Description;
  authors: Authors;
  studies?: Studies;

  [k: string]: unknown;
}

/**
 * A representation an author. This may be the author of a project
 * or a data set for example.
 */
export interface Author {
  name: Name1;
  email: Email;
  institute: Institute;

  [k: string]: unknown;
}

export interface Study {
  model_version?: ModelVersion1;
  id: Id1;
  project_id: ProjectId;
  name: Name2;
  description: Description1;
  optimizations?: Optimizations;
  benchmarks?: Benchmarks;

  [k: string]: unknown;
}

/**
 * A base class for optimization and benchmark sub-studies, which share largely the
 * same fields.
 */
export interface Optimization {
  id: Id2;
  study_id: StudyId;
  project_id: ProjectId1;
  name: Name3;
  description: Description2;
  force_field?: ForceField1;
  optimization_id?: OptimizationId;
  analysis_environments: AnalysisEnvironments;
  model_version?: ModelVersion2;
  engine: Engine;
  targets: Targets;
  max_iterations: MaxIterations;
  parameters_to_train: ParametersToTrain;

  [k: string]: unknown;
}

export interface ForceField {
  inner_content: InnerContent;

  [k: string]: unknown;
}

export interface ForceBalance {
  type?: Type;
  convergence_step_criteria?: ConvergenceStepCriteria;
  convergence_objective_criteria?: ConvergenceObjectiveCriteria;
  convergence_gradient_criteria?: ConvergenceGradientCriteria;
  n_criteria?: NCriteria;
  initial_trust_radius?: InitialTrustRadius;
  minimum_trust_radius?: MinimumTrustRadius;
  priors: Priors;

  [k: string]: unknown;
}

/**
 * The priors to place on each class of parameter.
 */
export interface Priors {
  [k: string]: number;
}

/**
 * A fitting target which uses the ``openff-evaluator`` framework to train
 * force field parameters against experimental physical property data.
 */
export interface EvaluatorTarget {
  id: Id3;
  weight?: Weight;
  model_version?: ModelVersion3;
  data_set_ids: DataSetIds;
  denominators: Denominators;
  allow_direct_simulation?: AllowDirectSimulation;
  n_molecules?: NMolecules;
  allow_reweighting?: AllowReweighting;
  n_effective_samples?: NEffectiveSamples;

  [k: string]: unknown;
}

/**
 * The denominators to scale each class of properties contribution to the objective function by.
 */
export interface Denominators {
  [k: string]: string;
}

/**
 * A fitting target which uses the ``openff-recharge`` framework to train
 * bond charge correction parameters against QM electrostatic potential data.
 */
export interface RechargeTarget {
  id: Id4;
  weight?: Weight1;
  model_version?: ModelVersion4;
  qc_data_set_ids: QcDataSetIds;
  grid_settings: GridSettings1;
  property: Property;

  [k: string]: unknown;
}

/**
 * A class which encodes the settings to use when generating a
 * grid to compute the electrostatic potential of a molecule on.
 */
export interface GridSettings {
  type?: Type1;
  spacing?: Spacing;
  inner_vdw_scale?: InnerVdwScale;
  outer_vdw_scale?: OuterVdwScale;

  [k: string]: unknown;
}

export interface Parameter {
  handler_type: HandlerType;
  smirks: Smirks;
  attribute_name: AttributeName;

  [k: string]: unknown;
}

/**
 * A base class for optimization and benchmark sub-studies, which share largely the
 * same fields.
 */
export interface Benchmark {
  id: Id5;
  study_id: StudyId1;
  project_id: ProjectId2;
  name: Name4;
  description: Description3;
  force_field?: ForceField2;
  optimization_id?: OptimizationId1;
  analysis_environments: AnalysisEnvironments1;
  model_version?: ModelVersion5;
  test_set_ids: TestSetIds;

  [k: string]: unknown;
}

export interface StudyCollection {
  metadata?: Metadata1;
  studies?: Studies1;

  [k: string]: unknown;
}

export interface OptimizationCollection {
  metadata?: Metadata2;
  optimizations?: Optimizations1;

  [k: string]: unknown;
}

export interface BenchmarkCollection {
  metadata?: Metadata3;
  benchmarks?: Benchmarks1;

  [k: string]: unknown;
}
