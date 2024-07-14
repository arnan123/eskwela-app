// pages/announcements.tsx
import CreateAnnouncement from "@/components/Announcements/CreateAnnouncements";
import { getAnnouncements, deleteAnnouncement } from "@/libs/announcements";
import { Announcement } from "@/types/announcement";
import supabaseClientSide from "@/utils/supabase/client";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const session = useSession();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getAnnouncements();
      console.log(session);
      console.log(data);
      setAnnouncements(data);
    };

    fetchAnnouncements();
  }, []);

  const handleDelete = async (id: string) => {
    await deleteAnnouncement(id);
    setAnnouncements(
      announcements.filter((announcement) => announcement.id !== id)
    );
  };

  return (
    <div className="text-black bg-gray-500">
      <h1>Announcements</h1>
      <CreateAnnouncement />
      {announcements.map((announcement) => (
        <div key={announcement.id}>
          <h2>{announcement.title}</h2>
          <p>{announcement.content}</p>
          <button onClick={() => handleDelete(announcement.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default AnnouncementsPage;
