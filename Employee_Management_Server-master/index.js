'use strict';

const app = require('./app');
const env = require('./config/env');

// console.log(env.production["port"]);
// const server = app.listen( env["production"].port, () => {
const server = app.listen( env.production["port"], () => {
  console.log(`${ env.production["name"]} server is listening at port ${ env.production["port"]}`);// ``is import
});

module.exports = server;



// 'use strict';

// const app = require('./app');
// const env = require('./config/env');

// const server = app.listen( env["production"].port, () => {
//   console.log(`${env.name} server is listening at port ${env.port}`);
// });

// module.exports = server;
