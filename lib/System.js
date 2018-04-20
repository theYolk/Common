"use strict";

const fs = require('fs');
const path = require('path');
const log4js = require('log4js');

class Filesystem {
    static init(){
        let settings = path.join(_Yolk.dir.root,"settings");
        if(!fs.existsSync(settings)) fs.mkdirSync(settings);
        settings = path.join(settings,"settings.json");
        _Yolk.dir.settings = settings;
        if(!fs.existsSync(settings)){
            this.makeSettings(_Yolk);
        }else{
            getSettings();
        }
        const home = path.join(_Yolk.dir.home,_Yolk.dir.subdir);
		if(!fs.existsSync(home)) fs.mkdirSync(home);
		const logdir = path.join(home,'logs');
		if(!fs.existsSync(logdir)) fs.mkdirSync(logdir);
		makeLogger(logdir);
    }
    static makeSettings(data){
        if(!data) return;
        if(fs.existsSync(_Yolk.dir.settings)){
            const data2 = require(_Yolk.dir.settings);
            Object.keys(data).forEach((key)=>{
                if(data.hasOwnProperty(key)) data2[key] = data[key];
            })
            _Yolk = data2;
        }
        data = JSON.stringify(_Yolk, null, '\t');
        fs.writeFileSync(_Yolk.dir.settings,data);   
    }
}

function getSettings(){
    _Yolk = require(_Yolk.dir.settings);
}

function makeLogger(logdir){
	log4js.configure({
		appenders: {
			file: {
				type: 'file', 
				filename: path.join(logdir,'theyolk.log'), 
				maxLogSize: 10485760, 
				backups: 3, 
				compress: true 
			},
			console: {
				type: 'console'
			}
		},
		categories: {
			default: { 
				appenders: [ 'file','console' ], 
				level: 'debug'
			}
		}
	});
	global.logger = log4js.getLogger();
	logger.info('log4js instantiated'); 
}

function shutDown(err){
	if(err) logger.error(err);
	logger.info('The application is shutting down');
	log4js.shutdown(()=>{
		process.exit();
	});	
}

process.on('exit',()=>{shutDown()});
process.on('SIGINT',()=>{shutDown()});
process.on('uncaughtException',(err)=>{
	shutDown(err.message)
});

module.exports = Filesystem;