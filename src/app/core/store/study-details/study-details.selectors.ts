import { createFeatureSelector, createSelector } from '@ngrx/store';
import {
  BarTrace,
  initialBarTrace,
  initialScatterTrace,
  initialTestResultsState,
  initialTrainingResultsState,
  ScatterTrace,
  StudyDetailsState,
  TestResultsState,
  TrainingResultsState,
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
import { initialPlotData, PlotData } from '@shared/components/plotly/plotly.interfaces';
import { DataSetEntry } from '@core/models/datasets';

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
    if (!optimizationState || !studyDetailsState) return null;

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
    if (!benchmarkState || !studyDetailsState) return null;

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

export const getTestSummaryPlot = createSelector(
  getCurrentStudyState,
  selectStudyDetailsState,
  (studyState: StudyState, studyDetailsState: StudyDetailsState, props): PlotData => {
    if (!studyState || !studyDetailsState) return null;

    // Check if both required states are still loading.
    if (studyState.loading || studyDetailsState.loading) {
      return {
        ...initialPlotData,
        loading: true,
      };
    }
    // Check if either of the required states has errored.
    if (studyState.error || studyDetailsState.error) {
      return {
        ...initialPlotData,
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
      if (benchmarkResult == undefined) continue;

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
          : benchmark.id;

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
      subplotTitles: propertyNames,
      ...createDefaultLoadable(),
      success: true,
    };
  }
);

export const getTestScatterPlot = createSelector(
  getCurrentStudyState,
  selectStudyDetailsState,
  (studyState: StudyState, studyDetailsState: StudyDetailsState): TestResultsState => {
    if (!studyState || !studyDetailsState) return null;

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

    const benchmarks: { [key: string]: Benchmark } = {};
    const dataSetIds: string[] = [];

    studyState.benchmarks.forEach((value) => {
      benchmarks[value.id] = value;

      value.test_set_ids.forEach((x) => {
        if (dataSetIds.includes(x)) return;
        dataSetIds.push(x);
      });
    });

    // Find all of the reference data points and store them in a dictionary by their id.
    const dataSets = studyDetailsState.dataSets.filter((x) =>
      dataSetIds.includes(x.id)
    );

    let dataEntries: { [key: string]: DataSetEntry } = {};
    dataSets.forEach((dataSet) =>
      dataSet.entries.forEach((x) => (dataEntries[x.id] = x))
    );

    let benchmarkNames = [];
    let traces: { [propertyName: string]: ScatterTrace[] } = {};

    for (const benchmarkResult of studyDetailsState.benchmarkResults) {
      const benchmark = benchmarks[benchmarkResult.id];
      benchmarkNames.push(benchmark.name);

      const benchmarkTraces = {};

      for (const resultEntry of benchmarkResult.analysed_result.results_entries) {
        const referenceEntry = dataEntries[resultEntry.reference_id];
        const category = resultEntry.category
          .replace('<', '+')
          .replace('>', '+')
          .replace('~', '+');

        const propertyName = toPropertyName(
          referenceEntry.property_type,
          referenceEntry.components.length
        );
        if (benchmarkTraces[propertyName] == undefined)
          benchmarkTraces[propertyName] = {};

        let tracesByCategory = benchmarkTraces[propertyName];

        if (tracesByCategory[category] == undefined) {
          const traceIndex = Object.keys(tracesByCategory).length;

          tracesByCategory[category] = {
            ...initialScatterTrace,
            name: category,
            legendgroup: category,
            marker: { color: defaultColors[traceIndex % defaultColors.length] },
            x: [],
            y: [],
            index: benchmarkNames.length - 1,
            showlegend: benchmarkNames.length == 1,
            hoverinfo: 'none',
          };

          if (tracesByCategory[category].xaxis == 'x0')
            tracesByCategory[category].xaxis = 'x';
          if (tracesByCategory[category].yaxis == 'y0')
            tracesByCategory[category].yaxis = 'y';
        }

        tracesByCategory[category].x.push(resultEntry.estimated_value);
        tracesByCategory[category].y.push(referenceEntry.value);
      }

      for (const propertyName in benchmarkTraces) {
        if (traces[propertyName] == undefined) traces[propertyName] = [];
        traces[propertyName] = traces[propertyName].concat(
          Object.values(benchmarkTraces[propertyName])
        );
      }
    }

    const plotData: TestResultsState = {
      ...createDefaultLoadable(),
      ...initialTestResultsState,
      success: true,
    };

    for (const propertyName in traces) {
      plotData.plotData[propertyName] = {
        ...createDefaultLoadable(),
        traces: traces[propertyName],
        subplotTitles: benchmarkNames,
        success: true,
      };
    }

    return plotData;
  }
);

export const getObjectiveFunction = createSelector(
  getCurrentOptimizationState,
  selectStudyDetailsState,
  (
    optimizationState: OptimizationState,
    studyDetailsState: StudyDetailsState
  ): PlotData => {
    if (!optimizationState || !studyDetailsState) return null;

    // Check if both required states are still loading.
    if (optimizationState.loading || studyDetailsState.loading) {
      return {
        ...initialPlotData,
        loading: true,
      };
    }

    // Check if either of the required states has errored.
    if (optimizationState.error || studyDetailsState.error) {
      return {
        ...initialPlotData,
        error: optimizationState.error
          ? optimizationState.error
          : studyDetailsState.error,
      };
    }

    const optimizationResult = studyDetailsState.optimizationResults.find(
      (x) => x.id == optimizationState.id
    );

    const trace = {
      ...initialScatterTrace,
      name: optimizationState.name,
      x: [],
      y: [],
      index: 0,
      showlegend: false,
      marker: { color: defaultColors[0] },
      mode: 'lines+markers',
    };

    const iterations = Object.keys(optimizationResult.objective_function).sort(
      (a, b) => {
        return +a - +b;
      }
    );

    for (let iteration of iterations) {
      const value = optimizationResult.objective_function[iteration];

      trace.x.push(+iteration);
      trace.y.push(value);
    }

    return {
      ...createDefaultLoadable(),
      traces: [trace],
      subplotTitles: ['Iteration'],
      success: true,
    };
  }
);

export const getIterationRMSE = createSelector(
  getCurrentOptimizationState,
  selectStudyDetailsState,
  (
    optimizationState: OptimizationState,
    studyDetailsState: StudyDetailsState
  ): TrainingResultsState => {
    if (!optimizationState || !studyDetailsState) return null;

    // Check if both required states are still loading.
    if (optimizationState.loading || studyDetailsState.loading) {
      return {
        ...initialTrainingResultsState,
        loading: true,
      };
    }

    // Check if either of the required states has errored.
    if (optimizationState.error || studyDetailsState.error) {
      return {
        ...initialTrainingResultsState,
        error: optimizationState.error
          ? optimizationState.error
          : studyDetailsState.error,
      };
    }

    const optimizationResult = studyDetailsState.optimizationResults.find(
      (x) => x.id == optimizationState.id
    );

    let traces: { [propertyName: string]: { [category: string]: BarTrace } } = {};
    const categoryColors = {};

    const iterations = Object.keys(optimizationResult.statistics).sort((a, b) => {
      return +a - +b;
    });

    for (const iteration of iterations) {
      const statisticEntries = optimizationResult.statistics[iteration];

      for (const statisticEntry of statisticEntries) {
        if (!statisticEntry.category) continue;

        const propertyName = toPropertyName(
          statisticEntry.property_type,
          statisticEntry.n_components
        );

        if (!traces[propertyName]) traces[propertyName] = {};

        if (!categoryColors[statisticEntry.category]) {
          const categoryIndex = Object.keys(categoryColors).length;
          categoryColors[statisticEntry.category] =
            defaultColors[categoryIndex % defaultColors.length];
        }

        if (traces[propertyName][statisticEntry.category] == undefined) {
          traces[propertyName][statisticEntry.category] = {
            ...initialBarTrace,
            x: [],
            y: [],
            error_y: {
              type: 'data',
              symmetric: false,

              array: [],
              arrayminus: [],
            },
            name: statisticEntry.category,
            legendgroup: statisticEntry.category,
            marker: { color: categoryColors[statisticEntry.category] },
            showlegend: true,
          };
        }

        let trace = traces[propertyName][statisticEntry.category];

        trace.x.push(iteration);
        trace.y.push(statisticEntry.value);

        trace.error_y.array.push(
          Math.abs(statisticEntry.value - statisticEntry.upper_95_ci)
        );
        trace.error_y.arrayminus.push(
          Math.abs(statisticEntry.value - statisticEntry.lower_95_ci)
        );
      }
    }

    let return_data = {
      ...initialTrainingResultsState,
      success: true,
      plotData: {},
    };

    for (const propertyName in traces) {
      return_data.plotData[propertyName] = {
        traces: Object.values(traces[propertyName]),
        subplotTitles: ['Iteration'],
      };
    }

    return return_data;
  }
);
