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

import express = require('express');
const app = express();

/**
 * @summary Various tools related to Http servers
 * @namespace module:Common.Http
 */
export namespace Http{
    /**
     * @summary Create a static http server
     * @param dir - The path to the directory which you wish to server
     * @param port - The port that the server is to listen on
     * @returns void
     * @memberof module:Common.Http
     */
    export function makeStatic(dir:string,port:number):void{
        app.use(express.static(dir))
        app.listen(port);
    }
}
