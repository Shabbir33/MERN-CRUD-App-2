import notesStore from "../stores/notesStore";
import NoteSingle from "./NoteSingle";

export default function NotesList(){
    const store = notesStore();

    return(
    <div>
        <h2>Notes: </h2>
        {store.notes && 
        store.notes.map((note) => {
            return <NoteSingle note={note} key={note._id} />;
        })}
    </div>
    )
}