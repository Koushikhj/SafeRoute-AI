# SafeRoute AI
## Project Requirements Document (PRD)

**Project Name:** SafeRoute AI  
**Project Type:** Full-Stack Web Application / Progressive Web App (PWA)  
**Target Audience:** General Public  
**Development Approach:** MERN Stack  
**Version:** 1.0

---

## 1. Project Overview

SafeRoute AI is an AI-powered smart travel safety and route assistance platform designed to help people make more informed travel decisions.

The application combines navigation, weather information, community safety reports, route analysis and real-time journey sharing into a single platform.

It will be accessible through desktop browsers and mobile devices as an installable Progressive Web Application.

## 2. Problem Statement

People travelling to unfamiliar or familiar destinations may face difficulties accessing reliable information about:

- Available routes and estimated travel times.
- Weather and environmental conditions.
- Road hazards and reported incidents.
- Potentially risky locations.
- Sharing their live journey with trusted contacts.
- Accessing emergency assistance information.

Existing navigation applications primarily focus on reaching destinations. SafeRoute AI aims to provide additional travel-safety information to support better-informed decisions.

## 3. Project Objectives

1. Provide smart route planning and navigation assistance.
2. Display relevant weather and environmental information.
3. Analyze routes using available safety-related information.
4. Allow users to report road hazards and incidents.
5. Enable live journey sharing with trusted contacts.
6. Provide an emergency alert workflow.
7. Deliver a responsive and accessible mobile-friendly experience.
8. Build a scalable application suitable for public use.

## 4. Target Audience

- Students and college commuters.
- Working professionals.
- Families and daily travellers.
- Tourists and long-distance travellers.
- People travelling to unfamiliar locations.

## 5. Core Functional Requirements

### 5.1 User Authentication
- User registration and login.
- Secure password storage.
- User profile management.
- Logout and protected routes.

### 5.2 Smart Route Planning
- Source and destination search.
- Current-location detection with permission.
- Multiple route alternatives where available.
- Distance and estimated travel time.
- Interactive map visualization.

### 5.3 Safety Intelligence
- Analyze available route information.
- Display relevant community reports.
- Identify known hazards.
- Generate evidence-based route assessments.
- Explain factors affecting route assessments.

### 5.4 Weather Information
- Retrieve weather information using an external API.
- Display temperature, humidity, wind and precipitation.
- Provide relevant weather warnings.

### 5.5 Community Reporting
- Submit incident and hazard reports.
- Include location and incident category.
- Display relevant reports on maps.
- Support report verification and moderation.

### 5.6 Live Journey Sharing
- Start and end journey-sharing sessions.
- Share live location with trusted contacts.
- Allow authorized contacts to view shared journeys.
- Provide journey status updates.

### 5.7 Emergency Assistance
- SOS activation workflow.
- Notify configured trusted contacts.
- Share location when permission is available.
- Display relevant emergency contact information.
- Clearly communicate whether notifications were successfully delivered.

### 5.8 Administration
- Manage users.
- Review and moderate reports.
- Handle inappropriate submissions.
- Monitor application activity.

## 6. Non-Functional Requirements

### Security
- Password hashing.
- Secure authentication.
- Protected API endpoints.
- Input validation.
- Secure API key management.

### Performance
- Efficient API communication.
- Optimized map rendering.
- Responsive interface.
- Appropriate caching.

### Reliability
- Handle unavailable external APIs.
- Validate incoming data.
- Provide meaningful error messages.
- Avoid presenting unverified information as confirmed.

### Usability
- Mobile-first responsive interface.
- Simple navigation.
- Accessible controls.
- Clear information presentation.

### Privacy
- Request location permission only when necessary.
- Allow users to control journey sharing.
- Protect personal and location information.
- Apply suitable data-retention policies.

## 7. Technology Stack

| Layer | Technology |
|---|---|
| Frontend | React.js + Vite |
| Styling | Tailwind CSS |
| Routing | React Router |
| Maps | React Leaflet |
| Map Data | OpenStreetMap |
| Route Engine | OSRM |
| Backend | Node.js + Express.js |
| Database | MongoDB Atlas |
| Authentication | JWT + bcrypt |
| Real-time | Socket.IO |
| AI | Gemini API |
| Weather | OpenWeather API |
| PWA | Vite PWA Plugin |
| Deployment | Vercel + Render |

## 8. Project Scope

### Initial Release
- Authentication.
- Dashboard.
- Smart route planning.
- Interactive maps.
- Weather information.
- Community reporting.
- Safety assessments.
- Journey sharing.
- Installable PWA.

### Advanced Release
- Advanced AI recommendations.
- Emergency workflows.
- Real-time notifications.
- Administrative dashboard.
- Safety heatmaps.
- Advanced analytics.

## 9. Expected Outcome

The expected outcome is a functional, responsive and publicly accessible travel safety platform that integrates navigation, environmental information, community participation and journey-sharing capabilities.

The application will provide useful information to support travel decisions without guaranteeing that any route or location is completely safe.

## 10. Project Status

**Current Phase:** Phase 1 – Planning and Documentation  
**Current Status:** Requirements Defined  
**Next Phase:** System Architecture and Technical Design