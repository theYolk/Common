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
const path = require("path");
const fs = require("fs");
const child = require("child_process");
const System_1 = require("./System");
const Process_1 = require("./Process");
let system, log;
/**
 * Tools to work with TOR and Onion services
 * @namespace module:Common.Onion
 * */
var Onion;
(function (Onion) {
    /**
     * Initialise a new TOR instance
     * @async
     * @param {string} name	Name for the subdirectory that the Tor data will be saved under
     * @param {module:Common.Tor} tor - The object with Tor data for creation
     * @returns {Promise<boolean,Error>} - A Promise of the child process, true if service started or Error if rejected
     * @memberof module:Common.Onion
     */
    function init(name, tor) {
        system = System_1.System.getInstance();
        if (!system)
            return;
        log = system.setLogger(path.basename(__filename));
        const dir = system.env.dir;
        let loc = path.join(dir.home, dir.subdir, 'tor');
        if (!fs.existsSync(loc))
            fs.mkdirSync(loc);
        loc = path.join(loc, name);
        if (!fs.existsSync(loc))
            fs.mkdirSync(loc);
        const torrc = {
            DataDirectory: loc,
            HiddenServiceDir: tor.HiddenService ? path.join(loc, 'keys') : undefined,
            SocksPort: tor.SocksPort,
            HiddenServicePort: tor.HiddenServicePort,
            LongLivedPorts: tor.LongLivedPorts,
        };
        let tors = "";
        Object.keys(torrc).forEach((key) => {
            if (torrc.hasOwnProperty(key) && torrc[key]) {
                tors += key + ' ' + torrc[key] + '\n';
            }
        });
        loc = path.join(loc, 'torrc');
        if (!fs.existsSync(loc))
            fs.writeFileSync(loc, tors);
        return makeNetwork(loc);
    }
    Onion.init = init;
})(Onion = exports.Onion || (exports.Onion = {}));
/* Boot an Onion hidden service or proxy */
function makeNetwork(loc) {
    return new Promise((resolve, reject) => {
        function timer() {
            return setTimeout(() => {
                O.kill();
                reject('TOR took too long to initialise');
            }, 5000);
        }
        const O = child.spawn("tor", ["-f", loc], {
            cwd: path.join(loc, '../')
        });
        let tOut = timer();
        Process_1.Process.init(O);
        O.stdout.on('data', (data) => {
            clearTimeout(tOut);
            tOut = timer();
            Process_1.Process.parseLog(data.toString()).forEach((line) => {
                if (line.indexOf('Bootstrapped 100%: Done') >= 0) {
                    makeServer();
                    log.info('Onion ready');
                    clearTimeout(tOut);
                    resolve(true);
                }
            });
        });
        O.stderr.on('data', (data) => {
            O.kill();
            reject(data.toString());
        });
    });
}
/* Create an http server for the Onion service */
function makeServer() {
}
