export declare namespace Types {
    /**Definition for system environment object */
    interface Environment {
        dir: {
            /**The fs location of the users home directory */
            readonly home: string;
            /**The fs subdir under home directory for the application data */
            readonly subdir: string;
            /**The fs location of the application root */
            readonly root: string;
            /**The fs location of the application settings file */
            settings?: string;
            [index: string]: string | undefined;
        };
        [index: string]: {};
    }
    /**Definition for log4js category object */
    interface Log4jsCategory {
        [index: string]: {
            appenders: string[];
            level: string;
        };
    }
    /**Definition for the torrc file */
    interface Torrc {
        DataDirectory: string;
        HiddenServiceDir?: string;
        HiddenServicePort?: string;
        LongLivedPorts?: string;
        SocksPort?: string;
        [index: string]: string | undefined | boolean;
    }
    interface Tor extends Torrc {
        HiddenService: boolean;
    }
}
export declare type Test = Types.Environment;
