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

"use strict";

const path = require('path');
const fs = require('fs');
const child = require('child_process');
const System = require('./System.js');
const log = System.setLogger('onion');

class Onion{
    constructor(){
        this.test = function(){console.log('test')}; 
    };
    static init(type,torrc){
        let loc = path.join(_Yolk.dir.home,_Yolk.dir.subdir,'tor');
        if(!fs.existsSync(loc)) fs.mkdirSync(loc);
        loc = path.join(loc,type);
        if(!fs.existsSync(loc)) fs.mkdirSync(loc);
        torrc.DataDirectory = path.join(loc,'data');
        if(torrc.HiddenServiceDir) torrc.HiddenServiceDir = path.join(loc,'keys');
        let tor = "";
        Object.keys(torrc).forEach((key)=>{
            if(torrc.hasOwnProperty(key)){
                tor += key+' '+torrc[key]+'\n';
            }
        })       
        loc = path.join(loc,'torrc');
        if(!fs.existsSync(loc)) fs.writeFileSync(loc,tor);
        return makeNetwork(loc);
    }
      
}

/* Create an Onion hidden service or proxy */
function makeNetwork(loc){
    return new Promise((resolve,reject)=>{
        const O = child.spawn("tor",["-f",loc],{
            cwd:path.join(loc,'../')
        });
        O.stdout.on('data',(data)=>{
            if(data.toString().indexOf('Bootstrapped 100%: Done') >= 0){
                makeServer();
                log.info('Onion ready');
                resolve('onion ready');
            }
        });
    })    
}

/* Create an http server for the Onion service */
function makeServer(){

}

module.exports =  new Onion();