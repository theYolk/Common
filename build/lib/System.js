"use strict";
// Copyright (C) 2018 Michael Jonker
// 
// This file is part of The Yolk.
// 
// The Yolk is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
// 
// The Yolk is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
// 
// You should have received a copy of the GNU General Public License
// along with The Yolk.  If not, see <http://www.gnu.org/licenses/>.
// 
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const path = require("path");
const log4js = require("log4js");
let log, terminated;
const categories = {
    default: {
        appenders: ['file', 'console'],
        level: 'debug'
    }
};
/**
 * @summary Various system initialisations including file locations and logging
 * @memberof module:Common
 */
class System {
    /**
     * @constructor
     * @param {module:Common.Environment} env - The data for the environment
     */
    constructor(env) {
        /**
         * The environment data
         * @type {module:Common.Environment}
         * */
        this.env = init(env);
        log = this.setLogger(path.basename(__filename));
    }
    /**
     * Get or create a new instance of the system
     * @param {module:Common.Environment} - Env
     * @return {module:Common.System}
     */
    static getInstance(Env) {
        if (typeof System.instance === "undefined" && typeof Env === 'undefined') {
            throw new Error("You need to provide an environment object for the first instance of the system");
        }
        if (!System.instance && Env) {
            System.instance = new System(Env);
            log.info('System has been initialised');
        }
        return System.instance;
    }
    /**
     * Set the active log4js logger for the context
     * @param {string} category - Set the name for the logger to log under (usually the name of the file obtained by `path.basename(__filename)`)
     * @returns {log4js.Logger} - A log4js logger instance
     */
    setLogger(category) {
        categories[category] = {
            appenders: ['file', 'console'],
            level: 'debug'
        };
        let config = {
            appenders: {
                file: {
                    type: 'file',
                    filename: path.join(this.env.dir.home, this.env.dir.subdir, 'logs', 'theyolk.log'),
                    maxLogSize: 10485760,
                    backups: 3,
                    compress: true
                },
                console: {
                    type: 'console'
                }
            },
            categories: categories
        };
        log4js.configure(config);
        return log4js.getLogger(category);
    }
}
exports.System = System;
function init(env) {
    let settings = path.join(env.dir.root, "settings");
    if (!fs.existsSync(settings))
        fs.mkdirSync(settings);
    settings = path.join(settings, "settings.json");
    env.dir.settings = settings;
    if (!fs.existsSync(settings)) {
        env = makeSettings(env);
    }
    else {
        env = require(env.dir.settings);
    }
    const home = path.join(env.dir.home, env.dir.subdir);
    if (!fs.existsSync(home))
        fs.mkdirSync(home);
    const logdir = path.join(home, 'logs');
    if (!fs.existsSync(logdir))
        fs.mkdirSync(logdir);
    return env;
}
function makeSettings(env) {
    if (env.dir.settings && fs.existsSync(env.dir.settings)) {
        const data2 = require(env.dir.settings);
        Object.keys(env).forEach((key) => {
            if (env.hasOwnProperty(key))
                data2[key] = env[key];
        });
        env = data2;
    }
    const data = JSON.stringify(env, null, '\t');
    if (env.dir.settings)
        fs.writeFileSync(env.dir.settings, data);
    return env;
}
function shutDown(err) {
    terminated = true;
    if (typeof log === 'undefined') {
        if (err)
            console.error(err);
        process.exit();
        return;
    }
    if (err)
        log.error(err.stack || err.message);
    log.info('The application is shutting down');
    log4js.shutdown(() => {
        console.log('Bye Bye!');
        process.exit();
    });
}
process.on('exit', () => {
    if (!terminated)
        shutDown();
});
process.on('SIGINT', () => {
    shutDown();
});
process.on('uncaughtException', (err) => {
    shutDown(err);
});
