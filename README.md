# Riderush API

**Riderush** is a backend ride-sharing service built with NestJS and TypeORM. This project is a proof of concept designed to demonstrate strong command over entity relationships, advanced query building, and scalable API architecture.

---

## 🧠 Project Goal

To gain deep, hands-on experience with:

* Relational database design using TypeORM
* Advanced usage of TypeORM QueryBuilder
* Modular and maintainable NestJS architecture
* Secure authentication using JWT
* API documentation using Swagger

---

## 🧰 Tech Stack

* **Backend Framework**: NestJS (TypeScript)
* **Database**: PostgreSQL
* **ORM**: TypeORM
* **Authentication**: JWT (Access & Refresh Tokens)
* **Validation**: class-validator, class-transformer
* **API Docs**: Swagger
* **Other**: CORS, dotenv

---

## 🧱 Key Features

* Stateless JWT-based authentication
* Role-based access control with NestJS guards
* Profile creation and ride publishing
* Ride booking and cancellation system
* Swagger documentation for all endpoints
* Planned: Rider review system, virtual wallet, mock payment flow

---

## 🗂️ Project Structure

```
src/
├── user/           # User entity and basic logic
├── profile/        # Profile creation and relationship with rides
├── ride/           # Ride creation, booking, and cancellation
└── review/         # (Planned) Ride feedback and ratings
```

---

## 🔄 Entity Relationships

* `User` → `Profile` (One-to-One)
* `Profile` → `Ride` (Many-to-One)
* Additional relationships like `ManyToMany` for participants are under development.

---

## 🚣️ API Documentation

Swagger is enabled for fast inspection and testing of endpoints.

**Access**:

```
http://localhost:3000/api
```

Use this to explore routes, request shapes, and response formats.

---

## 🚀 Running the App Locally

```bash
# Clone the repository
git clone https://github.com/najmulhc/riderush.git

# Navigate into the project
cd riderush

# Install dependencies
npm install

# Create your environment variables
cp .env.example .env

# Start the server
npm run start:dev
```

The API will be running at: `http://localhost:3000`

---

## ⚙️ Environment Variables

All required variables are listed in `.env.example`.
Replace placeholders with your own secure values.

Example:

```
JWT_SECRET=your_jwt_secret
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=yourpassword
DB_NAME=riderush
```

---

## 📌 Planned Features

* Account-based virtual wallet system
* Basic mock payment flow for demo purposes
* Review and rating system for rides and users
* Integration with external payment gateways

---

## 📚 Inspiration

Concept inspired by industry leaders such as **Uber** and **Pathao**.
Built as a learning showcase for backend architecture, not for production deployment.

---

## ✍️ Author

**Najmul Huda Chowdhury**
NestJS + TypeORM backend developer
GitHub: [@najmulhc](https://github.com/najmulhc)
LinkedIn: [najmulhc](https://www.linkedin.com/in/najmulhc)

---
