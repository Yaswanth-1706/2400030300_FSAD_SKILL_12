import { useEffect, useState } from 'react';
import AddStudent from './components/AddStudent';
import StudentList from './components/StudentList';
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from './services/studentService';

function App() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');

  const fetchStudents = async () => {
    try {
      setIsLoading(true);
      const res = await getStudents();
      setStudents(res.data);
      setError('');
    } catch (fetchError) {
      setError('Unable to fetch students. Check backend connection.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSaveStudent = async (studentData, id) => {
    try {
      setIsSaving(true);

      if (id) {
        await updateStudent(id, studentData);
        setSelectedStudent(null);
      } else {
        await addStudent(studentData);
      }

      await fetchStudents();
    } catch (saveError) {
      setError('Failed to save student. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteStudent = async (id) => {
    const previousStudents = students;
    setStudents((current) => current.filter((student) => student.id !== id));

    try {
      await deleteStudent(id);
      setError('');

      if (selectedStudent?.id === id) {
        setSelectedStudent(null);
      }
    } catch (deleteError) {
      setStudents(previousStudents);
      setError('Failed to delete student. Please try again.');
    }
  };

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
  };

  const handleCancelUpdate = () => {
    setSelectedStudent(null);
  };

  return (
    <main className="app-shell">
      <header className="hero">
        <p className="eyebrow">Spring Boot + React</p>
        <h1>Student Management System</h1>
        <p className="subtitle">Manage student records with instant CRUD updates.</p>
      </header>

      {error && <p className="error-banner">{error}</p>}

      <section className="content-grid">
        <AddStudent
          selectedStudent={selectedStudent}
          onSave={handleSaveStudent}
          onCancelUpdate={handleCancelUpdate}
          isSaving={isSaving}
        />
        <StudentList
          students={students}
          onUpdate={handleSelectStudent}
          onDelete={handleDeleteStudent}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
}

export default App;
