# Student Management CRUD Frontend

Modern, non-modal CRUD client for the Student REST API built with **Vite + React (JavaScript)** and styled with **Tailwind CSS**.

## Features

- **Full CRUD Capabilities**:
  - **Create**: Add new students with field validation.
  - **Read**: Fetch and display student records in a styled table with real-time search and course filtering.
  - **Update**: Non-modal inline edit mode that smoothly pre-fills the form with existing student details.
  - **Delete**: Non-modal inline row-level confirmation to safely delete student entries without popup dialogs.
- **Styling**: Tailwind CSS with responsive layout and clean typography.
- **Reverse Proxy**: Vite proxy configured to forward `/zapata` API requests to `http://localhost:8080` (avoids CORS issues).

---

## Getting Started

### 1. Start the Spring Boot Backend
Make sure PostgreSQL is running on `localhost:5432` with database `db_student` (as defined in `student/src/main/resources/application.properties`).

In a terminal, navigate to the `student` folder and start the server:
```bash
cd student
./mvnw spring-boot:run
```
The backend will run on `http://localhost:8080`.

### 2. Start the Vite React Frontend
In a separate terminal, navigate to the `frontend` folder:
```bash
cd frontend
npm install
npm run dev
```
Open your browser at `http://localhost:3000`.

---

## Project Structure

```
frontend/
├── src/
│   ├── api/
│   │   └── studentService.js    # API service calls to /zapata/students
│   ├── components/
│   │   ├── Alert.jsx            # Non-intrusive alert/toast banner
│   │   ├── Navbar.jsx           # Top navigation and student counter
│   │   ├── SearchBar.jsx        # Search and course filtering
│   │   ├── StudentForm.jsx      # Non-modal Add/Edit student form card
│   │   └── StudentTable.jsx     # Responsive table with inline delete confirmation
│   ├── App.jsx                  # Main dashboard state & orchestration
│   ├── index.css                # Tailwind CSS imports
│   └── main.jsx                 # React root render
├── vite.config.js               # Dev server port 3000 & backend proxy (/zapata -> :8080)
└── package.json
```
