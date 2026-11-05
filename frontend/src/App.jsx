import React, { useState, useEffect, useMemo, useCallback } from 'react';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import StudentForm from './components/StudentForm';
import SearchBar from './components/SearchBar';
import StudentTable from './components/StudentTable';
import * as studentApi from './api/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('');
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
  };

  const handleCloseAlert = () => {
    setAlert(null);
  };

  // Fetch students from backend
  const loadStudents = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await studentApi.getAllStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (err) {
      showAlert(
        `Could not connect to Student API: ${err.message}. Make sure Spring Boot is running on port 8080.`,
        'error'
      );
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Unique course list for filtering
  const courses = useMemo(() => {
    const set = new Set();
    students.forEach((s) => {
      if (s.course && s.course.trim()) {
        set.add(s.course.trim().toUpperCase());
      }
    });
    return Array.from(set).sort();
  }, [students]);

  // Filtered students based on search and course selection
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const fullName = `${s.firstname || ''} ${s.lastname || ''}`.toLowerCase();
      const idMatch = String(s.id || '').includes(searchTerm.trim());
      const textMatch =
        fullName.includes(searchTerm.toLowerCase().trim()) || idMatch;

      const courseMatch = selectedCourse
        ? (s.course || '').toUpperCase() === selectedCourse
        : true;

      return textMatch && courseMatch;
    });
  }, [students, searchTerm, selectedCourse]);

  // Save student (Create or Update)
  const handleSaveStudent = async (studentPayload) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // Update
        const updated = await studentApi.updateStudent(
          editingStudent.id,
          studentPayload
        );
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showAlert(`Student #${editingStudent.id} (${updated.firstname} ${updated.lastname}) updated successfully.`);
        setEditingStudent(null);
      } else {
        // Create
        const created = await studentApi.createStudent(studentPayload);
        setStudents((prev) => [created, ...prev]);
        showAlert(`Student ${created.firstname} ${created.lastname} added successfully.`);
      }
    } catch (err) {
      showAlert(`Error saving student: ${err.message}`, 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete student
  const handleDeleteStudent = async (id) => {
    try {
      await studentApi.deleteStudent(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      showAlert(`Student #${id} was deleted successfully.`);
      if (editingStudent && editingStudent.id === id) {
        setEditingStudent(null);
      }
    } catch (err) {
      showAlert(`Error deleting student #${id}: ${err.message}`, 'error');
    }
  };

  // Select student for inline edit
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    const formElement = document.getElementById('student-form-section');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      <Navbar totalStudents={students.length} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Feedback Alert */}
        <Alert alert={alert} onClose={handleCloseAlert} />

        {/* Dashboard Grid Layout (Non-modal) */}
        <div className="space-y-8">
          {/* Section 1: Non-modal Inline Student Form (Create or Edit) */}
          <StudentForm
            key={editingStudent ? editingStudent.id : 'create'}
            editingStudent={editingStudent}
            onSave={handleSaveStudent}
            onCancelEdit={handleCancelEdit}
            isSubmitting={isSubmitting}
          />

          {/* Section 2: Student Directory Controls & Table */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Student Records
                </h2>
                <p className="text-sm text-slate-500">
                  Manage enrolled students, search, and perform inline actions
                </p>
              </div>

              <div className="text-xs font-medium text-slate-500">
                Showing {filteredStudents.length} of {students.length} students
              </div>
            </div>

            {/* Filter & Search Bar */}
            <SearchBar
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
              selectedCourse={selectedCourse}
              onCourseChange={setSelectedCourse}
              courses={courses}
              onRefresh={loadStudents}
              isLoading={isLoading}
            />

            {/* Data Table with Inline Delete Confirmation (No Modal) */}
            <StudentTable
              students={filteredStudents}
              isLoading={isLoading}
              onEdit={handleEditStudent}
              onDelete={handleDeleteStudent}
              editingStudentId={editingStudent ? editingStudent.id : null}
            />
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-4 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-400">
          Student CRUD Application • Vite + React + Tailwind CSS
        </div>
      </footer>
    </div>
  );
}
