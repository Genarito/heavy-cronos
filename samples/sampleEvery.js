let Cronos = require('../dist/Cronos');

let cronos = new Cronos(() => {
    console.log('It works!');
}, 3000, 'every');

cronos.run(); // Prints 'It works!'
cronos.run(); // Waits for 3 seconds and prints 'It works!
cronos.run(); // Waits until previous calls are excecuted
cronos.run(); // Waits until previous calls are excecuted
cronos.run(); // Waits until previous calls are excecuted
cronos.run(); // Waits until previous calls are excecuted

setTimeout(function () {
    console.log("We have waited for 7 seconds!"); // Next two calls will be pushed to function stack to be excecuted later
    cronos.run(); // Waits until previous calls are excecuted
    cronos.run(); // Waits until previous calls are excecuted
}, 7000);