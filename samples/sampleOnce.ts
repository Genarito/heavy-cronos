import { Cronos } from '../Cronos';

let cronos = new Cronos(() => {
    console.log('It works!');
}, 3000, 'once');

cronos.run(); // Prints 'It works!'
cronos.run(); // Waits for 3 seconds
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored
cronos.run(); // It will be ignored

setTimeout(function () {
    console.log("We have waited for 7 seconds!");
    cronos.run(); // Prints 'It works!'
    cronos.run(); // Waits for 3 seconds
}, 7000);