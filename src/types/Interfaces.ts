export namespace Types{
	/**Definition for system environment object */
	export interface Environment{
		dir:{
			/**The fs location of the users home directory */
			readonly home:string;
			/**The fs subdir under home directory for the application data */
			readonly subdir:string;
			/**The fs location of the application root */
			readonly root:string;
			/**The fs location of the application settings file */
			settings?:string;
			[index:string]: string|undefined;
		}
		[index:string]:{};
	}

	/**Definition for log4js category object */
	export interface Log4jsCategory{
		[index:string]: { 
			appenders: string[]; 
			level: string; 
		}
	}

	/**Definition for the torrc file */
	export interface Torrc{
		DataDirectory:string;
		HiddenServiceDir?:string;
		HiddenServicePort?:string;
		LongLivedPorts?:string;
		SocksPort?:string;
		[index:string]: string|undefined|boolean;
	}


	export interface Tor extends Torrc{
		HiddenService:boolean;
	}

}

export type Test = Types.Environment;

// JsDoc style comments for auto API documentation

//Tor
/** 
 * @summary Instantiation for the torrc file
 * @typedef {Object} module:Common.Tor
 * @see For all available options and formats see the [TOR sample torrc](https://github.com/torproject/tor/blob/master/src/config/torrc.sample.in)
 * @see module:Common.Onion.init
 * @prop {boolean} HiddenService - Is this TOR instance a hidden service?
 * @prop {string} DataDirectory - The path to the TOR data directory.
 * @prop {string} [HiddenServicePort]
 * @prop {string} [LongLivedPorts]
 * @prop {string} [SocksPort]
 * @prop {string} [index:string]
 * */
//Environment
/**
 * @summary Definition for system environment object
 * @typedef {Object} module:Common.Environment
 * @prop {Object} dir
 * @prop {string} dir.home - The fs location of the users home directory
 * @prop {string} dir.subdir - The fs subdir under home directory for the application data
 * @prop {string} dir.root - The fs location of the application settings file
 * @prop {string} [dir.settings]
 * @prop {string} [dir.index:string]
 * @prop {Object} [index.string]
 */