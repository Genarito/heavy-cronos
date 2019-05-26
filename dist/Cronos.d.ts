declare type methodType = 'avoid' | 'once' | 'every';
export default class Cronos {
    private functionToExecute;
    private timeToWait;
    private method;
    private isExecutionLocked;
    private functionCount;
    /**
     * Constructor
     * @param functionToExecute Function to execute when time was reached
     * @param timeToWait Time to wait (miliseconds) to prevent excecutions
     * @param method 'avoid', 'once', 'every' to prevent execute function if time was not reached, execute once when time is reached, or execute as many times as run() was called when time is reached
     */
    constructor(functionToExecute: Function, timeToWait: number, method?: methodType);
    /**
     * Excecute the passed function if the waiting time was reached
     */
    run(): void;
    /**
     * Checks, in case of 'every' or 'once' strategy if It have
     * to execute the function again
     */
    private checkIfThereIsPendingExecution;
    /**
     * Executes the requested function and updates last time excecution
     */
    private execute;
}
export {};
