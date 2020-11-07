import { createFeatureSelector, createSelector } from '@ngrx/store';

import { StudyState } from '@core/store/project/project.interfaces';
import { getCurrentStudyState } from '@core/store/project/project.selectors';

import { BenchmarkResultsState } from '@core/store/benchmark-results/benchmark-results.interfaces';

import { createDefaultLoadable } from '@core/loadable/loadable';
import { initialPlotData, PlotData } from '@shared/components/plotly/plotly.interfaces';
import { Benchmark } from '@core/models/projects';
import { BarTrace, defaultColors } from '@core/models/plotting';

export const selectBenchmarkResultsState = createFeatureSelector<BenchmarkResultsState>(
  'benchmarkResults'
);
export const getHasBenchmarkResultsLoaded = createSelector(
  selectBenchmarkResultsState,
  (state: BenchmarkResultsState, props) => {
    if (state.projectId != props.projectId || state.studyId != props.studyId)
      return false;
    return state.loading || state.success || state.error != null;
  }
);

const toPropertyName = (propertyType: string, nComponents: number) => {
  const substanceName = nComponents > 2 ? '' : nComponents == 1 ? 'Pure' : 'Binary';
  return [substanceName, propertyType].join(' ');
};

export const getBenchmarkRMSEPlot = createSelector(
  getCurrentStudyState,
  selectBenchmarkResultsState,
  (studyState: StudyState, resultsState: BenchmarkResultsState): PlotData => {
    if (!studyState || !resultsState) return null;

    // Check if both required states are available.
    if (!studyState.success || !resultsState.success) {
      return {
        ...initialPlotData,
        loading: studyState.loading || resultsState.loading,
        error: studyState.error ? studyState.error : resultsState.error
      };
    }

    // Partition the benchmarks into an easier to access dictionary.
    let benchmarks: { [k: string]: Benchmark } = studyState.benchmarks.reduce(
      (dict, item) => {
        dict[item.id] = item;
        return dict;
      }, {}
    );

    let propertyNames = [];
    let forceFieldNames = [];

    let traces = [];

    for (let benchmarkResult of resultsState.results) {
      if (benchmarkResult == undefined) continue;

      const benchmark = benchmarks[benchmarkResult.id];

      const summaryStatistics = benchmarkResult.data_set_result.statistic_entries.filter(
        (value) => {
          const propertyName = toPropertyName(value.property_type, value.n_components);
          if (!propertyNames.includes(propertyName)) propertyNames.push(propertyName);

          return value.statistics_type == 'RMSE' && value.category == undefined;
        }
      );

      propertyNames.forEach((propertyName, index) => {
        const propertyData = summaryStatistics.filter((value) => {
          return (
            propertyName == toPropertyName(value.property_type, value.n_components)
          );
        });

        if (propertyData.length == 0) return;

        const forceFieldName = benchmark.name;

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
            arrayminus: [Math.abs(propertyData[0].value - propertyData[0].lower_95_ci)]
          },
          legendgroup: forceFieldName,
          marker: { color: defaultColors[forceFieldIndex % defaultColors.length] },
          name: forceFieldName,
          xaxis: `x${index + 1}`,
          yaxis: `y${index + 1}`,
          index: index,
          showlegend: index == 0,
          hoverinfo: 'none'
        };

        traces.push(trace);
      });
    }

    return {
      traces: traces,
      subplotTitles: propertyNames,
      ...createDefaultLoadable(),
      success: true
    };
  }
);

export const getBenchmarkScatterPlot = createSelector(
  getCurrentStudyState,
  selectBenchmarkResultsState,
  (studyState: StudyState, resultsState: BenchmarkResultsState): TestResultsState => {
    if (!studyState || !resultsState) return null;

    // Check if both required states are available.
    if (!studyState.success || !resultsState.success) {
      return {
        ...initialPlotData,
        loading: studyState.loading || resultsState.loading,
        error: studyState.error ? studyState.error : resultsState.error
      };
    }

    // Partition the benchmarks into an easier to access dictionary.
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
    const dataSets = resultsState.dataSets.filter((x) =>
      dataSetIds.includes(x.id)
    );

    let dataEntries: { [key: string]: DataSetEntry } = {};
    dataSets.forEach((dataSet) =>
      dataSet.entries.forEach((x) => (dataEntries[x.id] = x))
    );

    let benchmarkNames = [];
    let traces: { [propertyName: string]: ScatterTrace[] } = {};

    for (const benchmarkResult of resultsState.benchmarkResults) {
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
            hoverinfo: 'none'
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
      success: true
    };

    for (const propertyName in traces) {
      plotData.plotData[propertyName] = {
        ...createDefaultLoadable(),
        traces: traces[propertyName],
        subplotTitles: benchmarkNames,
        success: true
      };
    }

    return plotData;
  }
);

// export const getObjectiveFunction = createSelector(
//   getCurrentOptimizationState,
//   selectBenchmarkResultsState,
//   (
//     optimizationState: OptimizationState,
//     BenchmarkResultsState: BenchmarkResultsState
//   ): PlotData => {
//     if (!optimizationState || !BenchmarkResultsState) return null;
//     return null
//     //
//     // // Check if both required states are still loading.
//     // if (optimizationState.loading || BenchmarkResultsState.loading) {
//     //   return {
//     //     ...initialPlotData,
//     //     loading: true,
//     //   };
//     // }
//     //
//     // // Check if either of the required states has errored.
//     // if (optimizationState.error || BenchmarkResultsState.error) {
//     //   return {
//     //     ...initialPlotData,
//     //     error: optimizationState.error
//     //       ? optimizationState.error
//     //       : BenchmarkResultsState.error,
//     //   };
//     // }
//     //
//     // const optimizationResult = BenchmarkResultsState.optimizationResults.find(
//     //   (x) => x.id == optimizationState.id
//     // );
//     //
//     // const trace = {
//     //   ...initialScatterTrace,
//     //   name: optimizationState.name,
//     //   x: [],
//     //   y: [],
//     //   index: 0,
//     //   showlegend: false,
//     //   marker: { color: defaultColors[0] },
//     //   mode: 'lines+markers',
//     // };
//     //
//     // const iterations = Object.keys(optimizationResult.objective_function).sort(
//     //   (a, b) => {
//     //     return +a - +b;
//     //   }
//     // );
//     //
//     // for (let iteration of iterations) {
//     //   const value = optimizationResult.objective_function[iteration];
//     //
//     //   trace.x.push(+iteration);
//     //   trace.y.push(value);
//     // }
//     //
//     // return {
//     //   ...createDefaultLoadable(),
//     //   traces: [trace],
//     //   subplotTitles: ['Iteration'],
//     //   success: true,
//     // };
//   }
// );
//
// export const getIterationRMSE = createSelector(
//   getCurrentOptimizationState,
//   selectBenchmarkResultsState,
//   (
//     optimizationState: OptimizationState,
//     BenchmarkResultsState: BenchmarkResultsState
//   ) => {
//     if (!optimizationState || !BenchmarkResultsState) return null;
//     return null
//     //
//     // // Check if both required states are still loading.
//     // if (optimizationState.loading || BenchmarkResultsState.loading) {
//     //   return {
//     //     ...initialTrainingResultsState,
//     //     loading: true,
//     //   };
//     // }
//     //
//     // // Check if either of the required states has errored.
//     // if (optimizationState.error || BenchmarkResultsState.error) {
//     //   return {
//     //     ...initialTrainingResultsState,
//     //     error: optimizationState.error
//     //       ? optimizationState.error
//     //       : BenchmarkResultsState.error,
//     //   };
//     // }
//     //
//     // const optimizationResult = BenchmarkResultsState.optimizationResults.find(
//     //   (x) => x.id == optimizationState.id
//     // );
//     //
//     // let traces: { [propertyName: string]: { [category: string]: BarTrace } } = {};
//     // const categoryColors = {};
//     //
//     // const iterations = Object.keys(optimizationResult.statistics).sort((a, b) => {
//     //   return +a - +b;
//     // });
//     //
//     // for (const iteration of iterations) {
//     //   const statisticEntries = optimizationResult.statistics[iteration];
//     //
//     //   for (const statisticEntry of statisticEntries) {
//     //     if (!statisticEntry.category) continue;
//     //
//     //     const propertyName = toPropertyName(
//     //       statisticEntry.property_type,
//     //       statisticEntry.n_components
//     //     );
//     //
//     //     if (!traces[propertyName]) traces[propertyName] = {};
//     //
//     //     if (!categoryColors[statisticEntry.category]) {
//     //       const categoryIndex = Object.keys(categoryColors).length;
//     //       categoryColors[statisticEntry.category] =
//     //         defaultColors[categoryIndex % defaultColors.length];
//     //     }
//     //
//     //     if (traces[propertyName][statisticEntry.category] == undefined) {
//     //       traces[propertyName][statisticEntry.category] = {
//     //         ...initialBarTrace,
//     //         x: [],
//     //         y: [],
//     //         error_y: {
//     //           type: 'data',
//     //           symmetric: false,
//     //
//     //           array: [],
//     //           arrayminus: [],
//     //         },
//     //         name: statisticEntry.category,
//     //         legendgroup: statisticEntry.category,
//     //         marker: { color: categoryColors[statisticEntry.category] },
//     //         showlegend: true,
//     //       };
//     //     }
//     //
//     //     let trace = traces[propertyName][statisticEntry.category];
//     //
//     //     trace.x.push(iteration);
//     //     trace.y.push(statisticEntry.value);
//     //
//     //     trace.error_y.array.push(
//     //       Math.abs(statisticEntry.value - statisticEntry.upper_95_ci)
//     //     );
//     //     trace.error_y.arrayminus.push(
//     //       Math.abs(statisticEntry.value - statisticEntry.lower_95_ci)
//     //     );
//     //   }
//     // }
//     //
//     // let return_data = {
//     //   ...initialTrainingResultsState,
//     //   success: true,
//     //   plotData: {},
//     // };
//     //
//     // for (const propertyName in traces) {
//     //   return_data.plotData[propertyName] = {
//     //     traces: Object.values(traces[propertyName]),
//     //     subplotTitles: ['Iteration'],
//     //   };
//     // }
//     //
//     // return return_data;
//   }
// );
