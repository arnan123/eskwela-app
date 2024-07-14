// components/NoteForm.tsx
import { useState } from "react";

interface NoteFormProps {
  initialData?: { id?: string; title: string; content: string };
  onSubmit: (data: { title: string; content: string }) => void;
}

const NoteForm: React.FC<NoteFormProps> = ({ initialData, onSubmit }) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [content, setContent] = useState(initialData?.content || "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="px-4 py-2 text-white bg-blue-500 rounded"
      >
        {initialData ? "Update Note" : "Create Note"}
      </button>
    </form>
  );
};

export default NoteForm;
