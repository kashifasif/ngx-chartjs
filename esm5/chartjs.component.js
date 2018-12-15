/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild, } from '@angular/core';
var ChartjsComponent = /** @class */ (function () {
    function ChartjsComponent(zone) {
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
        this.datasetKeyProvider = function (d) { return d.label; };
    }
    /**
     * @return {?}
     */
    ChartjsComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.renderChart();
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ChartjsComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.firstChange) {
            return;
        }
        if (this.chartInstance && this.redraw) {
            this.chartInstance.destroy();
            this.renderChart();
            return;
        }
        this.updateChart();
    };
    /**
     * @return {?}
     */
    ChartjsComponent.prototype.updateChart = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var data = this.transformData();
        if (!this.chartInstance) {
            return;
        }
        if (this.options) {
            // in order to allow for universal rendering, we import chart.js runtime with `require` to prevent node errors
            /** @type {?} */
            var Chart_1 = require('chart.js');
            this.chartInstance.options = ((/** @type {?} */ (Chart_1))).helpers.configMerge(this.chartInstance.options, this.options);
        }
        // Pipe datasets to chart instance datasets enabling
        // seamless transitions
        /** @type {?} */
        var currentDatasets = (this.chartInstance.config.data &&
            this.chartInstance.config.data.datasets) ||
            [];
        /** @type {?} */
        var nextDatasets = data.datasets || [];
        /** @type {?} */
        var currentDatasetsIndexed = {};
        currentDatasets.forEach(function (x) {
            currentDatasetsIndexed[_this.datasetKeyProvider(x)] = x;
        });
        // We can safely replace the dataset array, as long as we retain the _meta property
        // on each dataset.
        this.chartInstance.config.data.datasets = nextDatasets.map(function (next) {
            var e_1, _a, e_2, _b;
            /** @type {?} */
            var current = currentDatasetsIndexed[_this.datasetKeyProvider(next)];
            if (current && current.type === next.type) {
                try {
                    // Reassign all properties from next
                    for (var _c = tslib_1.__values(Object.keys(next)), _d = _c.next(); !_d.done; _d = _c.next()) {
                        var nextProp = _d.value;
                        // Data array can't be reassigned here.
                        if (nextProp !== 'data') {
                            current[nextProp] = next[nextProp];
                        }
                    }
                }
                catch (e_1_1) { e_1 = { error: e_1_1 }; }
                finally {
                    try {
                        if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
                    }
                    finally { if (e_1) throw e_1.error; }
                }
                try {
                    // Remove properties from current if they was removed in next
                    for (var _e = tslib_1.__values(Object.keys(current)), _f = _e.next(); !_f.done; _f = _e.next()) {
                        var currentProp = _f.value;
                        // Be careful with _meta property
                        if (!next.hasOwnProperty(currentProp) && currentProp !== '_meta') {
                            delete current[currentProp];
                        }
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (_f && !_f.done && (_b = _e.return)) _b.call(_e);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                // The data array must be edited in place. As chart.js adds listeners to it.
                current.data.splice(next.data.length);
                next.data.forEach(function (point, pid) {
                    current.data[pid] = next.data[pid];
                });
                return current;
            }
            return next;
        });
        var datasets = data.datasets, rest = tslib_1.__rest(data, ["datasets"]);
        this.chartInstance.config.data = tslib_1.__assign({}, this.chartInstance.config.data, rest);
        this.chartInstance.update();
    };
    /**
     * @return {?}
     */
    ChartjsComponent.prototype.renderChart = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var node = this.ref.nativeElement;
        /** @type {?} */
        var data = this.transformData();
        if (typeof this.legend !== 'undefined') {
            /** @type {?} */
            var legendOptions = tslib_1.__assign({}, this.legend, this.options.legend);
            this.options.legend = legendOptions;
        }
        // in order to allow for universal rendering, we import Codemirror runtime with `require` to prevent node errors
        /** @type {?} */
        var Chart = require('chart.js');
        this.zone.runOutsideAngular(function () {
            _this.chartInstance = new Chart(node, {
                type: _this.type,
                data: data,
                options: _this.options,
                plugins: _this.plugins,
            });
        });
    };
    /**
     * @return {?}
     */
    ChartjsComponent.prototype.transformData = /**
     * @return {?}
     */
    function () {
        if (!this.data) {
            return;
        }
        if (typeof this.data === 'function') {
            /** @type {?} */
            var node = this.ref;
            return this.data(node);
        }
        return this.data;
    };
    /**
     * @param {?} $event
     * @return {?}
     */
    ChartjsComponent.prototype.handleOnClick = /**
     * @param {?} $event
     * @return {?}
     */
    function ($event) {
        this.chartClick.emit({
            elements: this.chartInstance.getElementsAtEvent($event),
            element: this.chartInstance.getElementAtEvent($event),
            dataset: this.chartInstance.getDatasetAtEvent($event),
            $event: $event,
        });
    };
    ChartjsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-chartjs',
                    template: "\n  <!-- wrapping div required for height, width to work -->\n  <div>\n    <canvas\n      #ref\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      (click)=\"handleOnClick($event)\"\n    ></canvas>\n  </div>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                }] }
    ];
    /** @nocollapse */
    ChartjsComponent.ctorParameters = function () { return [
        { type: NgZone }
    ]; };
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
    return ChartjsComponent;
}());
export { ChartjsComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRqcy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AY3RybC9uZ3gtY2hhcnRqcy8iLCJzb3VyY2VzIjpbImNoYXJ0anMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUVMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBQ0wsTUFBTSxFQUVOLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFVdkI7SUFrQ0UsMEJBQW9CLElBQVk7UUFBWixTQUFJLEdBQUosSUFBSSxDQUFRO1FBaEJ0QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQW1CLENBQUM7Ozs7UUFFbEQsU0FBSSxHQUF1QixVQUFVLENBQUM7UUFFdEMsV0FBTSxHQUFHLEdBQUcsQ0FBQztRQUNiLFVBQUssR0FBRyxHQUFHLENBQUM7UUFFckIsV0FBTSxHQUE2QjtZQUNqQyxPQUFPLEVBQUUsSUFBSTtZQUNiLFFBQVEsRUFBRSxRQUFRO1NBQ25CLENBQUM7UUFDTyxZQUFPLEdBQXVCLEVBQUUsQ0FBQztRQUVqQyxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBQ2YsdUJBQWtCLEdBQXVCLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLEtBQUssRUFBUCxDQUFPLENBQUM7SUFFNUIsQ0FBQzs7OztJQUVwQywwQ0FBZTs7O0lBQWY7UUFDRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDckIsQ0FBQzs7Ozs7SUFDRCxzQ0FBVzs7OztJQUFYLFVBQVksT0FBWTtRQUN0QixJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUU7WUFDdkIsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksQ0FBQyxNQUFNLEVBQUU7WUFDckMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsT0FB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ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENvbXBvbmVudCxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgTmdab25lLFxuICBPbkNoYW5nZXMsXG4gIE91dHB1dCxcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIENoYXJ0RGF0YSxcbiAgQ2hhcnRMZWdlbmRPcHRpb25zLFxuICBDaGFydE9wdGlvbnMsXG4gIENoYXJ0VHlwZSxcbn0gZnJvbSAnY2hhcnQuanMnO1xuXG5kZWNsYXJlIHZhciByZXF1aXJlOiBhbnk7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ25neC1jaGFydGpzJyxcbiAgdGVtcGxhdGU6IGBcbiAgPCEtLSB3cmFwcGluZyBkaXYgcmVxdWlyZWQgZm9yIGhlaWdodCwgd2lkdGggdG8gd29yayAtLT5cbiAgPGRpdj5cbiAgICA8Y2FudmFzXG4gICAgICAjcmVmXG4gICAgICBbYXR0ci5oZWlnaHRdPVwiaGVpZ2h0XCJcbiAgICAgIFthdHRyLndpZHRoXT1cIndpZHRoXCJcbiAgICAgIChjbGljayk9XCJoYW5kbGVPbkNsaWNrKCRldmVudClcIlxuICAgID48L2NhbnZhcz5cbiAgPC9kaXY+XG4gIGAsXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxufSlcbmV4cG9ydCBjbGFzcyBDaGFydGpzQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzIHtcbiAgY2hhcnRJbnN0YW5jZTogYW55O1xuICBAVmlld0NoaWxkKCdyZWYnKSByZWY6IEVsZW1lbnRSZWY8SFRNTENhbnZhc0VsZW1lbnQ+O1xuICBAT3V0cHV0KCkgY2hhcnRDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8Q2hhcnRDbGlja0V2ZW50PigpO1xuICAvKiogY2hhcnQgdHlwZSAqL1xuICBASW5wdXQoKSB0eXBlOiBDaGFydFR5cGUgfCBzdHJpbmcgPSAnZG91Z2hudXQnO1xuICBASW5wdXQoKSBkYXRhOiBDaGFydERhdGEgfCBhbnk7XG4gIEBJbnB1dCgpIGhlaWdodCA9IDE1MDtcbiAgQElucHV0KCkgd2lkdGggPSAzMDA7XG4gIEBJbnB1dCgpXG4gIGxlZ2VuZDogQ2hhcnRMZWdlbmRPcHRpb25zIHwgYW55ID0ge1xuICAgIGRpc3BsYXk6IHRydWUsXG4gICAgcG9zaXRpb246ICdib3R0b20nLFxuICB9O1xuICBASW5wdXQoKSBvcHRpb25zOiBDaGFydE9wdGlvbnMgfCBhbnkgPSB7fTtcbiAgQElucHV0KCkgcGx1Z2luczogYW55W107XG4gIEBJbnB1dCgpIHJlZHJhdyA9IGZhbHNlO1xuICBASW5wdXQoKSBkYXRhc2V0S2V5UHJvdmlkZXI6ICh4OiBhbnkpID0+IHN0cmluZyA9IGQgPT4gZC5sYWJlbDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHpvbmU6IE5nWm9uZSkge31cblxuICBuZ0FmdGVyVmlld0luaXQoKSB7XG4gICAgdGhpcy5yZW5kZXJDaGFydCgpO1xuICB9XG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IGFueSkge1xuICAgIGlmIChjaGFuZ2VzLmZpcnN0Q2hhbmdlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmNoYXJ0SW5zdGFuY2UgJiYgdGhpcy5yZWRyYXcpIHtcbiAgICAgIHRoaXMuY2hhcnRJbnN0YW5jZS5kZXN0cm95KCk7XG4gICAgICB0aGlzLnJlbmRlckNoYXJ0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMudXBkYXRlQ2hhcnQoKTtcbiAgfVxuXG4gIHVwZGF0ZUNoYXJ0KCkge1xuICAgIGNvbnN0IGRhdGEgPSB0aGlzLnRyYW5zZm9ybURhdGEoKTtcblxuICAgIGlmICghdGhpcy5jaGFydEluc3RhbmNlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMub3B0aW9ucykge1xuICAgICAgLy8gaW4gb3JkZXIgdG8gYWxsb3cgZm9yIHVuaXZlcnNhbCByZW5kZXJpbmcsIHdlIGltcG9ydCBjaGFydC5qcyBydW50aW1lIHdpdGggYHJlcXVpcmVgIHRvIHByZXZlbnQgbm9kZSBlcnJvcnNcbiAgICAgIGNvbnN0IENoYXJ0ID0gcmVxdWlyZSgnY2hhcnQuanMnKTtcbiAgICAgIHRoaXMuY2hhcnRJbnN0YW5jZS5vcHRpb25zID0gKENoYXJ0IGFzIGFueSkuaGVscGVycy5jb25maWdNZXJnZShcbiAgICAgICAgdGhpcy5jaGFydEluc3RhbmNlLm9wdGlvbnMsXG4gICAgICAgIHRoaXMub3B0aW9ucyxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gUGlwZSBkYXRhc2V0cyB0byBjaGFydCBpbnN0YW5jZSBkYXRhc2V0cyBlbmFibGluZ1xuICAgIC8vIHNlYW1sZXNzIHRyYW5zaXRpb25zXG4gICAgY29uc3QgY3VycmVudERhdGFzZXRzOiBhbnlbXSA9XG4gICAgICAodGhpcy5jaGFydEluc3RhbmNlLmNvbmZpZy5kYXRhICYmXG4gICAgICAgIHRoaXMuY2hhcnRJbnN0YW5jZS5jb25maWcuZGF0YS5kYXRhc2V0cykgfHxcbiAgICAgIFtdO1xuICAgIGNvbnN0IG5leHREYXRhc2V0cyA9IGRhdGEuZGF0YXNldHMgfHwgW107XG5cbiAgICBjb25zdCBjdXJyZW50RGF0YXNldHNJbmRleGVkID0ge307XG4gICAgY3VycmVudERhdGFzZXRzLmZvckVhY2goKHgpID0+IHtcbiAgICAgIGN1cnJlbnREYXRhc2V0c0luZGV4ZWRbdGhpcy5kYXRhc2V0S2V5UHJvdmlkZXIoeCldID0geDtcbiAgICB9KTtcblxuICAgIC8vIFdlIGNhbiBzYWZlbHkgcmVwbGFjZSB0aGUgZGF0YXNldCBhcnJheSwgYXMgbG9uZyBhcyB3ZSByZXRhaW4gdGhlIF9tZXRhIHByb3BlcnR5XG4gICAgLy8gb24gZWFjaCBkYXRhc2V0LlxuICAgIHRoaXMuY2hhcnRJbnN0YW5jZS5jb25maWcuZGF0YS5kYXRhc2V0cyA9IG5leHREYXRhc2V0cy5tYXAobmV4dCA9PiB7XG4gICAgICBjb25zdCBjdXJyZW50ID0gY3VycmVudERhdGFzZXRzSW5kZXhlZFt0aGlzLmRhdGFzZXRLZXlQcm92aWRlcihuZXh0KV07XG5cbiAgICAgIGlmIChjdXJyZW50ICYmIGN1cnJlbnQudHlwZSA9PT0gbmV4dC50eXBlKSB7XG4gICAgICAgIC8vIFJlYXNzaWduIGFsbCBwcm9wZXJ0aWVzIGZyb20gbmV4dFxuICAgICAgICBmb3IgKGNvbnN0IG5leHRQcm9wIG9mIE9iamVjdC5rZXlzKG5leHQpKSB7XG4gICAgICAgICAgLy8gRGF0YSBhcnJheSBjYW4ndCBiZSByZWFzc2lnbmVkIGhlcmUuXG4gICAgICAgICAgaWYgKG5leHRQcm9wICE9PSAnZGF0YScpIHtcbiAgICAgICAgICAgIGN1cnJlbnRbbmV4dFByb3BdID0gbmV4dFtuZXh0UHJvcF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIC8vIFJlbW92ZSBwcm9wZXJ0aWVzIGZyb20gY3VycmVudCBpZiB0aGV5IHdhcyByZW1vdmVkIGluIG5leHRcbiAgICAgICAgZm9yIChjb25zdCBjdXJyZW50UHJvcCBvZiBPYmplY3Qua2V5cyhjdXJyZW50KSkge1xuICAgICAgICAgIC8vIEJlIGNhcmVmdWwgd2l0aCBfbWV0YSBwcm9wZXJ0eVxuICAgICAgICAgIGlmICghbmV4dC5oYXNPd25Qcm9wZXJ0eShjdXJyZW50UHJvcCkgJiYgY3VycmVudFByb3AgIT09ICdfbWV0YScpIHtcbiAgICAgICAgICAgIGRlbGV0ZSBjdXJyZW50W2N1cnJlbnRQcm9wXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgLy8gVGhlIGRhdGEgYXJyYXkgbXVzdCBiZSBlZGl0ZWQgaW4gcGxhY2UuIEFzIGNoYXJ0LmpzIGFkZHMgbGlzdGVuZXJzIHRvIGl0LlxuICAgICAgICBjdXJyZW50LmRhdGEuc3BsaWNlKG5leHQuZGF0YS5sZW5ndGgpO1xuICAgICAgICBuZXh0LmRhdGEuZm9yRWFjaCgocG9pbnQsIHBpZCkgPT4ge1xuICAgICAgICAgIGN1cnJlbnQuZGF0YVtwaWRdID0gbmV4dC5kYXRhW3BpZF07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5leHQ7XG4gICAgfSk7XG5cbiAgICBjb25zdCB7IGRhdGFzZXRzLCAuLi5yZXN0IH0gPSBkYXRhO1xuXG4gICAgdGhpcy5jaGFydEluc3RhbmNlLmNvbmZpZy5kYXRhID0ge1xuICAgICAgLi4udGhpcy5jaGFydEluc3RhbmNlLmNvbmZpZy5kYXRhLFxuICAgICAgLi4ucmVzdCxcbiAgICB9O1xuXG4gICAgdGhpcy5jaGFydEluc3RhbmNlLnVwZGF0ZSgpO1xuICB9XG5cbiAgcmVuZGVyQ2hhcnQoKSB7XG4gICAgY29uc3Qgbm9kZSA9IHRoaXMucmVmLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgZGF0YSA9IHRoaXMudHJhbnNmb3JtRGF0YSgpO1xuXG4gICAgaWYgKHR5cGVvZiB0aGlzLmxlZ2VuZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIGNvbnN0IGxlZ2VuZE9wdGlvbnMgPSB7IC4uLnRoaXMubGVnZW5kLCAuLi50aGlzLm9wdGlvbnMubGVnZW5kIH07XG4gICAgICB0aGlzLm9wdGlvbnMubGVnZW5kID0gbGVnZW5kT3B0aW9ucztcbiAgICB9XG5cbiAgICAvLyBpbiBvcmRlciB0byBhbGxvdyBmb3IgdW5pdmVyc2FsIHJlbmRlcmluZywgd2UgaW1wb3J0IENvZGVtaXJyb3IgcnVudGltZSB3aXRoIGByZXF1aXJlYCB0byBwcmV2ZW50IG5vZGUgZXJyb3JzXG4gICAgY29uc3QgQ2hhcnQgPSByZXF1aXJlKCdjaGFydC5qcycpO1xuXG4gICAgdGhpcy56b25lLnJ1bk91dHNpZGVBbmd1bGFyKCgpID0+IHtcbiAgICAgIHRoaXMuY2hhcnRJbnN0YW5jZSA9IG5ldyBDaGFydChub2RlLCB7XG4gICAgICAgIHR5cGU6IHRoaXMudHlwZSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgb3B0aW9uczogdGhpcy5vcHRpb25zLFxuICAgICAgICBwbHVnaW5zOiB0aGlzLnBsdWdpbnMsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHRyYW5zZm9ybURhdGEoKSB7XG4gICAgaWYgKCF0aGlzLmRhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiB0aGlzLmRhdGEgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgIGNvbnN0IG5vZGUgPSB0aGlzLnJlZjtcbiAgICAgIHJldHVybiB0aGlzLmRhdGEobm9kZSk7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLmRhdGE7XG4gIH1cblxuICBoYW5kbGVPbkNsaWNrKCRldmVudDogRXZlbnQpIHtcbiAgICB0aGlzLmNoYXJ0Q2xpY2suZW1pdCh7XG4gICAgICBlbGVtZW50czogdGhpcy5jaGFydEluc3RhbmNlLmdldEVsZW1lbnRzQXRFdmVudCgkZXZlbnQpLFxuICAgICAgZWxlbWVudDogdGhpcy5jaGFydEluc3RhbmNlLmdldEVsZW1lbnRBdEV2ZW50KCRldmVudCksXG4gICAgICBkYXRhc2V0OiB0aGlzLmNoYXJ0SW5zdGFuY2UuZ2V0RGF0YXNldEF0RXZlbnQoJGV2ZW50KSxcbiAgICAgICRldmVudCxcbiAgICB9KTtcbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENoYXJ0Q2xpY2tFdmVudCB7XG4gIGVsZW1lbnRzOiBhbnlbXTtcbiAgZWxlbWVudDogYW55O1xuICBkYXRhc2V0OiBhbnlbXTtcbiAgJGV2ZW50OiBFdmVudDtcbn1cbiJdfQ==