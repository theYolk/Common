import { Types } from '../types/Interfaces';
/**
 * Tools to work with TOR and Onion services
 * @namespace module:Common.Onion
 * */
export declare namespace Onion {
    /**
     * Initialise a new TOR instance
     * @async
     * @param {string} name	Name for the subdirectory that the Tor data will be saved under
     * @param {module:Common.Tor} tor - The object with Tor data for creation
     * @returns {Promise<boolean,Error>} - A Promise of the child process, true if service started or Error if rejected
     * @memberof module:Common.Onion
     */
    function init(name: string, tor: Types.Tor): undefined | Promise<{}>;
}
