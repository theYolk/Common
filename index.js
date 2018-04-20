"use strict";

const fs = require('fs');
const files = fs.readdirSync('./lib');
const common = {};
files.forEach((file)=>{
    file = file.split('.')[0];
    common[file] = require('./lib/'+file)
})

module.exports = common;