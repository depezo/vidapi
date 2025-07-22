// routes.js
// Initialize express router

let router = require('express').Router();
// require config file
const config = require('./config/conf');
// config file
global.config = config;
const _servers_ = './servers/';
// Set default API response
router.get('/', function (req, res) {
    res.set({ 'content-type': 'application/json; charset=utf-8' });
    res.json({
        status: 'online'.req.body.url,
        message: 'API online',
    });
});

//  routes
config.servers.forEach(server => {



    // Import server file
    if (!server || !server.length) {
        console.error('Server name is empty or undefined');
        return;
    }
    if (!require(`${_servers_}${server}`)) {
        console.error(`Server file for ${server} not found`);
        return;
    }
    if (typeof require(`${_servers_}${server}`).index !== 'function') {                 



    router.route(`/${server}`).post(require(`${_servers_}${server}`).index);
});
// Export API routes
module.exports = router;