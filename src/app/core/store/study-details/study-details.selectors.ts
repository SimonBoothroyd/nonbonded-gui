import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BarTrace,
  initialTestResultsState,
  initialTestSummaryStatisticsState,
  ScatterTrace,
  StudyDetailsState,
  TestResultsState,
  TestSummaryStatisticsState,
} from '@core/store/study-details/study-details.interfaces';
import {
  BenchmarkState,
  OptimizationState,
  StudyState,
} from '@core/store/project/project.interfaces';
import {
  getCurrentBenchmarkState,
  getCurrentOptimizationState,
  getCurrentStudyState,
} from '@core/store/project/project.selectors';
import {
  DataSetCollectionState,
  initialDataSet,
  initialDataSetCollection,
  initialDataSetCollectionState,
} from '@core/store/datasets/datasets.interfaces';
import { Benchmark } from '@core/models/projects';
import { createDefaultLoadable } from '@core/loadable/loadable';

export const selectStudyDetailsState = createFeatureSelector<StudyDetailsState>(
  'studyDetails'
);
export const getHasStudyDetailsLoaded = createSelector(
  selectStudyDetailsState,
  (state: StudyDetailsState, props) => {
    if (state.projectId != props.projectId || state.studyId != props.studyId)
      return false;
    return state.loading || state.success || state.error != null;
  }
);

export const getCurrentTrainingSets = createSelector(
  getCurrentOptimizationState,
  selectStudyDetailsState,
  (
    optimizationState: OptimizationState,
    studyDetailsState: StudyDetailsState
  ): DataSetCollectionState => {
    if (
      (optimizationState && optimizationState.loading) ||
      (studyDetailsState && studyDetailsState.loading)
    ) {
      return {
        ...initialDataSet,
        loading: true,
        success: false,
        error: optimizationState.error || studyDetailsState.error,
      };
    }

    let dataSetCollection = { ...initialDataSetCollection };

    if (
      optimizationState &&
      !optimizationState.error &&
      studyDetailsState &&
      !studyDetailsState.error
    ) {
      dataSetCollection.data_sets = studyDetailsState.dataSets.filter(
        (value) => optimizationState.training_set_ids.indexOf(value.id) >= 0
      );
    }

    if (dataSetCollection.data_sets.length == 0) {
      return {
        ...initialDataSetCollectionState,
        error: { message: 'No data sets could not be found.' },
      };
    }

    return {
      ...dataSetCollection,
      loading: studyDetailsState.loading,
      success: studyDetailsState.success,
      error: studyDetailsState.error,
    };
  }
);

export const getCurrentTestSets = createSelector(
  getCurrentBenchmarkState,
  selectStudyDetailsState,
  (
    benchmarkState: BenchmarkState,
    studyDetailsState: StudyDetailsState
  ): DataSetCollectionState => {
    if (
      (benchmarkState && benchmarkState.loading) ||
      (studyDetailsState && studyDetailsState.loading)
    ) {
      return {
        ...initialDataSet,
        loading: true,
        success: false,
        error: benchmarkState.error || studyDetailsState.error,
      };
    }

    let dataSetCollection = { ...initialDataSetCollection };

    if (
      benchmarkState &&
      !benchmarkState.error &&
      studyDetailsState &&
      !studyDetailsState.error
    ) {
      dataSetCollection.data_sets = studyDetailsState.dataSets.filter(
        (value) => benchmarkState.test_set_ids.indexOf(value.id) >= 0
      );
    }

    if (dataSetCollection.data_sets.length == 0) {
      return {
        ...initialDataSetCollectionState,
        error: { message: 'No data sets could not be found.' },
      };
    }

    return {
      ...dataSetCollection,
      loading: studyDetailsState.loading,
      success: studyDetailsState.success,
      error: studyDetailsState.error,
    };
  }
);

const defaultColors = [
  'rgb(31, 119, 180)',
  'rgb(255, 127, 14)',
  'rgb(44, 160, 44)',
  'rgb(214, 39, 40)',
  'rgb(148, 103, 189)',
  'rgb(140, 86, 75)',
  'rgb(227, 119, 194)',
  'rgb(127, 127, 127)',
  'rgb(188, 189, 34)',
  'rgb(23, 190, 207)',
];

const toPropertyName = (propertyType: string, nComponents: number) => {
  const substanceName = nComponents > 2 ? '' : nComponents == 1 ? 'Pure' : 'Binary';
  return [substanceName, propertyType].join(' ');
};

export const getTestSummaryStatistics = createSelector(
  getCurrentStudyState,
  selectStudyDetailsState,
  (
    studyState: StudyState,
    studyDetailsState: StudyDetailsState,
    props
  ): TestSummaryStatisticsState => {
    // Check if both required states are still loading.
    if (studyState.loading || studyDetailsState.loading) {
      return {
        ...initialTestSummaryStatisticsState,
        loading: true,
      };
    }
    // Check if either of the required states has errored.
    if (studyState.error || studyDetailsState.error) {
      return {
        ...initialTestSummaryStatisticsState,
        error: studyState.error ? studyState.error : studyDetailsState.error,
      };
    }

    const statisticsType = props.statisticsType;

    let benchmarks: { [key: string]: Benchmark } = {};
    studyState.benchmarks.forEach((value) => (benchmarks[value.id] = value));

    let propertyNames = [];
    let forceFieldNames = [];

    let traces = [];

    for (let benchmarkResult of studyDetailsState.benchmarkResults) {
      const benchmark = benchmarks[benchmarkResult.id];

      const summaryStatistics = benchmarkResult.analysed_result.statistic_entries.filter(
        (value) => {
          const propertyName = toPropertyName(value.property_type, value.n_components);
          if (!propertyNames.includes(propertyName)) propertyNames.push(propertyName);

          return value.statistics_type == statisticsType && value.category == undefined;
        }
      );

      propertyNames.forEach((propertyName, index) => {
        const propertyData = summaryStatistics.filter((value) => {
          return (
            propertyName == toPropertyName(value.property_type, value.n_components)
          );
        });

        if (propertyData.length == 0) return;

        const forceFieldName = benchmark.optimization_id
          ? benchmark.optimization_id
          : benchmark.force_field_name;

        if (!forceFieldNames.includes(forceFieldName))
          forceFieldNames.push(forceFieldName);
        const forceFieldIndex = forceFieldNames.indexOf(forceFieldName);

        const trace: BarTrace = {
          type: 'bar',
          x: [forceFieldName],
          y: [propertyData[0].value],
          error_y: {
            type: 'data',
            symmetric: false,
            array: [Math.abs(propertyData[0].value - propertyData[0].upper_95_ci)],
            arrayminus: [Math.abs(propertyData[0].value - propertyData[0].lower_95_ci)],
          },
          legendgroup: forceFieldName,
          marker: { color: defaultColors[forceFieldIndex % defaultColors.length] },
          name: forceFieldName,
          xaxis: `x${index + 1}`,
          yaxis: `y${index + 1}`,
          index: index,
          showlegend: index == 0,
          hoverinfo: 'none',
        };

        traces.push(trace);
      });
    }

    return {
      traces: traces,
      propertyTitles: propertyNames,
      ...createDefaultLoadable(),
      success: true,
    };
  }
);

export const getTestResults = createSelector(
  getCurrentStudyState,
  selectStudyDetailsState,
  (studyState: StudyState, studyDetailsState: StudyDetailsState): TestResultsState => {
    // Check if both required states are still loading.
    if (studyState.loading || studyDetailsState.loading) {
      return {
        ...initialTestResultsState,
        loading: true,
      };
    }
    // Check if either of the required states has errored.
    if (studyState.error || studyDetailsState.error) {
      return {
        ...initialTestResultsState,
        error: studyState.error ? studyState.error : studyDetailsState.error,
      };
    }

    let benchmarks: { [key: string]: Benchmark } = {};
    studyState.benchmarks.forEach((value) => (benchmarks[value.id] = value));

    let benchmarkNames = [];
    let traces: { [propertyName: string]: ScatterTrace[] } = {};

    for (const benchmarkResult of studyDetailsState.benchmarkResults) {
      const benchmark = benchmarks[benchmarkResult.id];
      benchmarkNames.push(benchmark.name);

      const benchmarkTraces = {};

      // for (const resultEntry of benchmarkResult.analysed_result.results_entries) {
      //
      //   const propertyName = toPropertyName(resultEntry.property_type, resultEntry.components.length)
      //   if (benchmarkTraces[propertyName] == undefined) benchmarkTraces[propertyName] = {}
      //
      //   let tracesByCategory = benchmarkTraces[propertyName]
      //
      //   if (tracesByCategory[resultEntry.category] == undefined) {
      //
      //     const traceIndex = Object.keys(tracesByCategory).length
      //
      //     tracesByCategory[resultEntry.category] = {
      //       ...initialScatterTrace,
      //       name: resultEntry.category,
      //       legendgroup: resultEntry.category,
      //       marker: { color: defaultColors[traceIndex % defaultColors.length] },
      //       x: [],
      //       y: [],
      //       index: benchmarkNames.length - 1,
      //       showlegend: benchmarkNames.length == 1,
      //       hoverinfo: 'none',
      //     }
      //
      //     if (tracesByCategory[resultEntry.category].xaxis == 'x0') tracesByCategory[resultEntry.category].xaxis = 'x'
      //     if (tracesByCategory[resultEntry.category].yaxis == 'y0') tracesByCategory[resultEntry.category].yaxis = 'y'
      //   }
      //
      //   tracesByCategory[resultEntry.category].x.push(resultEntry.estimated_value)
      //   tracesByCategory[resultEntry.category].y.push(resultEntry.reference_value)
      // }

      for (let propertyName in benchmarkTraces) {
        if (traces[propertyName] == undefined) traces[propertyName] = [];
        traces[propertyName] = traces[propertyName].concat(
          Object.values(benchmarkTraces[propertyName])
        );
      }
    }

    return {
      traces: traces,
      benchmarkNames: benchmarkNames,
      ...createDefaultLoadable(),
      success: true,
    };
  }
);
