# Project Context & Implementation: Student CRUD Application (Vite + React JS + Tailwind CSS)

## 1. Project Overview & Context

This project provides a full frontend CRUD interface for the Spring Boot Student Management backend service.

### 1.1 Backend API Analysis
- **Framework**: Spring Boot 3 / Hibernate / PostgreSQL
- **Base Endpoint**: `/zapata/students`
- **Default Server Port**: `8080` (`http://localhost:8080`)
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
  - When editing a student, the card dynamically transitions to Edit mode, highlights, and populates with the selected student's data. A "Cancel Edit" button reverts to Add mode.
  - **Inline Delete Confirmation**: Deletion actions display an inline confirmation prompt (`Delete? [Yes] [X]`) directly within table rows, avoiding modal dialogs.
- **Reverse Proxy**: Vite development server proxies requests to `/zapata` to `http://localhost:8080` to eliminate CORS issues.

---

## 3. Implemented Project Structure

```
STUDENT-CRUD/
├── PLAN.md                          # Project context & architecture plan (this document)
├── student/                         # Spring Boot Backend
│   ├── src/main/java/com/zapata/... # Spring Boot source files
│   └── pom.xml
└── frontend/                        # Vite + React + Tailwind CSS client
    ├── public/
    ├── src/
    │   ├── api/
    │   │   └── studentService.js    # API service calls (GET, POST, PUT, DELETE)
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

## 4. Implementation Status

- [x] **Phase 1: Planning & Context Capture** (Documented in repo)
- [x] **Phase 2: Project Scaffolding & Tailwind CSS Setup**
  - Scaffolded Vite React JavaScript app in `frontend/`.
  - Installed Tailwind CSS, `@tailwindcss/vite`, and `lucide-react`.
  - Configured Vite reverse proxy for `/zapata` -> `http://localhost:8080`.
- [x] **Phase 3: API Service Layer**
  - Implemented `src/api/studentService.js` handling all CRUD operations.
- [x] **Phase 4: Non-Modal Component Implementation**
  - Implemented `Navbar` with live student count badge.
  - Implemented `StudentForm` (inline card supporting Add and Edit with validation).
  - Implemented `StudentTable` with row-level inline delete confirmation (no modals).
  - Implemented `SearchBar` with real-time text and course dropdown filtering.
  - Implemented `Alert` notification system.
- [x] **Phase 5: App Integration & Build Verification**
  - Built production bundle (`npm run build`) successfully with 0 errors.
