/// <reference types="node" />
import child = require('child_process');
/**
 * Manage and log output from child processes
 * @namespace module:Common.Process
 * */
export declare namespace Process {
    /**
     * @summary Create management and logging for a child process
     * @param {child.ChildProcess} proc The child process
     * @param {boolean} silent Mute the logging for this process
     * @memberof module:Common.Process
     * @return {void}
     */
    function init(proc: child.ChildProcess, silent?: boolean): void;
    /**
     * @summary Parse a log string into an array of lines without meta info.
     * @param {string} data
     * @memberof module:Common.Process
     * @return {string[]}
     */
    function parseLog(data: string): string[];
}
