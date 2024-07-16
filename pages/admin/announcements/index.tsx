// pages/announcements.tsx
import CreateAnnouncement from "@/components/Announcements/CreateAnnouncements";
import { getAnnouncements, deleteAnnouncement } from "@/libs/announcements";
import { Announcement } from "@/types/announcement";
import supabaseClientSide from "@/utils/supabase/client";
import { Box, Button } from "@mui/material";
import { useSession } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";

const AnnouncementsPage = () => {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [refresh, setRefresh] = useState(false);
  const session = useSession();

  useEffect(() => {
    const fetchAnnouncements = async () => {
      const data = await getAnnouncements();
      console.log(session);
      console.log(data);
      setAnnouncements(data);
    };
    console.log(refresh);
    fetchAnnouncements();
  }, [refresh]);

  const handleDelete = async (id: string) => {
    await deleteAnnouncement(id);
    setAnnouncements(
      announcements.filter((announcement) => announcement.id !== id)
    );
  };

  return (
    <div className="text-black bg-gray-500 h-[200vh] w-full">
      <h1>Announcements</h1>
      <CreateAnnouncement setRefresh={setRefresh} refresh={refresh} />
      <Box className="flex flex-col p-5">
        {announcements.map((announcement) => (
          <Box
            key={announcement.id}
            className=" content-between justify-between"
          >
            <Box>
              <h2>{announcement.title}</h2>
              <p>{announcement.content}</p>
            </Box>
            <Button onClick={() => handleDelete(announcement.id)}>
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </div>
  );
};

export default AnnouncementsPage;
