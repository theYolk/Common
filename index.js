"use strict";

const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(path.join(__dirname,'./lib'));
const common = {};
files.forEach((file)=>{
    file = file.split('.')[0];
    common[file] = require(path.join(__dirname,'./lib',file))
})

module.exports = common;