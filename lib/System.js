"use strict";

const fs = require('fs');
const path = require('path');

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

module.exports = Filesystem;