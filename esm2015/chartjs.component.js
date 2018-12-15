/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild, } from '@angular/core';
export class ChartjsComponent {
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
        const { datasets } = data, rest = tslib_1.__rest(data, ["datasets"]);
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
if (false) {
    /** @type {?} */
    ChartjsComponent.prototype.chartInstance;
    /** @type {?} */
    ChartjsComponent.prototype.ref;
    /** @type {?} */
    ChartjsComponent.prototype.chartClick;
    /**
     * chart type
     * @type {?}
     */
    ChartjsComponent.prototype.type;
    /** @type {?} */
    ChartjsComponent.prototype.data;
    /** @type {?} */
    ChartjsComponent.prototype.height;
    /** @type {?} */
    ChartjsComponent.prototype.width;
    /** @type {?} */
    ChartjsComponent.prototype.legend;
    /** @type {?} */
    ChartjsComponent.prototype.options;
    /** @type {?} */
    ChartjsComponent.prototype.plugins;
    /** @type {?} */
    ChartjsComponent.prototype.redraw;
    /** @type {?} */
    ChartjsComponent.prototype.datasetKeyProvider;
    /**
     * @type {?}
     * @private
     */
    ChartjsComponent.prototype.zone;
}
/**
 * @record
 */
export function ChartClickEvent() { }
if (false) {
    /** @type {?} */
    ChartClickEvent.prototype.elements;
    /** @type {?} */
    ChartClickEvent.prototype.element;
    /** @type {?} */
    ChartClickEvent.prototype.dataset;
    /** @type {?} */
    ChartClickEvent.prototype.$event;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRqcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY3RybC9uZ3gtY2hhcnRqcy8iLCJzb3VyY2VzIjpbImNoYXJ0anMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUF5QnZCLE1BQU0sT0FBTyxnQkFBZ0I7Ozs7SUFtQjNCLFlBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBaEJ0QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7Ozs7UUFFbEQsU0FBSSxHQUF1QixVQUFVLENBQUM7UUFFdEMsV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUNiLFVBQUssR0FBRyxHQUFHLENBQUM7UUFFckIsV0FBTSxHQUE2QjtZQUNqQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUM7UUFDTyxZQUFPLEdBQXVCLEVBQUUsQ0FBQztRQUVqQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsdUJBQWtCLEdBQXVCLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztJQUU1QixDQUFDOzs7O0lBRXBDLGVBQWU7UUFDYixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxXQUFXLENBQUMsT0FBWTtRQUN0QixJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3JCLENBQUM7Ozs7SUFFRCxXQUFXOztjQUNILElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1FBRWpDLElBQUksQ0FBQyxJQUFJLENBQUMsYUFBYSxFQUFFO1lBQ3ZCLE9BQU87U0FDUjtRQUVELElBQUksSUFBSSxDQUFDLE9BQU8sRUFBRTs7O2tCQUVWLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxHQUFHLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUM3RCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFDMUIsSUFBSSxDQUFDLE9BQU8sQ0FDYixDQUFDO1NBQ0g7Ozs7Y0FJSyxlQUFlLEdBQ25CLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSTtZQUM3QixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQzFDLEVBQUU7O2NBQ0UsWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLElBQUksRUFBRTs7Y0FFbEMsc0JBQXNCLEdBQUcsRUFBRTtRQUNqQyxlQUFlLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7WUFDNUIsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3pELENBQUMsQ0FBQyxDQUFDO1FBRUgsbUZBQW1GO1FBQ25GLG1CQUFtQjtRQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUU7O2tCQUMxRCxPQUFPLEdBQUcsc0JBQXNCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJFLElBQUksT0FBTyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRTtnQkFDekMsb0NBQW9DO2dCQUNwQyxLQUFLLE1BQU0sUUFBUSxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ3hDLHVDQUF1QztvQkFDdkMsSUFBSSxRQUFRLEtBQUssTUFBTSxFQUFFO3dCQUN2QixPQUFPLENBQUMsUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO3FCQUNwQztpQkFDRjtnQkFDRCw2REFBNkQ7Z0JBQzdELEtBQUssTUFBTSxXQUFXLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRTtvQkFDOUMsaUNBQWlDO29CQUNqQyxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsSUFBSSxXQUFXLEtBQUssT0FBTyxFQUFFO3dCQUNoRSxPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUMsQ0FBQztxQkFDN0I7aUJBQ0Y7Z0JBQ0QsNEVBQTRFO2dCQUM1RSxPQUFPLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUN0QyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDL0IsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUNyQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxPQUFPLE9BQU8sQ0FBQzthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQyxDQUFDLENBQUM7Y0FFRyxFQUFFLFFBQVEsS0FBYyxJQUFJLEVBQWhCLHlDQUFPO1FBRXpCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQ3pCLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUksRUFDOUIsSUFBSSxDQUNSLENBQUM7UUFFRixJQUFJLENBQUMsYUFBYSxDQUFDLE1BQU0sRUFBRSxDQUFDO0lBQzlCLENBQUM7Ozs7SUFFRCxXQUFXOztjQUNILElBQUksR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWE7O2NBQzdCLElBQUksR0FBRyxJQUFJLENBQUMsYUFBYSxFQUFFO1FBRWpDLElBQUksT0FBTyxJQUFJLENBQUMsTUFBTSxLQUFLLFdBQVcsRUFBRTs7a0JBQ2hDLGFBQWEscUJBQVEsSUFBSSxDQUFDLE1BQU0sRUFBSyxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBRTtZQUNoRSxJQUFJLENBQUMsT0FBTyxDQUFDLE1BQU0sR0FBRyxhQUFhLENBQUM7U0FDckM7OztjQUdLLEtBQUssR0FBRyxPQUFPLENBQUMsVUFBVSxDQUFDO1FBRWpDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxFQUFFO1lBQy9CLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxLQUFLLENBQUMsSUFBSSxFQUFFO2dCQUNuQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUk7Z0JBQ2YsSUFBSTtnQkFDSixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ3JCLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTzthQUN0QixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7Ozs7SUFFRCxhQUFhO1FBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDZCxPQUFPO1NBQ1I7UUFDRCxJQUFJLE9BQU8sSUFBSSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7O2tCQUM3QixJQUFJLEdBQUcsSUFBSSxDQUFDLEdBQUc7WUFDckIsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hCO1FBQ0QsT0FBTyxJQUFJLENBQUMsSUFBSSxDQUFDO0lBQ25CLENBQUM7Ozs7O0lBRUQsYUFBYSxDQUFDLE1BQWE7UUFDekIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUM7WUFDbkIsUUFBUSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsTUFBTSxDQUFDO1lBQ3ZELE9BQU8sRUFBRSxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQixDQUFDLE1BQU0sQ0FBQztZQUNyRCxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUM7WUFDckQsTUFBTTtTQUNQLENBQUMsQ0FBQztJQUNMLENBQUM7OztZQWpLRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGFBQWE7Z0JBQ3ZCLFFBQVEsRUFBRTs7Ozs7Ozs7OztHQVVUO2dCQUNELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2FBQ2hEOzs7O1lBNUJDLE1BQU07OztrQkErQkwsU0FBUyxTQUFDLEtBQUs7eUJBQ2YsTUFBTTttQkFFTixLQUFLO21CQUNMLEtBQUs7cUJBQ0wsS0FBSztvQkFDTCxLQUFLO3FCQUNMLEtBQUs7c0JBS0wsS0FBSztzQkFDTCxLQUFLO3FCQUNMLEtBQUs7aUNBQ0wsS0FBSzs7OztJQWhCTix5Q0FBbUI7O0lBQ25CLCtCQUFxRDs7SUFDckQsc0NBQTJEOzs7OztJQUUzRCxnQ0FBK0M7O0lBQy9DLGdDQUErQjs7SUFDL0Isa0NBQXNCOztJQUN0QixpQ0FBcUI7O0lBQ3JCLGtDQUlFOztJQUNGLG1DQUEwQzs7SUFDMUMsbUNBQXdCOztJQUN4QixrQ0FBd0I7O0lBQ3hCLDhDQUErRDs7Ozs7SUFFbkQsZ0NBQW9COzs7OztBQWtJbEMscUNBS0M7OztJQUpDLG1DQUFnQjs7SUFDaEIsa0NBQWE7O0lBQ2Isa0NBQWU7O0lBQ2YsaUNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBOZ1pvbmUsXG4gIE9uQ2hhbmdlcyxcbiAgT3V0cHV0LFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgQ2hhcnREYXRhLFxuICBDaGFydExlZ2VuZE9wdGlvbnMsXG4gIENoYXJ0T3B0aW9ucyxcbiAgQ2hhcnRUeXBlLFxufSBmcm9tICdjaGFydC5qcyc7XG5cbmRlY2xhcmUgdmFyIHJlcXVpcmU6IGFueTtcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnbmd4LWNoYXJ0anMnLFxuICB0ZW1wbGF0ZTogYFxuICA8IS0tIHdyYXBwaW5nIGRpdiByZXF1aXJlZCBmb3IgaGVpZ2h0LCB3aWR0aCB0byB3b3JrIC0tPlxuICA8ZGl2PlxuICAgIDxjYW52YXNcbiAgICAgICNyZWZcbiAgICAgIFthdHRyLmhlaWdodF09XCJoZWlnaHRcIlxuICAgICAgW2F0dHIud2lkdGhdPVwid2lkdGhcIlxuICAgICAgKGNsaWNrKT1cImhhbmRsZU9uQ2xpY2soJGV2ZW50KVwiXG4gICAgPjwvY2FudmFzPlxuICA8L2Rpdj5cbiAgYCxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG59KVxuZXhwb3J0IGNsYXNzIENoYXJ0anNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkNoYW5nZXMge1xuICBjaGFydEluc3RhbmNlOiBhbnk7XG4gIEBWaWV3Q2hpbGQoJ3JlZicpIHJlZjogRWxlbWVudFJlZjxIVE1MQ2FudmFzRWxlbWVudD47XG4gIEBPdXRwdXQoKSBjaGFydENsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxDaGFydENsaWNrRXZlbnQ+KCk7XG4gIC8qKiBjaGFydCB0eXBlICovXG4gIEBJbnB1dCgpIHR5cGU6IENoYXJ0VHlwZSB8IHN0cmluZyA9ICdkb3VnaG51dCc7XG4gIEBJbnB1dCgpIGRhdGE6IENoYXJ0RGF0YSB8IGFueTtcbiAgQElucHV0KCkgaGVpZ2h0ID0gMTUwO1xuICBASW5wdXQoKSB3aWR0aCA9IDMwMDtcbiAgQElucHV0KClcbiAgbGVnZW5kOiBDaGFydExlZ2VuZE9wdGlvbnMgfCBhbnkgPSB7XG4gICAgZGlzcGxheTogdHJ1ZSxcbiAgICBwb3NpdGlvbjogJ2JvdHRvbScsXG4gIH07XG4gIEBJbnB1dCgpIG9wdGlvbnM6IENoYXJ0T3B0aW9ucyB8IGFueSA9IHt9O1xuICBASW5wdXQoKSBwbHVnaW5zOiBhbnlbXTtcbiAgQElucHV0KCkgcmVkcmF3ID0gZmFsc2U7XG4gIEBJbnB1dCgpIGRhdGFzZXRLZXlQcm92aWRlcjogKHg6IGFueSkgPT4gc3RyaW5nID0gZCA9PiBkLmxhYmVsO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgem9uZTogTmdab25lKSB7fVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpIHtcbiAgICB0aGlzLnJlbmRlckNoYXJ0KCk7XG4gIH1cbiAgbmdPbkNoYW5nZXMoY2hhbmdlczogYW55KSB7XG4gICAgaWYgKGNoYW5nZXMuZmlyc3RDaGFuZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHRoaXMuY2hhcnRJbnN0YW5jZSAmJiB0aGlzLnJlZHJhdykge1xuICAgICAgdGhpcy5jaGFydEluc3RhbmNlLmRlc3Ryb3koKTtcbiAgICAgIHRoaXMucmVuZGVyQ2hhcnQoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy51cGRhdGVDaGFydCgpO1xuICB9XG5cbiAgdXBkYXRlQ2hhcnQoKSB7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMudHJhbnNmb3JtRGF0YSgpO1xuXG4gICAgaWYgKCF0aGlzLmNoYXJ0SW5zdGFuY2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5vcHRpb25zKSB7XG4gICAgICAvLyBpbiBvcmRlciB0byBhbGxvdyBmb3IgdW5pdmVyc2FsIHJlbmRlcmluZywgd2UgaW1wb3J0IGNoYXJ0LmpzIHJ1bnRpbWUgd2l0aCBgcmVxdWlyZWAgdG8gcHJldmVudCBub2RlIGVycm9yc1xuICAgICAgY29uc3QgQ2hhcnQgPSByZXF1aXJlKCdjaGFydC5qcycpO1xuICAgICAgdGhpcy5jaGFydEluc3RhbmNlLm9wdGlvbnMgPSAoQ2hhcnQgYXMgYW55KS5oZWxwZXJzLmNvbmZpZ01lcmdlKFxuICAgICAgICB0aGlzLmNoYXJ0SW5zdGFuY2Uub3B0aW9ucyxcbiAgICAgICAgdGhpcy5vcHRpb25zLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBQaXBlIGRhdGFzZXRzIHRvIGNoYXJ0IGluc3RhbmNlIGRhdGFzZXRzIGVuYWJsaW5nXG4gICAgLy8gc2VhbWxlc3MgdHJhbnNpdGlvbnNcbiAgICBjb25zdCBjdXJyZW50RGF0YXNldHM6IGFueVtdID1cbiAgICAgICh0aGlzLmNoYXJ0SW5zdGFuY2UuY29uZmlnLmRhdGEgJiZcbiAgICAgICAgdGhpcy5jaGFydEluc3RhbmNlLmNvbmZpZy5kYXRhLmRhdGFzZXRzKSB8fFxuICAgICAgW107XG4gICAgY29uc3QgbmV4dERhdGFzZXRzID0gZGF0YS5kYXRhc2V0cyB8fCBbXTtcblxuICAgIGNvbnN0IGN1cnJlbnREYXRhc2V0c0luZGV4ZWQgPSB7fTtcbiAgICBjdXJyZW50RGF0YXNldHMuZm9yRWFjaCgoeCkgPT4ge1xuICAgICAgY3VycmVudERhdGFzZXRzSW5kZXhlZFt0aGlzLmRhdGFzZXRLZXlQcm92aWRlcih4KV0gPSB4O1xuICAgIH0pO1xuXG4gICAgLy8gV2UgY2FuIHNhZmVseSByZXBsYWNlIHRoZSBkYXRhc2V0IGFycmF5LCBhcyBsb25nIGFzIHdlIHJldGFpbiB0aGUgX21ldGEgcHJvcGVydHlcbiAgICAvLyBvbiBlYWNoIGRhdGFzZXQuXG4gICAgdGhpcy5jaGFydEluc3RhbmNlLmNvbmZpZy5kYXRhLmRhdGFzZXRzID0gbmV4dERhdGFzZXRzLm1hcChuZXh0ID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBjdXJyZW50RGF0YXNldHNJbmRleGVkW3RoaXMuZGF0YXNldEtleVByb3ZpZGVyKG5leHQpXTtcblxuICAgICAgaWYgKGN1cnJlbnQgJiYgY3VycmVudC50eXBlID09PSBuZXh0LnR5cGUpIHtcbiAgICAgICAgLy8gUmVhc3NpZ24gYWxsIHByb3BlcnRpZXMgZnJvbSBuZXh0XG4gICAgICAgIGZvciAoY29uc3QgbmV4dFByb3Agb2YgT2JqZWN0LmtleXMobmV4dCkpIHtcbiAgICAgICAgICAvLyBEYXRhIGFycmF5IGNhbid0IGJlIHJlYXNzaWduZWQgaGVyZS5cbiAgICAgICAgICBpZiAobmV4dFByb3AgIT09ICdkYXRhJykge1xuICAgICAgICAgICAgY3VycmVudFtuZXh0UHJvcF0gPSBuZXh0W25leHRQcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gUmVtb3ZlIHByb3BlcnRpZXMgZnJvbSBjdXJyZW50IGlmIHRoZXkgd2FzIHJlbW92ZWQgaW4gbmV4dFxuICAgICAgICBmb3IgKGNvbnN0IGN1cnJlbnRQcm9wIG9mIE9iamVjdC5rZXlzKGN1cnJlbnQpKSB7XG4gICAgICAgICAgLy8gQmUgY2FyZWZ1bCB3aXRoIF9tZXRhIHByb3BlcnR5XG4gICAgICAgICAgaWYgKCFuZXh0Lmhhc093blByb3BlcnR5KGN1cnJlbnRQcm9wKSAmJiBjdXJyZW50UHJvcCAhPT0gJ19tZXRhJykge1xuICAgICAgICAgICAgZGVsZXRlIGN1cnJlbnRbY3VycmVudFByb3BdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBUaGUgZGF0YSBhcnJheSBtdXN0IGJlIGVkaXRlZCBpbiBwbGFjZS4gQXMgY2hhcnQuanMgYWRkcyBsaXN0ZW5lcnMgdG8gaXQuXG4gICAgICAgIGN1cnJlbnQuZGF0YS5zcGxpY2UobmV4dC5kYXRhLmxlbmd0aCk7XG4gICAgICAgIG5leHQuZGF0YS5mb3JFYWNoKChwb2ludCwgcGlkKSA9PiB7XG4gICAgICAgICAgY3VycmVudC5kYXRhW3BpZF0gPSBuZXh0LmRhdGFbcGlkXTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGN1cnJlbnQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV4dDtcbiAgICB9KTtcblxuICAgIGNvbnN0IHsgZGF0YXNldHMsIC4uLnJlc3QgfSA9IGRhdGE7XG5cbiAgICB0aGlzLmNoYXJ0SW5zdGFuY2UuY29uZmlnLmRhdGEgPSB7XG4gICAgICAuLi50aGlzLmNoYXJ0SW5zdGFuY2UuY29uZmlnLmRhdGEsXG4gICAgICAuLi5yZXN0LFxuICAgIH07XG5cbiAgICB0aGlzLmNoYXJ0SW5zdGFuY2UudXBkYXRlKCk7XG4gIH1cblxuICByZW5kZXJDaGFydCgpIHtcbiAgICBjb25zdCBub2RlID0gdGhpcy5yZWYubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBkYXRhID0gdGhpcy50cmFuc2Zvcm1EYXRhKCk7XG5cbiAgICBpZiAodHlwZW9mIHRoaXMubGVnZW5kICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgY29uc3QgbGVnZW5kT3B0aW9ucyA9IHsgLi4udGhpcy5sZWdlbmQsIC4uLnRoaXMub3B0aW9ucy5sZWdlbmQgfTtcbiAgICAgIHRoaXMub3B0aW9ucy5sZWdlbmQgPSBsZWdlbmRPcHRpb25zO1xuICAgIH1cblxuICAgIC8vIGluIG9yZGVyIHRvIGFsbG93IGZvciB1bml2ZXJzYWwgcmVuZGVyaW5nLCB3ZSBpbXBvcnQgQ29kZW1pcnJvciBydW50aW1lIHdpdGggYHJlcXVpcmVgIHRvIHByZXZlbnQgbm9kZSBlcnJvcnNcbiAgICBjb25zdCBDaGFydCA9IHJlcXVpcmUoJ2NoYXJ0LmpzJyk7XG5cbiAgICB0aGlzLnpvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5jaGFydEluc3RhbmNlID0gbmV3IENoYXJ0KG5vZGUsIHtcbiAgICAgICAgdHlwZTogdGhpcy50eXBlLFxuICAgICAgICBkYXRhLFxuICAgICAgICBvcHRpb25zOiB0aGlzLm9wdGlvbnMsXG4gICAgICAgIHBsdWdpbnM6IHRoaXMucGx1Z2lucyxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgdHJhbnNmb3JtRGF0YSgpIHtcbiAgICBpZiAoIXRoaXMuZGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHRoaXMuZGF0YSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgY29uc3Qgbm9kZSA9IHRoaXMucmVmO1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YShub2RlKTtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuZGF0YTtcbiAgfVxuXG4gIGhhbmRsZU9uQ2xpY2soJGV2ZW50OiBFdmVudCkge1xuICAgIHRoaXMuY2hhcnRDbGljay5lbWl0KHtcbiAgICAgIGVsZW1lbnRzOiB0aGlzLmNoYXJ0SW5zdGFuY2UuZ2V0RWxlbWVudHNBdEV2ZW50KCRldmVudCksXG4gICAgICBlbGVtZW50OiB0aGlzLmNoYXJ0SW5zdGFuY2UuZ2V0RWxlbWVudEF0RXZlbnQoJGV2ZW50KSxcbiAgICAgIGRhdGFzZXQ6IHRoaXMuY2hhcnRJbnN0YW5jZS5nZXREYXRhc2V0QXRFdmVudCgkZXZlbnQpLFxuICAgICAgJGV2ZW50LFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2hhcnRDbGlja0V2ZW50IHtcbiAgZWxlbWVudHM6IGFueVtdO1xuICBlbGVtZW50OiBhbnk7XG4gIGRhdGFzZXQ6IGFueVtdO1xuICAkZXZlbnQ6IEV2ZW50O1xufVxuIl19