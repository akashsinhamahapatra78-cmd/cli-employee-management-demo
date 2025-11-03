#!/usr/bin/env node

const inquirer = require('inquirer');

// In-memory employee store (array of objects)
let employees = [];

// Utility functions
const findEmployeeIndexById = (id) => employees.findIndex(e => e.id === id);
const printEmployees = (list) => {
  if (!list.length) {
    console.log('No employees found.');
    return;
  }
  console.table(list);
};

async function addEmployee() {
  const answers = await inquirer.prompt([
    { name: 'id', message: 'Employee ID:', validate: v => v ? true : 'ID is required' },
    { name: 'name', message: 'Full Name:', validate: v => v ? true : 'Name is required' },
    { name: 'role', message: 'Role/Position:' },
    { name: 'department', message: 'Department:' },
  ]);

  if (employees.some(e => e.id === answers.id)) {
    console.log('Employee with this ID already exists.');
    return;
  }
  employees.push({ id: answers.id, name: answers.name, role: answers.role || '', department: answers.department || '' });
  console.log('Employee added successfully.');
}

async function listEmployees() {
  printEmployees(employees);
}

async function searchEmployees() {
  const { term } = await inquirer.prompt([{ name: 'term', message: 'Search term (matches id, name, role, department):' }]);
  const t = (term || '').toLowerCase();
  const result = employees.filter(e =>
    String(e.id).toLowerCase().includes(t) ||
    (e.name || '').toLowerCase().includes(t) ||
    (e.role || '').toLowerCase().includes(t) ||
    (e.department || '').toLowerCase().includes(t)
  );
  printEmployees(result);
}

async function updateEmployee() {
  if (!employees.length) return console.log('No employees to update.');
  const { id } = await inquirer.prompt([{ name: 'id', message: 'Employee ID to update:' }]);
  const idx = findEmployeeIndexById(id);
  if (idx === -1) return console.log('Employee not found.');
  const current = employees[idx];
  const answers = await inquirer.prompt([
    { name: 'name', message: `Full Name (${current.name}):` },
    { name: 'role', message: `Role (${current.role || ''}):` },
    { name: 'department', message: `Department (${current.department || ''}):` },
  ]);
  employees[idx] = {
    ...current,
    name: answers.name ? answers.name : current.name,
    role: answers.role !== undefined && answers.role !== '' ? answers.role : current.role,
    department: answers.department !== undefined && answers.department !== '' ? answers.department : current.department,
  };
  console.log('Employee updated successfully.');
}

async function deleteEmployee() {
  if (!employees.length) return console.log('No employees to delete.');
  const { id } = await inquirer.prompt([{ name: 'id', message: 'Employee ID to delete:' }]);
  const idx = findEmployeeIndexById(id);
  if (idx === -1) return console.log('Employee not found.');
  const { confirm } = await inquirer.prompt([{ type: 'confirm', name: 'confirm', message: `Are you sure you want to delete employee ${employees[idx].name}?`, default: false }]);
  if (!confirm) return console.log('Deletion cancelled.');
  employees.splice(idx, 1);
  console.log('Employee deleted successfully.');
}

async function mainMenu() {
  const { action } = await inquirer.prompt([
    {
      type: 'list',
      name: 'action',
      message: 'Employee Management - Choose an action:',
      choices: [
        { name: 'Add employee', value: 'add' },
        { name: 'List employees', value: 'list' },
        { name: 'Search employees', value: 'search' },
        { name: 'Update employee', value: 'update' },
        { name: 'Delete employee', value: 'delete' },
        { name: 'Exit', value: 'exit' },
      ],
    },
  ]);

  switch (action) {
    case 'add':
      await addEmployee();
      break;
    case 'list':
      await listEmployees();
      break;
    case 'search':
      await searchEmployees();
      break;
    case 'update':
      await updateEmployee();
      break;
    case 'delete':
      await deleteEmployee();
      break;
    case 'exit':
      console.log('Goodbye!');
      process.exit(0);
  }

  // Loop back to menu
  await mainMenu();
}

(async () => {
  console.log('Welcome to Employee Management CLI');
  await mainMenu();
})();
