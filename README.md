# Sales Entry App

A full-stack Sales Entry management application built with **ReactJS (frontend)** and **Node.js + Sequelize + MySQL (backend)**. The application includes dynamic sales forms with header/detail structure, printable voucher generation, and Excel export functionality.

##  Repository Structure

This project is divided into two main parts located in the `development` branch:

- [Backend](https://github.com/aghil2003/salesEntry/tree/development/backend) — Node.js, Express, Sequelize ORM, MySQL
- [Frontend](https://github.com/aghil2003/salesEntry/tree/development/frontend) — ReactJS, Redux Toolkit, Tailwind CSS

---

##  Backend Setup

###  Path:
[`/backend`](https://github.com/aghil2003/salesEntry/tree/development/backend)

###  Prerequisites
- Node.js (v18+)
- MySQL
- Sequelize CLI

###  Getting Started

cd backend
npm install
🛠 Setup Environment
Create a .env file:

## env

DB_NAME=sales_db
DB_USER=root
DB_PASSWORD=yourpassword
DB_HOST=localhost
PORT=5000

## Run Migrations
npx sequelize-cli db:migrate

## Start Backend Server
npm run dev

## Frontend Setup
 Path:
/frontend

## Prerequisites
Node.js (v18+)

Vite

Redux Toolkit

## Getting Started
cd frontend
npm install
npm run dev


## Tech Stack
--Frontend
ReactJS
Redux Toolkit
Tailwind CSS
React Hot Toast
Axios
React-to-Print

--Backend
Node.js
Express.js
Sequelize ORM
MySQL
CORS, dotenv


## Development
This project follows a development branch workflow. Always make feature branches from development.

