// components/NoteList.tsx

import { useEffect } from "react";

interface NoteListProps {
  notes: any;
  onEdit: (note: any) => void;
  onDelete: (id: string) => void;
}

const NoteList: React.FC<NoteListProps> = ({ notes, onEdit, onDelete }) => {
  useEffect(() => {
    console.log(notes);
  }, []);

  return (
    <div className="space-y-4">
      {notes.map((note: any) => (
        <div key={note.id} className="p-4 border rounded">
          <h3 className="text-xl font-bold">{note.title}</h3>
          <p>{note.content}</p>
          <button
            onClick={() => onEdit(note)}
            className="px-4 py-2 mr-2 text-white bg-green-500 rounded"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="px-4 py-2 text-white bg-red-500 rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
