# ecommerce-microservices-system

Full-stack event-driven E-Commerce platform architecture using Spring Boot microservices, React.js + Tailwind CSS frontend, Apache Kafka, Docker, MySQL, and MongoDB.

## Services

- **Product Service** (MongoDB)
- **Order Service** (MySQL)
- **Inventory Service** (MySQL)
- **User Service** (MySQL + JWT + RBAC)
- **Notification Service** (Kafka consumer for email notifications)
- **Frontend** (React + Tailwind CSS)

## Core Features

- JWT authentication and role-based authorization (Admin/User)
- Admin dashboard for product and inventory management
- Product CRUD APIs
- Inventory management and stock tracking
- Order processing workflow with asynchronous events
- Kafka-based event communication between services
- Real-time stock updates from order events
- Notification events for order lifecycle (email integration point)
- Dockerized deployment with Docker Compose
- REST APIs for all domain services
- Responsive modern UI using React and Tailwind CSS

## Architecture

- Event-driven communication via Kafka topics
- Loosely coupled microservices
- Separate database per service
  - MongoDB for product catalog
  - MySQL for relational services (order, inventory, user)
- Containerized runtime via Docker Compose
- Independently scalable service containers

## Technology Stack

- **Backend:** Spring Boot, Spring Security, Spring Data JPA
- **Frontend:** React.js, Tailwind CSS
- **Messaging:** Apache Kafka
- **Databases:** MySQL, MongoDB
- **DevOps:** Docker, Docker Compose

## Local Orchestration (Docker Compose)

A baseline multi-container topology is provided in `docker-compose.yml` with:

- Kafka + Zookeeper
- MySQL
- MongoDB
- Product, Order, Inventory, User, Notification services
- React frontend

> Service container images are referenced by name and can be replaced with local builds as each service implementation is added.
