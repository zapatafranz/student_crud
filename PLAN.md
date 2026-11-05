# Project Context & Implementation: Student CRUD Application (Vite + React JS + Tailwind CSS)

## 1. Project Overview & Context

This project provides a full frontend CRUD interface for the Spring Boot Student Management backend service, prepared for zero-configuration deployment to **Render.com** via Blueprint (`render.yaml`).

### 1.1 Backend API Analysis
- **Framework**: Spring Boot 3 / Hibernate / PostgreSQL
- **Base Endpoint**: `/zapata/students`
- **Port**: Configurable via `PORT` env var (defaults to `8080`)
- **Entity Model (`Student`)**:
  | Field | Type | Description |
  |---|---|---|
  | `id` | `Integer` | Primary Key (auto-generated) |
  | `firstname` | `String` | Student first name |
  | `lastname` | `String` | Student last name |
  | `course` | `String` | Enrolled course/program (e.g., BSIT, BSCS) |
  | `section` | `String` | Assigned class section (e.g., 3A, 3B) |

### 1.2 REST Endpoints Specification
| Method | Endpoint | Request Body | Response | Description |
|---|---|---|---|---|
| `GET` | `/zapata/students` | None | `Array<Student>` | Retrieve all students |
| `GET` | `/zapata/students/{id}` | None | `Student` (or 404) | Retrieve student by ID |
| `POST` | `/zapata/students` | `{ firstname, lastname, course, section }` | `Student` (201 Created) | Add a new student |
| `PUT` | `/zapata/students/{id}` | `{ firstname, lastname, course, section }` | `Student` (200 OK) | Update existing student |
| `DELETE` | `/zapata/students/{id}` | None | Status message (200 OK) | Delete student by ID |

---

## 2. Architecture & Design Decisions

- **Styling**: **Tailwind CSS** (utility-first styling).
- **No Modals (Non-Modal UI)**:
  - **Inline Form Card**: The Add / Edit student form is directly embedded into the page as an interactive card.
  - **Inline Delete Confirmation**: Deletion actions display an inline confirmation prompt (`Delete? [Yes] [X]`) directly within table rows, avoiding modal dialogs.
- **Render.com Deployment Specification (`render.yaml`)**:
  - **Database**: Managed PostgreSQL instance (`student-db`), database `db_student`.
  - **Backend**: Docker web service (`student-backend`) built with Eclipse Temurin JDK 21 Alpine multi-stage Dockerfile. Injects PostgreSQL credentials from `student-db`.
  - **Frontend**: Static web service (`student-frontend`) running Vite React build, rewriting all routes to `/index.html` for client routing, and automatically referencing the backend host via `VITE_API_BASE_URL`.

---

## 3. Implemented Project Structure

```
STUDENT-CRUD/
├── PLAN.md                          # Project context & architecture plan (this document)
├── render.yaml                      # Render Blueprint (Backend + Frontend + PostgreSQL)
├── student/                         # Spring Boot Backend
│   ├── Dockerfile                   # Multi-stage Docker build for Render
│   ├── .dockerignore
│   ├── src/main/java/com/zapata/... # Spring Boot source files
│   ├── src/main/resources/
│   │   └── application.properties   # Dynamic DB configuration (${DB_HOST}, etc.)
│   └── pom.xml
└── frontend/                        # Vite + React + Tailwind CSS client
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── studentService.js    # API service calls (dynamic resolution for Render & local)
    │   ├── components/
    │   │   ├── Alert.jsx            # Feedback notification banner
    │   │   ├── Navbar.jsx           # App header & student counter
    │   │   ├── SearchBar.jsx        # Search & course filter
    │   │   ├── StudentForm.jsx      # Non-modal inline Add/Edit form card
    │   │   └── StudentTable.jsx     # Table with inline row-level delete confirmation
    │   ├── App.jsx                  # Main dashboard state & orchestration
    │   ├── index.css                # Tailwind CSS imports
    │   └── main.jsx                 # Vite React entry point
    ├── index.html
    ├── vite.config.js               # Dev server configuration with proxy
    └── package.json
```

---

## 4. How to Deploy to Render.com

1. Go to your [Render Dashboard](https://dashboard.render.com).
2. Click **New +** > **Blueprint**.
3. Connect your repository: `https://github.com/zapatafranz/student_crud`.
4. Render will parse [`render.yaml`](file:///C:/Users/Student-00/Desktop/ZAPATAFZ/DA3A/STUDENT-CRUD/render.yaml) and automatically provision:
   - **`student-db`** (PostgreSQL Database)
   - **`student-backend`** (Docker Web Service)
   - **`student-frontend`** (Static Site with SPA routing)
5. Click **Apply** to deploy all services together.
