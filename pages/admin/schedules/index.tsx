// pages/schedules.tsx

import {
  Schedule,
  getSchedules,
  createSchedule,
  updateSchedule,
  deleteSchedule,
} from "@/libs/schedules";
import { useEffect, useState } from "react";

const SchedulesPage = () => {
  const [schedules, setSchedules] = useState<Schedule[]>([]);
  const [newSchedule, setNewSchedule] = useState<Omit<Schedule, "id">>({
    grade_level: 7,
    section_name: "",
    subject_with_time: {},
  });

  useEffect(() => {
    const fetchSchedules = async () => {
      const data = await getSchedules();
      setSchedules(data);
    };

    fetchSchedules();
  }, []);

  const handleCreate = async () => {
    const createdSchedule = await createSchedule(newSchedule);
    setSchedules([...schedules, createdSchedule]);
  };

  const handleUpdate = async (id: number) => {
    const updatedSchedule = await updateSchedule(id, newSchedule);
    setSchedules(schedules.map((s) => (s.id === id ? updatedSchedule : s)));
  };

  const handleDelete = async (id: number) => {
    await deleteSchedule(id);
    setSchedules(schedules.filter((s) => s.id !== id));
  };

  return (
    <div className="text-black">
      <h1>Schedules</h1>
      <ul>
        {schedules.map((schedule) => (
          <li key={schedule.id}>
            {schedule.grade_level} - {schedule.section_name} -{" "}
            {JSON.stringify(schedule.subject_with_time)}
            <button onClick={() => handleUpdate(schedule.id!)}>Update</button>
            <button onClick={() => handleDelete(schedule.id!)}>Delete</button>
          </li>
        ))}
      </ul>
      <div className="flex flex-col gap-2">
        <input
          type="number"
          placeholder="grade-level"
          value={newSchedule.grade_level}
          onChange={(e) =>
            setNewSchedule({
              ...newSchedule,
              grade_level: Number(e.target.value),
            })
          }
        />
        <input
          type="text"
          placeholder="section name"
          value={newSchedule.section_name}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, section_name: e.target.value })
          }
        />
        <textarea
          value={JSON.stringify(newSchedule.subject_with_time)}
          onChange={(e) =>
            setNewSchedule({
              ...newSchedule,
              subject_with_time: JSON.parse(e.target.value),
            })
          }
        />
        <button onClick={handleCreate}>Create Schedule</button>
      </div>
    </div>
  );
};

export default SchedulesPage;
