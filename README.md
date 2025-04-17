# Bookstore API with React Frontend

This project is a full-stack application for an online bookstore. It includes a Spring Boot backend with REST APIs for CRUD operations on books, authors, publishers, customers, orders, and reviews. The frontend is built with React, Vite, and Tailwind CSS.

## Features

- RESTful API for managing bookstore entities
- React frontend with responsive UI
- Integration with PostgreSQL database
- Data seeding for testing purposes
- Unit tests for controllers and services

## Technologies Used

### Backend
- Java 21
- Spring Boot 3.4.4
- Spring Data JPA
- Spring Security
- PostgreSQL
- Lombok
- Swagger/OpenAPI for API documentation

### Frontend
- React 18
- Vite
- React Router
- Tailwind CSS
- Axios for API calls

## Getting Started

### Prerequisites
- Java 21 or higher
- Maven
- PostgreSQL
- Node.js and npm (for frontend development)

### Database Setup
1. Create a PostgreSQL database
2. Update the database configuration in `src/main/resources/application.properties`

### Running the Application
1. Clone the repository
2. Build and run the application using Maven:
   ```
   mvn clean install
   mvn spring-boot:run
   ```
3. The application will be available at `http://localhost:8080`
4. The API documentation will be available at `http://localhost:8080/swagger-ui.html`

### Development Mode
To run the frontend in development mode:
1. Navigate to the frontend directory:
   ```
   cd src/main/frontend
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. The frontend development server will be available at `http://localhost:5173`

## API Endpoints

The following API endpoints are available:

- `/api/books` - CRUD operations for books
- `/api/authors` - CRUD operations for authors
- `/api/publishers` - CRUD operations for publishers
- `/api/customers` - CRUD operations for customers
- `/api/orders` - CRUD operations for orders
- `/api/reviews` - CRUD operations for reviews

## Project Structure

- `src/main/java` - Java source code
  - `com.coursework.bookstore_api` - Main package
    - `config` - Configuration classes
    - `controller` - REST controllers
    - `dto` - Data Transfer Objects
    - `exceptions` - Custom exceptions
    - `model` - Entity classes
    - `repository` - Spring Data JPA repositories
    - `service` - Service interfaces and implementations
- `src/main/resources` - Application resources
  - `application.properties` - Application configuration
  - `static` - Static resources (built frontend)
- `src/main/frontend` - React frontend
  - `src` - Frontend source code
    - `components` - React components
    - `pages` - React pages
    - `services` - API services
- `src/test` - Test classes

## License

This project is licensed under the MIT License.