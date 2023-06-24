import { useEffect } from "react";
import CreateForm from "../components/CreateForm";
import NotesList from "../components/NotesList";
import UpdateForm from "../components/UpdateForm";
import notesStore from "../stores/notesStore";

const NotesPage = () => {
    const store = notesStore();

    useEffect(() => {
        store.fetchNotes();
    }, [])

    return (
    <div>
    
        <NotesList />

        <UpdateForm />

        <CreateForm />

    </div>);
};

export default NotesPage;
