# FindIt DIT – Lost & Found Management System

## Overview

**FindIt DIT** is a full-stack Lost and Found Management System developed as a second-year **Object-Oriented Programming (OOP)** course project at the **Dar es Salaam Institute of Technology (DIT)**.

The system provides a centralized platform where students and staff can report lost items, submit found items, and search for belongings through an organized digital system.

The project demonstrates the application of object-oriented programming principles, RESTful API development, relational database management, and modern frontend development practices using **Java Spring Boot, React, and PostgreSQL**.

---

# Features

* User registration and authentication
* Report lost items
* Report found items
* Browse reported items
* Search lost and found items
* View detailed item information
* Responsive user interface
* REST API communication between frontend and backend

---

# Technologies Used

## Backend

* Java 21
* Spring Boot
* Spring Web MVC
* Spring Data JPA
* Hibernate
* Maven

## Frontend

* React
* Vite
* Tailwind CSS
* Axios
* React Router
* Framer Motion

## Database

* PostgreSQL

## Development Tools

* IntelliJ IDEA / Visual Studio Code
* Postman
* Git
* GitHub

---

# Object-Oriented Programming Concepts Applied

The project demonstrates:

* Classes and Objects
* Encapsulation
* Inheritance
* Polymorphism
* Abstraction
* Separation of concerns
* Modular application design

---

# Requirements

Before running the project, install:

* Java 21 or later
* Maven
* Node.js (v18 or later recommended)
* PostgreSQL
* Git

Verify installations:

```bash
java -version
mvn -version
node -v
npm -v
```

---

# Installation and Setup

## 1. Clone the Repository

```bash
git clone https://github.com/debrahbryson/finditdit.git

cd finditdit
```

---

# Database Configuration

## 1. Start PostgreSQL

Make sure your PostgreSQL server is running.

## 2. Create Database

Using PostgreSQL:

```sql
CREATE DATABASE finditdit;
```

You can also create it using pgAdmin.

## 3. Configure Backend Database Connection

Navigate to:

```
finditdit/src/main/resources/application.properties
```

Update:

```properties
spring.datasource.url=jdbc:postgresql://localhost:5432/finditdit
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.format_sql=true
```

Replace:

* `YOUR_USERNAME` with your PostgreSQL username
* `YOUR_PASSWORD` with your PostgreSQL password

---

# Running the Backend

Open a terminal:

```bash
cd finditdit
```

Start Spring Boot:

```bash
mvn spring-boot:run
```

The backend will start at:

```
http://localhost:8080
```

To verify that it is running, check the Spring Boot console for:

```
Started FinditditApplication
```

---

# Running the Frontend

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

The frontend will run at:

```
http://localhost:5173
```

Open this URL in your browser.

---

# Running the Complete Application

To use the system:

1. Start PostgreSQL database
2. Start Spring Boot backend

```bash
mvn spring-boot:run
```

3. Start React frontend

```bash
npm run dev
```

4. Open:

```
http://localhost:5173
```

The frontend communicates with the backend through REST API endpoints running on:

```
http://localhost:8080
```

---

# Project Structure

```
FindIt DIT/
│
├── finditdit/          # Spring Boot backend
│
├── frontend/           # React frontend
│
├── .gitignore
└── README.md
```

---

# Learning Outcomes

This project provided practical experience in:

* Applying OOP principles in Java
* Developing REST APIs using Spring Boot
* Connecting applications with PostgreSQL databases
* Building responsive interfaces using React
* Managing source code using Git and GitHub
* Developing a complete full-stack application

---

# Future Improvements

Possible future enhancements:

* Image upload support
* Email notifications
* Advanced search and filtering
* User messaging system
* Administrative dashboard
* Item claim verification workflow
* JWT-based authorization
* Cloud deployment using platforms such as AWS, Azure, Railway, or Render

---

# Academic Information

**Course:** Object-Oriented Programming (OOP)

**Institution:** Dar es Salaam Institute of Technology (DIT)

**Project Type:** Second-Year Coursework Project

---

# Author

**Debrah Bryson**

Computer Engineering Student

GitHub:
https://github.com/debrahbryson

---

# License

This project was developed for educational purposes as part of coursework at the Dar es Salaam Institute of Technology.
