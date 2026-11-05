const API_BASE_URL = import.meta.env.VITE_API_URL || '/zapata/students';

/**
 * Fetch all students from backend
 */
export async function getAllStudents() {
  const response = await fetch(`${API_BASE_URL}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch students (${response.status})`);
  }
  return response.json();
}

/**
 * Fetch single student by id
 */
export async function getStudentById(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to fetch student with ID ${id}`);
  }
  return response.json();
}

/**
 * Create a new student
 * Payload: { firstname, lastname, course, section }
 */
export async function createStudent(studentData) {
  const response = await fetch(`${API_BASE_URL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to create student (${response.status})`);
  }
  return response.json();
}

/**
 * Update an existing student
 * Payload: { firstname, lastname, course, section }
 */
export async function updateStudent(id, studentData) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to update student (${response.status})`);
  }
  return response.json();
}

/**
 * Delete a student by ID
 */
export async function deleteStudent(id) {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || `Failed to delete student (${response.status})`);
  }

  // Backend returns plain text message
  return response.text();
}
