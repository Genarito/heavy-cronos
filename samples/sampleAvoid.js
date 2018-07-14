"use strict";
exports.__esModule = true;
var Cronos_1 = require("../Cronos");
var cronos = new Cronos_1.Cronos(function () {
    console.log('It works!');
}, 3000, 'avoid');
cronos.run(); // Prints 'It works!'
cronos.run(); // Waits for 3 seconds
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored
setTimeout(function () {
    console.log("We have waited for 4 seconds!");
    cronos.run(); // Prints 'It works!'
    cronos.run(); // It will be ignored
}, 4000);
