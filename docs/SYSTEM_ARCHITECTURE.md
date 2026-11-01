# SafeRoute AI
# System Architecture Document

**Project:** SafeRoute AI  
**Architecture:** MERN Stack  
**Application Type:** Progressive Web Application (PWA)  
**Version:** 1.0

---

## 1. Architecture Overview

SafeRoute AI follows a client-server architecture using the MERN stack.

The application consists of:

1. Frontend – React.js
2. Backend – Node.js and Express.js
3. Database – MongoDB
4. Real-time Communication – Socket.IO
5. External Services – Mapping, routing, weather and AI APIs.

The frontend communicates with the backend through REST APIs and WebSocket connections.

The backend processes requests, communicates with the database and integrates external services.

## 2. High-Level Architecture

```text
                USERS
          Desktop / Mobile
                  |
                  v
          REACT PWA FRONTEND
                  |
          REST API / SOCKET.IO
                  |
                  v
          NODE.JS + EXPRESS
                  |
       +----------+-----------+
       |          |           |
       v          v           v
    MongoDB    External    AI Services
     Atlas       APIs       Gemini
                  |
          +-------+-------+
          |       |       |
          v       v       v
         OSM     OSRM   Weather
```

## 3. Frontend Architecture

**Technology:** React.js + Vite

Responsibilities:

- Display the user interface.
- Handle navigation between pages.
- Manage application state.
- Display interactive maps.
- Communicate with backend APIs.
- Manage authentication state.
- Provide responsive mobile and desktop layouts.

### Frontend Structure

```text
client/
|
+-- public/
|
+-- src/
    |
    +-- assets/
    |
    +-- components/
    |
    +-- pages/
    |
    +-- layouts/
    |
    +-- services/
    |
    +-- hooks/
    |
    +-- context/
    |
    +-- utils/
    |
    +-- App.jsx
    |
    +-- main.jsx
```

### Main Frontend Pages

- Home
- Register
- Login
- Dashboard
- Route Planner
- Journey Details
- Community Reports
- Profile
- Emergency Assistance
- Admin Dashboard

## 4. Backend Architecture

**Technology:** Node.js + Express.js

Responsibilities:

- Handle HTTP requests.
- Authenticate users.
- Validate incoming data.
- Manage application business logic.
- Communicate with MongoDB.
- Integrate external APIs.
- Manage real-time communication.
- Return structured API responses.

### Backend Structure

```text
server/
|
+-- config/
|
+-- controllers/
|
+-- models/
|
+-- routes/
|
+-- middleware/
|
+-- services/
|
+-- sockets/
|
+-- utils/
|
+-- server.js
```

## 5. Database Architecture

**Database:** MongoDB Atlas

The application will use MongoDB collections.

### Planned Collections

#### Users
Stores:
- User name.
- Email.
- Hashed password.
- Profile details.
- Account creation date.

#### Journeys
Stores:
- User ID.
- Starting location.
- Destination.
- Selected route information.
- Journey status.
- Creation timestamp.

#### EmergencyContacts
Stores:
- User ID.
- Contact name.
- Contact details.
- Relationship.
- Verification status.

#### LiveJourneys
Stores:
- Journey ID.
- Owner ID.
- Authorized viewers.
- Latest location.
- Sharing status.
- Expiration time.

#### IncidentReports
Stores:
- Reporter ID.
- Incident category.
- Description.
- Geographic coordinates.
- Verification status.
- Report timestamp.

#### SafetyAssessments
Stores:
- Journey or route reference.
- Assessment factors.
- Available evidence references.
- Assessment result.
- Creation timestamp.

#### Notifications
Stores:
- Recipient ID.
- Notification type.
- Message.
- Delivery status.
- Timestamp.

Database indexes, validation rules and retention policies will be implemented during database development.

## 6. API Architecture

The backend will expose REST API endpoints.

### Authentication APIs

```text
POST   /api/auth/register
POST   /api/auth/login
GET    /api/auth/me
POST   /api/auth/logout
```

### User APIs

```text
GET    /api/users/profile
PUT    /api/users/profile
```

### Journey APIs

```text
POST   /api/journeys
GET    /api/journeys
GET    /api/journeys/:id
PUT    /api/journeys/:id
```

### Route APIs

```text
POST   /api/routes/plan
GET    /api/routes/:id
```

### Community APIs

```text
POST   /api/reports
GET    /api/reports
GET    /api/reports/:id
PUT    /api/reports/:id
```

### Emergency APIs

```text
POST   /api/emergency/sos
POST   /api/emergency/contacts
GET    /api/emergency/contacts
```

### Safety APIs

```text
POST   /api/safety/analyze
GET    /api/safety/:id
```

These are planned endpoint contracts. Authentication, authorization, ownership checks and request validation will be required where appropriate.

## 7. External API Integration

### OpenStreetMap
Purpose:
- Map visualization.
- Geographic map data.
- Location display.

### OSRM
Purpose:
- Route calculation.
- Route alternatives where available.
- Distance and estimated travel duration.

### OpenWeather API
Purpose:
- Weather information.
- Temperature.
- Humidity.
- Wind conditions.
- Precipitation information.

### Gemini API
Purpose:
- Contextual AI explanations.
- Travel recommendations.
- Summarization of available safety information.

AI-generated information will be grounded in available evidence and will not replace verified emergency information.

## 8. Real-Time Communication

**Technology:** Socket.IO

Used for:

- Live journey location updates.
- Journey status updates.
- Emergency notifications.
- Real-time communication between authorized users.

Real-time location sharing will require explicit user permission and access control.

## 9. PWA Architecture

The application will support installation on compatible devices.

PWA capabilities:

- Web app manifest.
- Service worker.
- Installable application experience.
- Responsive interface.
- Appropriate caching.
- Offline access to selected non-live application resources.

Live location, routing, weather and emergency delivery will require network connectivity or a separately designed fallback.

## 10. Security Architecture

Security measures:

- Password hashing using bcrypt.
- JWT-based authentication.
- Environment variables for secrets.
- Protected API routes.
- Input validation.
- Role-based authorization.
- Rate limiting.
- Secure CORS configuration.
- Access control for live location.
- Secure WebSocket authorization.

## 11. Deployment Architecture

### Frontend
Vercel or equivalent hosting.

### Backend
Render or equivalent Node.js hosting.

### Database
MongoDB Atlas.

### Deployment Requirements
- HTTPS.
- Production environment variables.
- Database access restrictions.
- API error monitoring.
- Secure CORS configuration.
- Appropriate backups and recovery procedures.

## 12. Future Scalability

The architecture should support:

- More concurrent users.
- Additional external APIs.
- More database collections.
- Advanced AI functionality.
- Native mobile applications using shared backend APIs.
- Improved caching and background processing.

## 13. Architecture Status

**Current Phase:** Phase 1 – Planning and Documentation  
**Document Status:** Architecture Defined  
**Next Document:** Development Roadmap