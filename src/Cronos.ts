type methodType = 'avoid' | 'once' | 'every';

export default class Cronos {
    private isExecutionLocked: boolean = false;
    private functionCount: number = 0;

    /**
     * Constructor
     * @param functionToExecute Function to execute when time was reached
     * @param timeToWait Time to wait (miliseconds) to prevent excecutions
     * @param method 'avoid', 'once', 'every' to prevent execute function if time was not reached, execute once when time is reached, or execute as many times as run() was called when time is reached
     */
    constructor(private functionToExecute: Function, private timeToWait: number, private method: methodType = 'avoid') { }

    /**
     * Excecute the passed function if the waiting time was reached
     */
    public run() {
        // In every of the three methods, if time was reached, it executes the function
        if (!this.isExecutionLocked) {
            this.execute();
        } else {
            // Only 'Once' of 'Every' method are considered
            if (this.method == 'every' || (this.method == 'once' && !this.functionCount)) {
                this.functionCount++;
            }
        }
    }

    /**
     * Checks, in case of 'every' or 'once' strategy if It have
     * to execute the function again
     */
    private checkIfThereIsPendingExecution() {
        if (this.functionCount) {
            this.functionCount--;
            this.execute();
        }
    }

    /**
     * Executes the requested function and updates last time excecution
     */
    private execute() {
        this.isExecutionLocked = true; // Block new calls to the function
        this.functionToExecute(); // Execute the function

        // After a the specified time to wait, It can execute the function again
        setTimeout(() => {
            this.isExecutionLocked = false;
            this.checkIfThereIsPendingExecution();
        }, this.timeToWait);
    }
}
