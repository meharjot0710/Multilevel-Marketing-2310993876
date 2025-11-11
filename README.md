# MLM Binary Tree Application

A Multilevel Marketing (MLM) system with Binary Tree structure using Node.js and file-based storage.

## Features

- Binary Tree Structure (Left & Right positions)
- Automatic Spill Logic
- Member Registration with Sponsor Validation
- Secure Login System
- Dashboard with Team Statistics
- Profile and Downline Views

## Installation

```bash
npm install
node createRootMember.js
npm start
```

Open http://localhost:3000

## Default Login

```
Email: admin@mlm.com
Password: admin123
Member Code: MEM1001
```

## How It Works

Each member can have one left and one right downline member. When registering:
1. Enter sponsor code (e.g., MEM1001)
2. Choose position (Left/Right)
3. If position is filled, system automatically finds next available slot (Spill Logic)
4. Team counts update automatically

## Project Structure

```
├── database/db.js          # File-based database
├── models/Member.js        # Member model & spill logic
├── routes/
│   ├── auth.js            # Login/Register
│   └── member.js          # Dashboard routes
├── views/                 # EJS templates
└── server.js             # Express server
```

## Technologies

- Node.js & Express
- EJS Templates
- Bcrypt for password hashing
- File-based JSON storage
