'use strict';

const express = require('express');
const router = express.Router();
const Employee = require('../models/employee');
const path = require('path');

router.get('/', (req, res) => {
  Employee.find({}, (err, employees) => {
    if (err) {
      throw err;
    }
    const promises = employees.map(curEmp => {
      return Employee.count({ managerId: curEmp._id }).exec();// estimatedDocument + count()
    });
    let countOfDrs = [];

    Promise.all(promises)
      .then(counts => {
        countOfDrs = counts;
        const managerPromises = employees.map(curEmp => {
          return Employee.findById(curEmp.managerId).exec();
        });
        return Promise.all(managerPromises);
      })
      .then(managers => {
        const employeeList = [];
        for (let i = 0; i < employees.length; i++) {
          const employeeObj = {
            _id: employees[i]._id,
            name: employees[i].name,
            title: employees[i].title,
            imgUrl: employees[i].imgUrl,
            manager: (managers[i] && managers[i].name) || '',
            numberOfDirectReports: countOfDrs[i],
            officePhone: employees[i].officePhone,
            sex: employees[i].sex,
            cellphone: employees[i].cellphone,
            email: employees[i].email,
          };
          employeeList.push(employeeObj);
        }
        res.status(200).json({ employees: employeeList });
      })
      .catch(err => {
        res.status(500).json({ err });
        throw err;
      });
  });
});

router.get('/range/:offset/:number', (req, res) => {
  const offset = parseInt(req.params.offset);
  const number = parseInt(req.params.number);
  let curEmployees;
  let countOfDrs = [];
  Employee.find({}).skip(offset).limit(number).exec()
    .then(employees => {
      curEmployees = employees;
      const promises = employees.map(curEmp => {
        return Employee.count({ managerId: curEmp._id }).exec();
      });
      return Promise.all(promises);
    })
    .then(counts => {
      countOfDrs = counts;
      const promises = curEmployees.map(curEmp => {
        return Employee.findById(curEmp.managerId).exec();
      });
      return Promise.all(promises);
    })
    .then(managers => {
      const employeeList = [];
      for (let i = 0; i < curEmployees.length; i++) {
        const employeeObj = {
          _id: curEmployees[i]._id,
          name: curEmployees[i].name,
          title: curEmployees[i].title,
          imgUrl: curEmployees[i].imgUrl,
          manager: (managers[i] && managers[i].name) || '',
          numberOfDirectReports: countOfDrs[i],
          officePhone: curEmployees[i].officePhone,
          sex: curEmployees[i].sex,
          cellphone: curEmployees[i].cellphone,
          email: curEmployees[i].email,
        };
        employeeList.push(employeeObj);
      }
      res.status(200).json({ employees: employeeList });
    })
    .catch(err => {
      res.status(500).json({ err });
      throw err;
    });
});

router.get('/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;
  let curEmployee;
  let managerName;
  let number = 0;
  Employee.findById(employeeId).exec()
    .then(employee => {
      curEmployee = employee;
      return Employee.count({ managerId: curEmployee._id }).exec();
    })
    .then(count => {
      number = count;
      return Employee.findById(curEmployee.managerId).exec();
    })
    .then(manager => {
      if (manager === null) {
        managerName = '';
      } else {
        managerName = manager.name;
      }
      const employeeObj = {
        ...curEmployee.toObject(),
        managerName,
        numberOfDirectReports: number
      };
      res.status(200).json(employeeObj);
    })
    .catch(err => {
      res.status(500).json({ err });
      throw err;
    });
});

router.get('/:employeeId/manager', (req, res) => {
  const employeeId = req.params.employeeId;
  let countOfDrs = 0;
  let curManager;

  Employee.findById(employeeId).exec()
    .then(employee => {
      return Employee.findById(employee.managerId).exec();
    })
    .then(manager => {
      curManager = manager;
      return Employee.count({ managerId: manager._id }).exec();
    })
    .then(count => {
      countOfDrs = count;
      return Employee.findById(curManager.managerId).exec();
    })
    .then(manager => {
      const employeeList = [];
      const employeeObj = {
        _id: curManager._id,
        name: curManager.name,
        title: curManager.title,
        imgUrl: curManager.imgUrl,
        manager: (manager && manager.name) || '',
        numberOfDirectReports: countOfDrs,
        officePhone: curManager.officePhone,
        sex: curManager.sex,
        cellphone: curManager.cellphone,
        email: curManager.email,
      };
      employeeList.push(employeeObj);
      res.status(200).json({ employees: employeeList });
    })
    .catch(err => {
      res.status(500).json({ err });
      throw err;
    });
});

router.get('/:employeeId/directReports', (req, res) => {
  const employeeId = req.params.employeeId;
  let curDirectReports = [];
  let countOfDrs = [];

  Employee.find({ managerId: employeeId }).exec()
    .then(directReports => {
      curDirectReports = directReports;
      const promises = directReports.map(curEmp => {
        return Employee.count({ managerId: curEmp._id }).exec();
      });
      return Promise.all(promises);
    })
    .then(counts => {
      countOfDrs = counts;
      const promises = curDirectReports.map(curEmp => {
        return Employee.findById(curEmp.managerId).exec();
      });
      return Promise.all(promises);
    })
    .then(managers => {
      const employeeList = [];
      for (let i = 0; i < curDirectReports.length; i++) {
        const employeeObj = {
          _id: curDirectReports[i]._id,
          name: curDirectReports[i].name,
          title: curDirectReports[i].title,
          imgUrl: curDirectReports[i].imgUrl,
          manager: (managers[i] && managers[i].name) || '',
          numberOfDirectReports: countOfDrs[i],
          officePhone: curDirectReports[i].officePhone,
          sex: curDirectReports[i].sex,
          cellphone: curDirectReports[i].cellphone,
          email: curDirectReports[i].email,
        };
        employeeList.push(employeeObj);
      }
      res.status(200).json({ employees: employeeList });
    })
    .catch(err => {
      res.status(500).json({ err });
      throw err;
    });
});

router.post('/', (req, res) => {
  const employeeObj = req.body;
  const newEmployee = new Employee(employeeObj);
  newEmployee.save((err, employee) => {
    if (err) {
      res.status(500).json({ err });
      throw err;
    }
    const message = `Successfully created a new employee with id: ${employee._id}`;
    res.status(200).json({ message, employee });
  });
});

//create
router.post('/image', (req, res) => {
  let imageFile = req.files.image;     ///req.files pay attention
  imageFile.mv(path.join(__dirname, '..', 'public/images/', `${req.body.filename}`), err => {// mv moves the file to the directory with filenames
    if (err) {
      res.status(500).json({ err });
      throw err;
    }
    res.status(200).json({ file: `pubic/images/${req.body.filename}`, imgUrl: `/static/images/${req.body.filename}` });  //  static
  });
});

//Edit
router.put('/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;
  const updatedEmployee = req.body;
  let originalEmployee;
  Employee.findById(employeeId).exec()
    .then(employee => {
      originalEmployee = employee;
      return Employee.findByIdAndUpdate(employeeId, updatedEmployee,{  new: true }).exec();
    })
    .then(employeeUpdated => {
      const message = `employee id: ${employeeUpdated._id} has been updated successfully.`;
      if (updatedEmployee.managerId && updatedEmployee.managerId !== originalEmployee.managerId) {
        Employee.find({ managerId: originalEmployee._id }).exec()
          .then(directReports => {
            const promises = directReports.map(dr => {
              // 1. A -> B -> C  2. D->B  3. A -> C
              return Employee.findByIdAndUpdate(dr._id, { managerId: originalEmployee.managerId }).exec();
            });
            return Promise.all(promises);// get directReports promise
          })
          .then(() => {
            return Employee.count({ managerId: employeeUpdated._id }).exec();
          })
          .then(count => {// toObject: return a native js array
            const newEmployee = { ...employeeUpdated.toObject(), numberOfDirectReports: count }
            res.status(200).json({ message, employee: newEmployee });
          })
          .catch(err => {
            res.status(500).json({ err });
            throw err;
          });
      } else {
        Employee.count({ managerId: employeeUpdated._id }).exec()
          .then(count => {
            const newEmployee = { ...employeeUpdated.toObject(), numberOfDirectReports: count };// necessary...
            res.status(200).json({ message, employee: newEmployee });
          })
          .catch(err => {
            res.status(500).json({ err });
          });
      }
    })
    .catch(err => {
      res.status(500).json({ err });
      throw err;
    });
});

router.delete('/:employeeId', (req, res) => {
  const employeeId = req.params.employeeId;
  let originalEmployee;
  Employee.findById(employeeId).exec()
    .then(employee => {
      originalEmployee = employee;
      return Employee.findByIdAndRemove(employeeId).exec();
    })
    .then(() => {
      Employee.find({ managerId: originalEmployee._id }).exec()
        .then(directReports => {
          const message = `Employee id ${originalEmployee._id} has been deleted Successfully.`
          if (directReports) {
            const promises = directReports.map(dr => {
              return Employee.findByIdAndUpdate(dr._id, { managerId: originalEmployee.managerId }).exec();
            });
            Promise.all(promises)
              .then(directReports => {
                res.status(200).json({ message });
              })
              .catch(err => {
                res.status(500).json({ err });
                throw err;
              })
          } else {
            res.status(200).json({ message })
          }
        })
        .catch(err => {
          res.status(500).json({ err });
          throw err;
        });
    })
    .catch(err => {
      res.status(500).json({ err });
      throw err;
    });
});

module.exports = router;
