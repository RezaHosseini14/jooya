const fs = require("node:fs");
const path = require('path');
const ini = require("ini");
const configs = ini.parse(fs.readFileSync(path.resolve(__dirname, "../configs.ini"),{ encoding: 'utf8', flag: 'r' }));
const services = {
    searchApi:`http://${configs.searchApiService}:${configs.searchApiServicePort}`
};
Object.freeze(services);
module.exports = {
  services,
  serverPort:configs.webServerPort
};
