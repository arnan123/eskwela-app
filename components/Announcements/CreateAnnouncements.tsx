// components/CreateAnnouncement.tsx
import { createAnnouncement } from "@/libs/announcements";
import { useSession } from "@supabase/auth-helpers-react";
import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import Button from "../Buttons/Primary";

const CreateAnnouncement = ({
  setRefresh,
  refresh,
}: {
  setRefresh: Dispatch<SetStateAction<boolean>>;
  refresh: boolean;
}) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/announcements/create", {
      title: title,
      content: content,
      id: session?.user.id,
    });
    setRefresh(!refresh);
    setTitle("");
    setContent("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Content</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <Button type="submit">Create Announcement</Button>
    </form>
  );
};

export default CreateAnnouncement;
