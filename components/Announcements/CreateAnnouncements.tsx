// components/CreateAnnouncement.tsx
import { createAnnouncement } from "@/libs/announcements";
import { useSession } from "@supabase/auth-helpers-react";
import axios from "axios";
import { useState } from "react";

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const session = useSession();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await axios.post("/api/announcements/create", {
      title: title,
      id: session?.user.id,
    });

    console.log(res);
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
      <button type="submit">Create Announcement</button>
    </form>
  );
};

export default CreateAnnouncement;
