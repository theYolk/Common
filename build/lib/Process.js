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
const System_1 = require("./System");
let system;
/**
 * Manage and log output from child processes
 * @namespace module:Common.Process
 * */
var Process;
(function (Process) {
    /**
     * @summary Create management and logging for a child process
     * @param {child.ChildProcess} proc The child process
     * @param {boolean} silent Mute the logging for this process
     * @memberof module:Common.Process
     * @return {void}
     */
    function init(proc, silent) {
        if (!system)
            system = System_1.System.getInstance();
        if (!system)
            return;
        if (!silent) {
            const log = system.setLogger('PID ' + proc.pid.toString());
            proc.stdout.on('data', (data) => {
                cleanLines(data.toString()).forEach((line) => {
                    if (line.indexOf('[err]') === 0) {
                        log.error(line.replace('[err]', ''));
                    }
                    else if (line.indexOf('[warn]') === 0) {
                        log.warn(line.replace('[warn]', ''));
                    }
                    else {
                        log.info(line);
                    }
                });
            });
        }
    }
    Process.init = init;
    /**
     * @summary Parse a log string into an array of lines without meta info.
     * @param {string} data
     * @memberof module:Common.Process
     * @return {string[]}
     */
    function parseLog(data) {
        return cleanLines(data, true);
    }
    Process.parseLog = parseLog;
})(Process = exports.Process || (exports.Process = {}));
function cleanLines(data, skip) {
    const info = [];
    data.toString().split(/[\r\n]/g).forEach((line) => {
        let err = false;
        let warn = false;
        if (line.match(/\[(error|err|Error|Err|ERROR|ERR)\]/)) {
            err = true;
        }
        if (line.match(/\[(warning|warn|Warning|Warn|WARNING|WARN)\]/)) {
            warn = true;
        }
        const temp = line.split(/\[.*?\]/g);
        line = temp[temp.length - 1];
        if (err && !skip)
            line = '[err]' + line.trim();
        if (warn && !skip)
            line = '[warn]' + line.trim();
        if (line && line.length)
            info.push(line.trim());
    });
    return info;
}
