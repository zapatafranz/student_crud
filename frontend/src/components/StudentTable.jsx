import React, { useState } from 'react';
import { Edit2, Trash2, Check, X, AlertTriangle, User } from 'lucide-react';

export default function StudentTable({
  students,
  isLoading,
  onEdit,
  onDelete,
  editingStudentId,
}) {
  // State for inline deletion confirmation per student ID (No Modal!)
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  const handleDeleteClick = (id) => {
    setConfirmDeleteId(id);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteId(null);
  };

  const handleConfirmDelete = async (id) => {
    try {
      setDeletingId(id);
      await onDelete(id);
    } finally {
      setDeletingId(null);
      setConfirmDeleteId(null);
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-xs p-6">
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="animate-pulse flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-slate-200"></div>
                <div className="space-y-2">
                  <div className="h-4 w-32 bg-slate-200 rounded"></div>
                  <div className="h-3 w-20 bg-slate-100 rounded"></div>
                </div>
              </div>
              <div className="h-6 w-24 bg-slate-200 rounded-full"></div>
              <div className="h-8 w-20 bg-slate-200 rounded-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (students.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-dashed border-slate-300 p-12 text-center shadow-xs">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-400">
          <User className="w-7 h-7" />
        </div>
        <h3 className="text-base font-semibold text-slate-800 mb-1">
          No students found
        </h3>
        <p className="text-sm text-slate-500 max-w-sm mx-auto">
          No student records match your search or filter. You can add one using the form above.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
              <th className="py-3.5 px-4">ID</th>
              <th className="py-3.5 px-4">Student Name</th>
              <th className="py-3.5 px-4">Course</th>
              <th className="py-3.5 px-4">Section</th>
              <th className="py-3.5 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-sm">
            {students.map((student) => {
              const isSelectedForEdit = editingStudentId === student.id;
              const isConfirmingDelete = confirmDeleteId === student.id;
              const isCurrentlyDeleting = deletingId === student.id;

              return (
                <tr
                  key={student.id}
                  className={`transition-colors ${
                    isSelectedForEdit
                      ? 'bg-indigo-50/60 font-medium'
                      : 'hover:bg-slate-50/60'
                  }`}
                >
                  {/* ID */}
                  <td className="py-3.5 px-4 font-mono text-xs text-slate-500">
                    #{student.id}
                  </td>

                  {/* Student Full Name */}
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase border border-slate-200">
                        {student.firstname ? student.firstname[0] : ''}
                        {student.lastname ? student.lastname[0] : ''}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">
                          {student.lastname}, {student.firstname}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Course Badge */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                      {student.course}
                    </span>
                  </td>

                  {/* Section Badge */}
                  <td className="py-3.5 px-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
                      {student.section}
                    </span>
                  </td>

                  {/* Actions (Non-modal) */}
                  <td className="py-3.5 px-4 text-right">
                    {isConfirmingDelete ? (
                      /* Inline deletion confirmation prompt right inside row */
                      <div className="inline-flex items-center gap-1.5 bg-rose-50 border border-rose-200 px-2 py-1 rounded-xl">
                        <AlertTriangle className="w-3.5 h-3.5 text-rose-600 flex-shrink-0" />
                        <span className="text-xs font-semibold text-rose-700">
                          Delete?
                        </span>
                        <button
                          onClick={() => handleConfirmDelete(student.id)}
                          disabled={isCurrentlyDeleting}
                          title="Confirm Delete"
                          className="px-2 py-0.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors cursor-pointer inline-flex items-center gap-1"
                        >
                          <Check className="w-3 h-3" />
                          {isCurrentlyDeleting ? '...' : 'Yes'}
                        </button>
                        <button
                          onClick={handleCancelDelete}
                          disabled={isCurrentlyDeleting}
                          title="Cancel Delete"
                          className="px-1.5 py-0.5 text-xs text-slate-600 hover:bg-slate-200 rounded-md transition-colors cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="inline-flex items-center gap-1">
                        <button
                          onClick={() => onEdit(student)}
                          title="Edit Student"
                          className={`p-1.5 rounded-lg text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 transition-colors cursor-pointer ${
                            isSelectedForEdit ? 'text-indigo-600 bg-indigo-100' : ''
                          }`}
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteClick(student.id)}
                          title="Delete Student"
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
