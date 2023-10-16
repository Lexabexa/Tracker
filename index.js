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

//prompt menu
async function promptMenu() {
    const { menu } = await inquirer.prompt({
        name: "menu",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Role",
            "Remove Role",
            "View All Departments",
            "Add Department",
            "Remove Department",
            "Exit"
        ]
    });
}
//if statements for menu
if (answer.menu === "View All Employees") {
    const query = "SELECT * FROM employee";
    db.query(query, (err, res) =>{
        if (err) {
            console.error("error:", err);
        } else {
            console.table(res);
            promptMenu();
        }
    })
} 

if (answer.menu === "View All Employees By Department") {
    const query = "SELECT * FROM department";
    db.query(query, (err, res) =>{
        if (err) {
            console.error("error:", err);
        } else {
            console.table(res);
            promptMenu();
        }
    })
}
if (answer.menu === "View All Employees By Manager") {
    const query = "SELECT * FROM manager";
    db.query(query, (err, res) =>{
        if (err) {
            console.error("error:", err);
        } else {
            console.table(res);
            promptMenu();
        }
    })
}
if (answers.menu === "Add Employee") {
    const roles = await fetchRoles();
    const managers = await fetchManagers();
    const { first_name, last_name, role_id, manager_id } = await inquirer.prompt([
        {
            name: "first_name",
            type: "input",
            message: "What is the employee's first name?"
        },
        {
            name: "last_name",
            type: "input",
            message: "What is the employee's last name?"
        },
        {
            name: "role_id",
            type: "list",
            message: "What is the employee's role?",
            choices: roles
        },
        {
            name: "manager_id",
            type: "list",
            message: "Who is the employee's manager?",
            choices: managers
        }
    ]);
    const query = "INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)";
    db.query(query, [first_name, last_name, role_id, manager_id], (err, res) => {
        if (err) {
            console.error("error:", err);
        } else {
            console.log("Employee added successfully");
            promptMenu();
        }
    })
}
//delete employee
if (answers.menu === "Remove Employee") {
    const employees = await fetchEmployees();
    const { employee_id } = await inquirer.prompt([
        {
            name: "employee_id",
            type: "list",
            message: "Which employee would you like to remove?",
            choices: employees
        }
    ]);
    const query = "DELETE FROM employee WHERE id = ?";
    db.query(query, [employee_id], (err, res) => {
        if (err) {
            console.error("error:", err);
        } else {
            console.log("Employee removed successfully");
            promptMenu();
        }
    })
}
//update employee manager
if (answers.menu === "Update Employee Manager") {
    const employees = await fetchEmployees();
    const managers = await fetchManagers();
    const { employee_id, manager_id } = await inquirer.prompt([
        {
            name: "employee_id",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employees
        },
        {
            name: "manager_id",
            type: "list",
            message: "Who is the employee's new manager?",
            choices: managers
        }
    ]);
    const query = "UPDATE employee SET manager_id = ? WHERE id = ?";
    db.query(query, [manager_id, employee_id], (err, res) => {
        if (err) {
            console.error("error:", err);
        } else {
            console.log("Employee manager updated successfully");
            promptMenu();
        }
    })
}

//update employee role
if (answers.menu === "Update Employee Role") {
    const employees = await fetchEmployees();
    const roles = await fetchRoles();
    const { employee_id, role_id } = await inquirer.prompt([
        {
            name: "employee_id",
            type: "list",
            message: "Which employee would you like to update?",
            choices: employees
        },
        {
            name: "role_id",
            type: "list",
            message: "What is the employee's new role?",
            choices: roles
        }
    ]);
    const query = "UPDATE employee SET role_id = ? WHERE id = ?";
    db.query(query, [role_id, employee_id], (err, res) => {
        if (err) {
            console.error("error:", err);
        } else {
            console.log("Employee role updated successfully");
            promptMenu();
        }
    })
}
//view all roles
if (answer.menu === "View All Roles") {
    const query = "SELECT * FROM role";
    db.query(query, (err, res) =>{
        if (err) {
            console.error("error:", err);
        } else {
            console.table(res);
            promptMenu();
        }
    })
}
//add role
if (answers.menu === "Add Role") {
    const departments = await fetchDepartments();
    const { title, salary, department_id } = await inquirer.prompt([
        {
            name: "title",
            type: "input",
            message: "What is the role's title?"
        },
        {
            name: "salary",
            type: "input",
            message: "What is the role's salary?"
        },
        {
            name: "department_id",
            type: "list",
            message: "What is the role's department?",
            choices: departments
        }
    ]);
    const query = "INSERT INTO role (title, salary, department_id) VALUES (?, ?, ?)";
    db.query(query, [title, salary, department_id], (err, res) => {
        if (err) {
            console.error("error:", err);
        } else {
            console.log("Role added successfully");
            promptMenu();
        }
    })
}
//remove role
if (answers.menu === "Remove Role") {
    const roles = await fetchRoles();
    const { role_id } = await inquirer.prompt([
        {
            name: "role_id",
            type: "list",
            message: "Which role would you like to remove?",
            choices: roles
        }
    ]);
    const query = "DELETE FROM role WHERE id = ?";
    db.query(query, [role_id], (err, res) => {
        if (err) {
            console.error("error:", err);
        } else {
            console.log("Role removed successfully");
            promptMenu();
        }
    })
}
//view all departments
if (answer.menu === "View All Departments") {
    const query = "SELECT * FROM department";
    db.query(query, (err, res) =>{
        if (err) {
            console.error("error:", err);
        } else {
            console.table(res);
            promptMenu();
        }
    })
}
//add department
if (answers.menu === "Add Department") {
    const { name } = await inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What is the department's name?"
        }
    ]);
    const query = "INSERT INTO department (name) VALUES (?)";
    db.query(query, [name], (err, res) => {
        if (err) {
            console.error("error:", err);
        } else {
            console.log("Department added successfully");
            promptMenu();
        }
    })
}
//remove department
if (answers.menu === "Remove Department") {
    const departments = await fetchDepartments();
    const { department_id } = await inquirer.prompt([
        {
            name: "department_id",
            type: "list",
            message: "Which department would you like to remove?",
            choices: departments
        }
    ]);
    const query = "DELETE FROM department WHERE id = ?";
    db.query(query, [department_id], (err, res) => {
        if (err) {
            console.error("error:", err);
        } else {
            console.log("Department removed successfully");
            promptMenu();
        }
    })
}
//exit
if (answers.menu === "Exit") {
    process.exit();
}
//start app
async function init() {
    promptMenu();
}
init();
//listen
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});


