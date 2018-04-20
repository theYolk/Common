"use strict";

const path = require('path');
const fs = require('fs');
const child = require('child_process');
const system = require('./System.js');

class Onion{
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
        return getNetwork(loc);
    }
    
}

function getNetwork(loc){
    return new Promise((resolve,reject)=>{
        const O = child.spawn("tor",["-f",loc],{
            cwd:path.join(loc,'../')
        });
        O.stdout.on('data',(data)=>{
            if(data.toString().indexOf('Bootstrapped 100%: Done') >= 0){
                makeServer();
                resolve('onion ready');
            }
        });
    })    
}

function makeServer(){

}

module.exports =  Onion;