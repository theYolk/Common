/**
 * @summary Various tools related to Http servers
 * @namespace module:Common.Http
 */
export declare namespace Http {
    /**
     * @summary Create a static http server
     * @param dir - The path to the directory which you wish to server
     * @param port - The port that the server is to listen on
     * @returns void
     * @memberof module:Common.Http
     */
    function makeStatic(dir: string, port: number): void;
}
