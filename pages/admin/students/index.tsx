// pages/students.tsx

import { Schedule, getSchedules } from "@/libs/schedules";
import {
  Student,
  getStudents,
  createStudent,
  updateStudent,
  deleteStudent,
} from "@/libs/students";
import { useEffect, useState } from "react";

const StudentsPage = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [newStudent, setNewStudent] = useState<Omit<Student, "id">>({
    email: "",
    schedule: 0,
    grades: {},
  });

  useEffect(() => {
    const fetchData = async () => {
      const studentsData = await getStudents();
      setStudents(studentsData);

      const schedulesData = await getSchedules();
      setSchedules(schedulesData);
    };

    fetchData();
  }, []);

  const handleCreate = async () => {
    const createdStudent = await createStudent(newStudent);
    setStudents([...students, createdStudent]);
  };

  const handleUpdate = async (id: number) => {
    const updatedStudent = await updateStudent(id, newStudent);
    setStudents(students.map((s) => (s.id === id ? updatedStudent : s)));
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    setStudents(students.filter((s) => s.id !== id));
  };

  return (
    <div>
      <h1>Students</h1>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.email} - {student.schedule} -{" "}
            {JSON.stringify(student.grades)}
            <button onClick={() => handleUpdate(student.id!)}>Update</button>
            <button onClick={() => handleDelete(student.id!)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2">
        <input
          type="email"
          placeholder="Email"
          value={newStudent.email}
          onChange={(e) =>
            setNewStudent({ ...newStudent, email: e.target.value })
          }
        />
        <select
          value={newStudent.schedule}
          onChange={(e) =>
            setNewStudent({ ...newStudent, schedule: Number(e.target.value) })
          }
        >
          <option value="">Select Schedule</option>
          {schedules.map((schedule) => (
            <option key={schedule.id} value={schedule.id}>
              {schedule.section_name} ({schedule.grade_level})
            </option>
          ))}
        </select>
        <textarea
          placeholder="Grades (JSON format)"
          value={JSON.stringify(newStudent.grades)}
          onChange={(e) =>
            setNewStudent({ ...newStudent, grades: JSON.parse(e.target.value) })
          }
        />
        <button onClick={handleCreate}>Create Student</button>
      </div>
    </div>
  );
};

export default StudentsPage;
