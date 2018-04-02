const tcpp = require('tcp-ping');

function PingService() {}

exports = module.exports = PingService;

PingService.prototype.ping = function(service, callback) {
    var startTime = +new Date();
    var url = service.url.replace(/.*?:\/\//g, '');
    tcpp.probe(url, service.port, function(error, available) {
        if (error) {
            callback(error.toString(), '', available, +new Date() - startTime);
        } else if (!available) {
            callback('Port unreachable', '', available, +new Date() - startTime);
        } else {
            callback(null, '', available, +new Date() - startTime);
        }
    });
};

PingService.prototype.getDefaultOptions = function() {
    return {}; // there is not need for UI confi options for this ping service
};
