"use strict";

const fs = require('fs');
const path = require('path');
const files = fs.readdirSync(path.join(__dirname,'./lib'));

files.forEach((file)=>{
    file = file.split('.')[0];
    module.exports[file] = require(path.join(__dirname,'./lib',file))
})