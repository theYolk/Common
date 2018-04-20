"use strict";

const fs = require('fs');
const path = require('path');
const log4js = require('log4js');


class System {
	static init(){
		let settings = path.join(_Yolk.dir.root,"settings");
		if(!fs.existsSync(settings)) fs.mkdirSync(settings);
		settings = path.join(settings,"settings.json");
		_Yolk.dir.settings = settings;
		if(!fs.existsSync(settings)){
			this.makeSettings(Yolk);
		}else{
			getSettings();
		}
		const home = path.join(_Yolk.dir.home,_Yolk.dir.subdir);
		if(!fs.existsSync(home)) fs.mkdirSync(home);
		const logpath = path.join(home,'logs');
		if(!fs.existsSync(logpath)) fs.mkdirSync(logpath);
		makeLogger(logpath);
	}
	static makeSettings(data){
		if(!data) return;
		if(fs.existsSync(_Yolk.dir.settings)){
			const data2 = require(_Yolk.dir.settings);
			Object.keys(data).forEach((key)=>{
				if(data.hasOwnProperty(key)) data2[key] = data[key];
			})
			Yolk = data2;
		}
		data = JSON.stringify(Yolk, null, '\t');
		fs.writeFileSync(_Yolk.dir.settings,data);
	}
}

/* uses log4js-node: https://log4js-node.github.io/log4js-node/file.html */
function makeLogger(logpath){
	log4js.configure({
		appenders: {
			everything: {
				type: 'file',
				filename: path.join(logpath,'theyolk.log'),
				maxLogSize: 10485760,
				backups: 3,
				compress: true
			}
		},
		categories: {
			default: {
				appenders: [ 'everything' ],
				level: 'debug'
			}
		}
	});
	global.log = log4js.getLogger();
	log.info('Setup log4js');
}

function getSettings(){
	Yolk = require(_Yolk.dir.settings);
}

function shutdown(){
	log4js.shutdown();
	process.exit();
}
process.on('exit',shutdown());
process.on('SIGINT',shutdown());
process.on('uncaughtException',shutdown());

module.exports = System;