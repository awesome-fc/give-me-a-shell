'use strict';

var exec = require('child_process');

exports.handler = function(event, context, callback) {
  exec.exec(event.toString(), {}, function(err, stdout, stderr) {
    if (err) {
      callback(err);
      return;
    }

    console.log(stdout, stderr);
    callback(null, stdout);
  });
};
