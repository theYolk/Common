import log4js = require('log4js');
import { Types } from '../types/Interfaces';
/**
 * @summary Various system initialisations including file locations and logging
 * @memberof module:Common
 */
export declare class System {
    env: Types.Environment;
    private static instance;
    /**
     * @constructor
     * @param {module:Common.Environment} env - The data for the environment
     */
    private constructor();
    /**
     * Get or create a new instance of the system
     * @param {module:Common.Environment} - Env
     * @return {module:Common.System}
     */
    static getInstance(Env?: Types.Environment): System | undefined;
    /**
     * Set the active log4js logger for the context
     * @param {string} category - Set the name for the logger to log under (usually the name of the file obtained by `path.basename(__filename)`)
     * @returns {log4js.Logger} - A log4js logger instance
     */
    setLogger(category: string): log4js.Logger;
}
