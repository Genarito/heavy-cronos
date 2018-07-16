"use strict";
exports.__esModule = true;
var Cronos = /** @class */ (function () {
    /**
     * Constructor
     * @param functionToExcecute Function to excecute when time was met
     * @param timeToWait Time to wait (miliseconds) to prevent excecutions
     * @param method 'avoid', 'once', 'every' to prevent excecute function if time was not met, execute once when time is reached, or excecute as many times as run() was called when time is reached
     */
    function Cronos(functionToExcecute, timeToWait, method) {
        if (method === void 0) { method = 'avoid'; }
        this.functionToExcecute = functionToExcecute;
        this.timeToWait = timeToWait;
        this.method = method;
        this.lastExcecutionTime = null;
        this.functionCount = 0;
    }
    /**
     * Excecute the passed function if the waiting time was met
     */
    Cronos.prototype.run = function () {
        var timeDiff = this.getTimeDiff();
        // In every of the three methods, if time was met, it excecutes the function
        if (timeDiff >= this.timeToWait) {
            this.excecute();
        }
        else {
            // Only 'Once' of 'Every' method are considered
            if (this.method == 'every' || (this.method == 'once' && this.functionCount == 0)) {
                this.addFunction(timeDiff);
            }
        }
    };
    /**
     * Force last excecution time update to current time
     */
    Cronos.prototype.updateLastTime = function () {
        this.lastExcecutionTime = new Date();
    };
    /**
     * Increments the count the function must be excecuted
     * @param timeDiff Time to wait in case we are creating the interval
     */
    Cronos.prototype.addFunction = function (timeDiff) {
        var _this = this;
        this.functionCount++;
        // If first element is added, starts the interval
        if (this.functionCount == 1) {
            setTimeout(function () {
                var interval = setInterval(function () {
                    _this.functionCount--;
                    _this.excecute();
                    // If there is no more times to excecute, clear the interval
                    if (_this.functionCount == 0) {
                        clearInterval(interval);
                    }
                }, _this.timeToWait);
            }, timeDiff);
        }
    };
    /**
     * Excecutes requested function and updates last time excecution
     */
    Cronos.prototype.excecute = function () {
        this.lastExcecutionTime = new Date();
        this.functionToExcecute();
    };
    /**
     * Get time difference between now and the last excecution time
     * @returns Time difference in miliseconds
     */
    Cronos.prototype.getTimeDiff = function () {
        if (!this.lastExcecutionTime) {
            return Infinity; // It should be excecuted
        }
        var now = new Date();
        return now.getTime() - this.lastExcecutionTime.getTime(); // Diff time in miliseconds
    };
    return Cronos;
}());
exports["default"] = Cronos;
