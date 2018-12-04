// mongodb config

const mongoose = require('mongoose');

function init() {
    mongoose.connect('mongodb://Fred:a123456@ds135624.mlab.com:35624/employee_management');
}

const db = mongoose.connection;
db.once('open', function() {
    console.log('mongodb connected.');
});

module.exports = init;

// function init() {
//     mongoose.connect('mongodb://root:123456@ds127139.mlab.com:27139/employees', { useNewUrlParser: true });
// }