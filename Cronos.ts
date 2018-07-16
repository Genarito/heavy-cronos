type methodType = 'avoid' | 'once' | 'every';

class Cronos {
    private lastExcecutionTime: Date = null;
    private functionCount: number = 0;

    /**
     * Constructor
     * @param functionToExcecute Function to excecute when time was met
     * @param timeToWait Time to wait (miliseconds) to prevent excecutions
     * @param method 'avoid', 'once', 'every' to prevent excecute function if time was not met, execute once when time is reached, or excecute as many times as run() was called when time is reached
     */
    constructor(private functionToExcecute: Function, private timeToWait: number, private method: methodType = 'avoid') { }

    /**
     * Excecute the passed function if the waiting time was met
     */
    public run() {
        let timeDiff = this.getTimeDiff();
        // In every of the three methods, if time was met, it excecutes the function
        if (timeDiff >= this.timeToWait) {
            this.excecute();
        } else {
            // Only 'Once' of 'Every' method are considered
            if (this.method == 'every' || (this.method == 'once' && this.functionCount == 0)) {
                this.addFunction(timeDiff);
            }
        }
    }

    /**
     * Force last excecution time update to current time
     */
    public updateLastTime() {
        this.lastExcecutionTime = new Date();
    }

    /**
     * Increments the count the function must be excecuted
     * @param timeDiff Time to wait in case we are creating the interval
     */
    private addFunction(timeDiff: number) {
        this.functionCount++;

        // If first element is added, starts the interval
        if (this.functionCount == 1) {
            setTimeout(() => {
                let interval = setInterval(() => {
                    this.functionCount--;
                    this.excecute();

                    // If there is no more times to excecute, clear the interval
                    if (this.functionCount == 0) {
                        clearInterval(interval);
                    }
                }, this.timeToWait);    
            }, timeDiff);
        }
    }

    /**
     * Excecutes requested function and updates last time excecution
     */
    private excecute() {
        this.lastExcecutionTime = new Date();
        this.functionToExcecute();
    }

    /**
     * Get time difference between now and the last excecution time
     * @returns Time difference in miliseconds
     */
    private getTimeDiff(): number {
        if (!this.lastExcecutionTime) {
            return Infinity; // It should be excecuted
        }

        let now = new Date();
        return now.getTime() - this.lastExcecutionTime.getTime(); // Diff time in miliseconds
    }
}

export { Cronos };