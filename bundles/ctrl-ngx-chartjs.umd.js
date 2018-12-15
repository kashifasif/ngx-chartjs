(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
    typeof define === 'function' && define.amd ? define('@ctrl/ngx-chartjs', ['exports', '@angular/core'], factory) :
    (factory((global.ctrl = global.ctrl || {}, global.ctrl['ngx-chartjs'] = {}),global.ng.core));
}(this, (function (exports,core) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++)
                if (e.indexOf(p[i]) < 0)
                    t[p[i]] = s[p[i]];
        return t;
    }
    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m)
            return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length)
                    o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ChartjsComponent = /** @class */ (function () {
        function ChartjsComponent(zone) {
            this.zone = zone;
            this.chartClick = new core.EventEmitter();
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
                    this.chartInstance.options = (( /** @type {?} */(Chart_1))).helpers.configMerge(this.chartInstance.options, this.options);
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
                            for (var _c = __values(Object.keys(next)), _d = _c.next(); !_d.done; _d = _c.next()) {
                                var nextProp = _d.value;
                                // Data array can't be reassigned here.
                                if (nextProp !== 'data') {
                                    current[nextProp] = next[nextProp];
                                }
                            }
                        }
                        catch (e_1_1) {
                            e_1 = { error: e_1_1 };
                        }
                        finally {
                            try {
                                if (_d && !_d.done && (_a = _c.return))
                                    _a.call(_c);
                            }
                            finally {
                                if (e_1)
                                    throw e_1.error;
                            }
                        }
                        try {
                            // Remove properties from current if they was removed in next
                            for (var _e = __values(Object.keys(current)), _f = _e.next(); !_f.done; _f = _e.next()) {
                                var currentProp = _f.value;
                                // Be careful with _meta property
                                if (!next.hasOwnProperty(currentProp) && currentProp !== '_meta') {
                                    delete current[currentProp];
                                }
                            }
                        }
                        catch (e_2_1) {
                            e_2 = { error: e_2_1 };
                        }
                        finally {
                            try {
                                if (_f && !_f.done && (_b = _e.return))
                                    _b.call(_e);
                            }
                            finally {
                                if (e_2)
                                    throw e_2.error;
                            }
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
                var datasets = data.datasets, rest = __rest(data, ["datasets"]);
                this.chartInstance.config.data = __assign({}, this.chartInstance.config.data, rest);
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
                    var legendOptions = __assign({}, this.legend, this.options.legend);
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
            { type: core.Component, args: [{
                        selector: 'ngx-chartjs',
                        template: "\n  <!-- wrapping div required for height, width to work -->\n  <div>\n    <canvas\n      #ref\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      (click)=\"handleOnClick($event)\"\n    ></canvas>\n  </div>\n  ",
                        changeDetection: core.ChangeDetectionStrategy.OnPush
                    }] }
        ];
        /** @nocollapse */
        ChartjsComponent.ctorParameters = function () {
            return [
                { type: core.NgZone }
            ];
        };
        ChartjsComponent.propDecorators = {
            ref: [{ type: core.ViewChild, args: ['ref',] }],
            chartClick: [{ type: core.Output }],
            type: [{ type: core.Input }],
            data: [{ type: core.Input }],
            height: [{ type: core.Input }],
            width: [{ type: core.Input }],
            legend: [{ type: core.Input }],
            options: [{ type: core.Input }],
            plugins: [{ type: core.Input }],
            redraw: [{ type: core.Input }],
            datasetKeyProvider: [{ type: core.Input }]
        };
        return ChartjsComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var ChartjsModule = /** @class */ (function () {
        function ChartjsModule() {
        }
        ChartjsModule.decorators = [
            { type: core.NgModule, args: [{
                        exports: [ChartjsComponent],
                        declarations: [ChartjsComponent],
                    },] }
        ];
        return ChartjsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,extraRequire,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    exports.ChartjsComponent = ChartjsComponent;
    exports.ChartjsModule = ChartjsModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));

//# sourceMappingURL=ctrl-ngx-chartjs.umd.js.map