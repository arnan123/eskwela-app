import { getSubjectsWithUsers } from "@/libs/subjects";
import { Button } from "@mui/material";
import { useEffect, useState } from "react";

const SubjectsPage = () => {
  const [subjects, setSubjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null as any);

  useEffect(() => {
    const fetchSubjects = async () => {
      const { subjects, error } = await getSubjectsWithUsers();
      if (error) {
        setError(error as any);
      } else {
        setSubjects(subjects as any);
      }
      setLoading(false);
    };

    fetchSubjects();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="text-black">
      <div className="flex">
        <h1>Subjects</h1>
        <Button>CREATE SUBJECT</Button>
      </div>
      {subjects.map((subject: any) => (
        <div key={subject.id}>
          <h2>
            {subject.name} (Grade Level: {subject.grade_level})
          </h2>
          <h3>Users:</h3>
          <ul>
            {subject.users.map((user: any) => (
              <li key={user.id}>{user.username}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SubjectsPage;
