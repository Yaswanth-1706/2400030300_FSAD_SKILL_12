import { useEffect, useState } from 'react';

const initialForm = {
  name: '',
  email: '',
  course: '',
};

function AddStudent({ selectedStudent, onSave, onCancelUpdate, isSaving }) {
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    if (selectedStudent) {
      setFormData({
        name: selectedStudent.name || '',
        email: selectedStudent.email || '',
        course: selectedStudent.course || '',
      });
      return;
    }

    setFormData(initialForm);
  }, [selectedStudent]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSave(formData, selectedStudent?.id);

    if (!selectedStudent) {
      setFormData(initialForm);
    }
  };

  const isUpdateMode = Boolean(selectedStudent);

  return (
    <section className="panel form-panel">
      <h2>{isUpdateMode ? 'Update Student' : 'Add Student'}</h2>

      <form className="student-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter full name"
          required
        />

        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="name@example.com"
          required
        />

        <label htmlFor="course">Course</label>
        <input
          id="course"
          name="course"
          value={formData.course}
          onChange={handleChange}
          placeholder="e.g., Computer Science"
          required
        />

        <div className="form-actions">
          <button type="submit" className="btn btn-primary" disabled={isSaving}>
            {isSaving ? 'Saving...' : isUpdateMode ? 'Update' : 'Add'}
          </button>
          {isUpdateMode && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onCancelUpdate}
              disabled={isSaving}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default AddStudent;
