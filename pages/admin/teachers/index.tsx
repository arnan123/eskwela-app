// pages/teachers.tsx

import { Teacher } from "@/interface/TeacherInterface";
import { getSubjectsWithUsers } from "@/libs/subjects";
import { getTeachers } from "@/libs/teachers";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const TeachersPage = () => {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [subjects, setSubjects] = useState([]);
  useEffect(() => {
    const fetchTeachers = async () => {
      const response = await getTeachers();
      const data = response as any;
      setTeachers(data);
    };

    fetchTeachers();
  }, []);

  return (
    <div>
      <h1>Teachers</h1>

      <ul>
        {teachers.map((teacher) => (
          <li key={teacher.id}>
            {teacher.firstname} - {teacher.lastname}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeachersPage;
