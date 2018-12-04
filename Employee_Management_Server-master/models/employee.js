const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//it's better to use object 
const employeeSchema = new Schema({
  name: {type: String, required: true},
  title: String,
  sex: String,
  startDate: Date,
  officePhone: String,
  cellphone: String,
  SMS: String,
  email: String,
  imgUrl: String,
  managerId: Schema.Types.ObjectId,// 
  age: Number,
});

const Employee = mongoose.model('Employee', employeeSchema);
 
module.exports = Employee;