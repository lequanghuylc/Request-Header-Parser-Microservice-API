var express = require("express");
var app = express();
var requestIp = require('request-ip');
app.enable('trust proxy');
app.get("*", function(req, res){
    res.writeHead(200, { 'Content-Type': 'application/json' });
    var userAgent = req.headers['user-agent'];
    var software = userAgent.substring(userAgent.indexOf("(")+1, userAgent.indexOf(")"));
    var lang = req.headers['accept-language'];
    var obj = {
        "ipaddress": requestIp.getClientIp(req),
        "language": lang.split(",")[0],
        "software": software
    };
    res.end(JSON.stringify(obj));
});
var port = process.env.PORT || 8080;
app.listen(port);