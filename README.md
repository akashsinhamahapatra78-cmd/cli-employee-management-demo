# CLI Employee Management (Node.js)

A simple Node.js CLI application that manages employees in-memory using arrays. Supports add, list, search, update, and delete operations via interactive prompts.

## Features
- Add employee (id, name, role, department)
- List employees (tabular view)
- Search employees (by id, name, role, department)
- Update employee details
- Delete employee with confirmation

## Prerequisites
- Node.js 14+ installed

## Setup
```bash
# Clone the repository
git clone https://github.com/akashsinhamahapatra78-cmd/cli-employee-management-demo.git
cd cli-employee-management-demo

# Install dependencies
npm install
```

## Usage
Run with Node:
```bash
npm start
```

Or make it globally runnable (optional):
```bash
npm link
employee-cli
```

### Commands (via menu)
- Add employee: prompts for id, name, role, department
- List employees: shows all employees
- Search employees: enter term to match id/name/role/department
- Update employee: choose ID, then update fields (leave blank to keep current)
- Delete employee: choose ID, confirm deletion
- Exit: quit the CLI

## Notes
- Data is stored in memory only (array). Restarting the app resets the data.
- Built with inquirer for interactive prompts.

## Scripts
- npm start: Start the CLI

## License
MIT
