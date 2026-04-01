function StudentList({ students, onUpdate, onDelete, isLoading }) {
  return (
    <section className="panel list-panel">
      <h2>Student List</h2>

      {isLoading ? (
        <p className="status-text">Loading students...</p>
      ) : students.length === 0 ? (
        <p className="status-text">No students available.</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Course</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr key={student.id}>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.course}</td>
                  <td className="action-cell">
                    <button className="btn btn-warning" onClick={() => onUpdate(student)}>
                      Update
                    </button>
                    <button className="btn btn-danger" onClick={() => onDelete(student.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default StudentList;
