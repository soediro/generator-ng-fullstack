"use strict";

const morgan = require("morgan");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const express = require("express");
const compression = require("compression");
const zlib = require("zlib");

module.exports = class RouteConfig {
    static init(application) {
        let _root = process.cwd();
        let _nodeModules = "/node_modules/";
        let _clientFiles = (process.env.NODE_ENV === "production") ? "/client/dist/" : "/client/dev/";

        application.use(compression({
            level: zlib.Z_BEST_COMPRESSION,
            threshold: "1kb"
        }));
        
        application.use(express.static(_root + _nodeModules));
        application.use(express.static(_root + _clientFiles));
        application.use(bodyParser.json());
        application.use(morgan("dev"));
        application.use(helmet());
    }
}
