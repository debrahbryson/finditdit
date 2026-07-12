# FindIt DIT – Lost & Found Management System

## Overview

**FindIt DIT** is a Lost and Found Management System developed as a second-year Object-Oriented Programming (OOP) course project. The application provides a centralized platform where students and staff of the Dar es Salaam Institute of Technology (DIT) can report lost items, post found items, and search for belongings efficiently.

The project demonstrates the application of object-oriented programming principles, full-stack web development, and modern software engineering practices using Java Spring Boot, React, and PostgreSQL.

---

## Features

- User registration and authentication
- Report lost items
- Report found items
- Browse all reported items
- Search for lost or found items
- View detailed information about each item
- Responsive user interface
- RESTful API communication between frontend and backend



## Technologies Used

### Backend

- Java 21
- Spring Boot
- Spring Web
- Spring Data JPA
- Maven

### Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Framer Motion

### Database

- PostgreSQL

### Development Tools

- IntelliJ IDEA / Visual Studio Code
- Postman
- Git
- GitHub



## Object-Oriented Programming Concepts Applied

This project demonstrates the use of:

- Classes and Objects
- Encapsulation
- Inheritance
- Polymorphism
- Abstraction
- Modular system design



# Getting Started

## Prerequisites

Install the following software before running the project:

- Java 21 or later
- Maven
- Node.js (v18 or later recommended)
- PostgreSQL
- Git



## Clone the Repository

```bash
git clone https://github.com/debrahbryson/finditdit.git
cd finditdit
```



# Database Setup

### 1. Start PostgreSQL

Ensure your PostgreSQL server is running.

### 2. Create a database

Using **psql**:

```sql
CREATE DATABASE finditdit;
```

Or create it using **pgAdmin**.

### 3. Configure Spring Boot

Open:

```
finditdit/src/main/resources/application.properties
```

(or `application.yml` if you are using YAML)

Update the database configuration:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/finditdit
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Replace:

- `YOUR_USERNAME`
- `YOUR_PASSWORD`

with your PostgreSQL credentials.

### 4. Verify the connection

Run the backend. If the application starts successfully without database errors, the connection is configured correctly.



# Backend Setup

Open a terminal:

```bash
cd finditdit
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

The backend will start on:

```
http://localhost:8080
```



# Frontend Setup

Open another terminal:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will typically run on:

```
http://localhost:5173
```



# Project Structure

```
FindIt DIT/
│
├── finditdit/              # Spring Boot backend
│   ├── src/
│   ├── pom.xml
│   └── ...
│
├── frontend/               # React + Vite frontend
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── .gitignore
└── README.md
```



## Learning Outcomes

Through this project, I gained practical experience in:

- Applying Object-Oriented Programming principles
- Building REST APIs using Spring Boot
- Developing responsive user interfaces with React
- Managing relational databases using PostgreSQL
- Version control using Git and GitHub
- Structuring and organizing a full-stack application



## Future Improvements

Planned enhancements include:

- Image upload support
- Email notifications
- Advanced search and filtering
- User messaging
- Administrative dashboard
- Item claim verification workflow
- JWT authentication and authorization
- Cloud deployment (Render, Railway, Azure, or AWS)



## Academic Information

**Course:** Object-Oriented Programming (OOP)

**Institution:** Dar es Salaam Institute of Technology (DIT)

**Project Type:** Second-Year Coursework Project



## Author

**Debrah Bryson**

Computer Engineering Student

GitHub: https://github.com/debrahbryson



## License

This project was developed for educational purposes as part of coursework at the Dar es Salaam Institute of Technology (DIT).
