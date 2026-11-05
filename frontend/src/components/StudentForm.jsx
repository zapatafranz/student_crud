import React, { useState } from 'react';
import { UserPlus, Save, X, RotateCcw, Sparkles } from 'lucide-react';

export default function StudentForm({
  editingStudent,
  onSave,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: editingStudent?.firstname || '',
    lastname: editingStudent?.lastname || '',
    course: editingStudent?.course || '',
    section: editingStudent?.section || '',
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) {
      newErrors.firstname = 'First name is required';
    }
    if (!formData.lastname.trim()) {
      newErrors.lastname = 'Last name is required';
    }
    if (!formData.course.trim()) {
      newErrors.course = 'Course is required';
    }
    if (!formData.section.trim()) {
      newErrors.section = 'Section is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    onSave({
      firstname: formData.firstname.trim(),
      lastname: formData.lastname.trim(),
      course: formData.course.trim().toUpperCase(),
      section: formData.section.trim().toUpperCase(),
    });
  };

  const handleReset = () => {
    if (editingStudent) {
      onCancelEdit();
    } else {
      setFormData({ firstname: '', lastname: '', course: '', section: '' });
      setErrors({});
    }
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div
      id="student-form-section"
      className={`bg-white rounded-2xl shadow-sm border transition-all duration-300 p-6 ${
        isEditing
          ? 'border-indigo-500 ring-2 ring-indigo-100 bg-linear-to-b from-indigo-50/20 to-white'
          : 'border-slate-200'
      }`}
    >
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-slate-100">
        <div className="flex items-center gap-2.5">
          <div
            className={`w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm ${
              isEditing
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-200'
                : 'bg-emerald-600 text-white shadow-sm shadow-emerald-200'
            }`}
          >
            {isEditing ? <Sparkles className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-base font-bold text-slate-800">
              {isEditing ? `Edit Student #${editingStudent.id}` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing
                ? 'Update student details and save changes'
                : 'Fill in details to register a new student'}
            </p>
          </div>
        </div>

        {isEditing && (
          <button
            type="button"
            onClick={onCancelEdit}
            className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-3.5 h-3.5" />
            Cancel Edit
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* First Name */}
          <div>
            <label
              htmlFor="firstname"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              First Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="e.g. Juan"
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.firstname
                  ? 'border-rose-300 focus:ring-rose-200 text-rose-900'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
              }`}
            />
            {errors.firstname && (
              <p className="mt-1 text-xs text-rose-500">{errors.firstname}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label
              htmlFor="lastname"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              Last Name <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="e.g. Dela Cruz"
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.lastname
                  ? 'border-rose-300 focus:ring-rose-200 text-rose-900'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
              }`}
            />
            {errors.lastname && (
              <p className="mt-1 text-xs text-rose-500">{errors.lastname}</p>
            )}
          </div>

          {/* Course */}
          <div>
            <label
              htmlFor="course"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              Course / Program <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="course"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSIT, BSCS, BSCpE"
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.course
                  ? 'border-rose-300 focus:ring-rose-200 text-rose-900'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
              }`}
            />
            {errors.course && (
              <p className="mt-1 text-xs text-rose-500">{errors.course}</p>
            )}
          </div>

          {/* Section */}
          <div>
            <label
              htmlFor="section"
              className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5"
            >
              Section <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              id="section"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3A, 4B"
              disabled={isSubmitting}
              className={`w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 focus:bg-white focus:outline-none focus:ring-2 transition-all ${
                errors.section
                  ? 'border-rose-300 focus:ring-rose-200 text-rose-900'
                  : 'border-slate-200 focus:border-indigo-500 focus:ring-indigo-100 text-slate-900'
              }`}
            />
            {errors.section && (
              <p className="mt-1 text-xs text-rose-500">{errors.section}</p>
            )}
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={handleReset}
            disabled={isSubmitting}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors inline-flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            {isEditing ? 'Cancel Edit' : 'Clear'}
          </button>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-5 py-2.5 text-sm font-semibold text-white rounded-xl shadow-md transition-all inline-flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
              isEditing
                ? 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                : 'bg-emerald-600 hover:bg-emerald-700 shadow-emerald-100'
            }`}
          >
            {isSubmitting ? (
              <>
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
                Saving...
              </>
            ) : isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Update Student
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Save Student
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
