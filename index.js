'use strict';

const FCClient = require('@alicloud/fc');
const readline = require('readline');

const REGION = process.env.REGION;
const ACCOUNT_ID = process.env.ACCOUNT_ID;
const ACCESS_KEY_ID = process.env.ACCESS_KEY_ID;
const ACCESS_KEY_SECRET = process.env.ACCESS_KEY_SECRET;
const SERVICE_NAME = process.env.SERVICE_NAME;
const FUNCTION_NAME = process.env.FUNCTION_NAME;

var client = new FCClient(ACCOUNT_ID, {
  accessKeyID: ACCESS_KEY_ID,
  accessKeySecret: ACCESS_KEY_SECRET,
  region: REGION,
});

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'fc@aliyun$ ',
});

rl.prompt();

rl.on('line', (line) => {
  switch (line.trim()) {
  case 'exit':
    console.log('Bye!');
    process.exit(0);
    break;
  default:
    client.invokeFunction(SERVICE_NAME, FUNCTION_NAME, line)
      .then(function(res) {
        console.log(res);
        rl.prompt();
      }).catch(function(err) {
        console.log(err);
        rl.prompt();
      });
  }
}).on('close', () => {
  console.log('Bye!');
  process.exit(0);
});
