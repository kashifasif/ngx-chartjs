import { __rest } from 'tslib';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, NgZone, Output, ViewChild, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ChartjsComponent {
    /**
     * @param {?} zone
     */
    constructor(zone) {
        this.zone = zone;
        this.chartClick = new EventEmitter();
        /**
         * chart type
         */
        this.type = 'doughnut';
        this.height = 150;
        this.width = 300;
        this.legend = {
            display: true,
            position: 'bottom',
        };
        this.options = {};
        this.redraw = false;
        this.datasetKeyProvider = d => d.label;
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this.renderChart();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
        if (changes.firstChange) {
            return;
        }
        if (this.chartInstance && this.redraw) {
            this.chartInstance.destroy();
            this.renderChart();
            return;
        }
        this.updateChart();
    }
    /**
     * @return {?}
     */
    updateChart() {
        /** @type {?} */
        const data = this.transformData();
        if (!this.chartInstance) {
            return;
        }
        if (this.options) {
            // in order to allow for universal rendering, we import chart.js runtime with `require` to prevent node errors
            /** @type {?} */
            const Chart = require('chart.js');
            this.chartInstance.options = ((/** @type {?} */ (Chart))).helpers.configMerge(this.chartInstance.options, this.options);
        }
        // Pipe datasets to chart instance datasets enabling
        // seamless transitions
        /** @type {?} */
        const currentDatasets = (this.chartInstance.config.data &&
            this.chartInstance.config.data.datasets) ||
            [];
        /** @type {?} */
        const nextDatasets = data.datasets || [];
        /** @type {?} */
        const currentDatasetsIndexed = {};
        currentDatasets.forEach((x) => {
            currentDatasetsIndexed[this.datasetKeyProvider(x)] = x;
        });
        // We can safely replace the dataset array, as long as we retain the _meta property
        // on each dataset.
        this.chartInstance.config.data.datasets = nextDatasets.map(next => {
            /** @type {?} */
            const current = currentDatasetsIndexed[this.datasetKeyProvider(next)];
            if (current && current.type === next.type) {
                // Reassign all properties from next
                for (const nextProp of Object.keys(next)) {
                    // Data array can't be reassigned here.
                    if (nextProp !== 'data') {
                        current[nextProp] = next[nextProp];
                    }
                }
                // Remove properties from current if they was removed in next
                for (const currentProp of Object.keys(current)) {
                    // Be careful with _meta property
                    if (!next.hasOwnProperty(currentProp) && currentProp !== '_meta') {
                        delete current[currentProp];
                    }
                }
                // The data array must be edited in place. As chart.js adds listeners to it.
                current.data.splice(next.data.length);
                next.data.forEach((point, pid) => {
                    current.data[pid] = next.data[pid];
                });
                return current;
            }
            return next;
        });
        const rest = __rest(data, ["datasets"]);
        this.chartInstance.config.data = Object.assign({}, this.chartInstance.config.data, rest);
        this.chartInstance.update();
    }
    /**
     * @return {?}
     */
    renderChart() {
        /** @type {?} */
        const node = this.ref.nativeElement;
        /** @type {?} */
        const data = this.transformData();
        if (typeof this.legend !== 'undefined') {
            /** @type {?} */
            const legendOptions = Object.assign({}, this.legend, this.options.legend);
            this.options.legend = legendOptions;
        }
        // in order to allow for universal rendering, we import Codemirror runtime with `require` to prevent node errors
        /** @type {?} */
        const Chart = require('chart.js');
        this.zone.runOutsideAngular(() => {
            this.chartInstance = new Chart(node, {
                type: this.type,
                data,
                options: this.options,
                plugins: this.plugins,
            });
        });
    }
    /**
     * @return {?}
     */
    transformData() {
        if (!this.data) {
            return;
        }
        if (typeof this.data === 'function') {
            /** @type {?} */
            const node = this.ref;
            return this.data(node);
        }
        return this.data;
    }
    /**
     * @param {?} $event
     * @return {?}
     */
    handleOnClick($event) {
        this.chartClick.emit({
            elements: this.chartInstance.getElementsAtEvent($event),
            element: this.chartInstance.getElementAtEvent($event),
            dataset: this.chartInstance.getDatasetAtEvent($event),
            $event,
        });
    }
}
ChartjsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-chartjs',
                template: `
  <!-- wrapping div required for height, width to work -->
  <div>
    <canvas
      #ref
      [attr.height]="height"
      [attr.width]="width"
      (click)="handleOnClick($event)"
    ></canvas>
  </div>
  `,
                changeDetection: ChangeDetectionStrategy.OnPush
            }] }
];
/** @nocollapse */
ChartjsComponent.ctorParameters = () => [
    { type: NgZone }
];
ChartjsComponent.propDecorators = {
    ref: [{ type: ViewChild, args: ['ref',] }],
    chartClick: [{ type: Output }],
    type: [{ type: Input }],
    data: [{ type: Input }],
    height: [{ type: Input }],
    width: [{ type: Input }],
    legend: [{ type: Input }],
    options: [{ type: Input }],
    plugins: [{ type: Input }],
    redraw: [{ type: Input }],
    datasetKeyProvider: [{ type: Input }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class ChartjsModule {
}
ChartjsModule.decorators = [
    { type: NgModule, args: [{
                exports: [ChartjsComponent],
                declarations: [ChartjsComponent],
            },] }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { ChartjsComponent, ChartjsModule };

//# sourceMappingURL=ctrl-ngx-chartjs.js.map