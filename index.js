//dependencies and libraries
const mysql = require("mysql2");
const inquirer = require("inquirer");
const express = require("express");
const db = require("./db/connect");

const port = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//fetch roles to give choices to user
async function fetchRoles() {
    return new Promise((resolve, reject) => {
        const query = "Select * FROM role";
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
                } else {
                    const roles = res.map((role) => {
                        return {
                            name: role.title,
                            value: role.id
                        }
                    })
                }));
                resolve(roles);
            }
        });
    }
}

//fetch managers to give choices to user
async function fetchManagers() {
    return new Promise((resolve, reject) => {
        const query = "Select * FROM employee";
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
                } else {
                    const managers = res.map((employee) => {
                        return {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id
                        }
                    })
                }));
                resolve(managers);
            }
        });
    }
}

//fetch department

async function fetchDepartments() {
    return new Promise((resolve, reject) => {
        const query = "Select * FROM department";
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
                } else {
                    const departments = res.map((department) => {
                        return {
                            name: department.name,
                            value: department.id
                        }
                    })
                }));
                resolve(departments);
            }
        });
    }
}

//fetch employees
async function fetchEmployees() {
    return new Promise((resolve, reject) => {   
        const query = "Select * FROM employee";
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
                } else {
                    const employees = res.map((employee) => {
                        return {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id
                        }
                    })
                }));
                resolve(employees);
            }
        });
    }
}
//add employee
async function addEmployee() {
    return new Promise((resolve, reject) => {
        const query = "Select * FROM employee";
        db.query(query, (err, res) => {
            if (err) {
                reject(err);
                } else {
                    const employees = res.map((employee) => {
                        return {
                            name: employee.first_name + " " + employee.last_name,
                            value: employee.id
                        }
                    })
                }));
                resolve(employees);
            }
        });
    }
}

//prompt 
