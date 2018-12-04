/**
 *
 * Environment Config
 *
 */
const env = {
  production: {
    name: 'production',
    port: 5000
  },
  dev: {
    name: 'dev',
    port: 5001
  },
  test: {
    name: 'test',
    port: 5002
  }
};

// module.exports = env[process.env.NODE_ENV];
module.exports = env;

// const env = {
//   production: {
//     name: 'production',
//     port: 5000
//   },
//   dev: {
//     name: 'dev',
//     port: 5001
//   },
//   test: {
//     name: 'test',
//     port: 5002
//   }
// };

// module.exports = env[process.env.NODE_ENV];
