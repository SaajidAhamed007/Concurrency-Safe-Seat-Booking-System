# Concurrency-Safe Seat Booking System

A distributed seat booking platform built with Node.js, PostgreSQL, Redis, and React, designed to prevent double bookings and ensure consistent seat allocation under high concurrency.

This project demonstrates real-world backend patterns including distributed locking, transactional consistency, caching, and scalable booking workflows commonly used in ticketing and reservation systems.

---

## Problem Statement

High-traffic booking systems face several challenges:

* Multiple users attempting to reserve the same seat
* Race conditions during concurrent requests
* Inconsistent booking states
* Temporary seat reservation management
* Maintaining availability accuracy at scale

This project solves these challenges using Redis distributed locks and PostgreSQL transactions.

---

## System Architecture

```text
Client
   │
   ▼
React Frontend
   │
   ▼
Node.js API
   │
 ┌─┴─────────┐
 ▼           ▼
Redis     PostgreSQL
(Locks)   (Bookings)
```

---

## Core Features

### Distributed Seat Locking

Uses Redis locks with TTL to temporarily reserve seats and prevent concurrent users from selecting the same seat.

### Transactional Booking

Booking confirmation is executed within PostgreSQL transactions to ensure atomic seat allocation and prevent inconsistent data.

### Real-Time Seat Availability

Tracks seat states in real time:

* Available
* Locked
* Booked

### Automatic Lock Expiration

Reserved seats are automatically released when lock duration expires, making them available for other users.

### Authentication & Authorization

Secure user authentication using JWT-based access and refresh tokens.

### Scalable Architecture

Separates temporary state management (Redis) from persistent booking data (PostgreSQL), enabling horizontal scalability.

---

## Tech Stack

### Frontend

* React 19
* TypeScript
* Zustand

### Backend

* Node.js
* Express.js
* JWT Authentication

### Database

* PostgreSQL

### Distributed Coordination

* Redis
* Distributed Locking
* TTL-Based Seat Reservation

---

## Booking Workflow

```text
Select Seat
     │
     ▼
Acquire Redis Lock
     │
     ▼
Validate Availability
     │
     ▼
Create Booking Transaction
     │
     ▼
Commit Transaction
     │
     ▼
Release Lock
     │
     ▼
Booking Confirmed
```

---

## Project Structure

```text
backend/
├── controllers/
├── routes/
├── middleware/
├── services/
├── utils/
└── db/

frontend/
├── pages/
├── stores/
├── components/
└── types/
```

---

## Running the Project

```bash
git clone <repository-url>

cd backend
npm install

cd ../frontend
npm install

npm run dev
```

Required Services:

* PostgreSQL
* Redis

---

## Engineering Concepts Demonstrated

* Distributed Systems
* Concurrency Control
* Redis Distributed Locking
* Transaction Management
* Race Condition Prevention
* ACID Properties
* JWT Authentication
* Horizontal Scalability
* Cache-Aside Architecture

---

## Future Enhancements

* Payment Gateway Integration
* Booking Analytics Dashboard
* Kafka-Based Event Processing
* Kubernetes Deployment
* Prometheus & Grafana Monitoring

---

## Author

**Saajid Ahamed**

GitHub: https://github.com/SaajidAhamed007
