import {useEffect, useState} from "react"
import axios from "axios";
import notesStore from "../stores/notesStore";
import NotesList from "./NotesList";
import UpdateForm from "./UpdateForm";
import CreateForm from "./CreateForm";

const Note = () => {
    const store = notesStore();

    // const [notes, setNotes] = useState(null);
    // const [formField, setFormField] = useState({
    //     title: "",
    //     body: ""
    // })
    // const [updateForm, setUpdateForm] = useState({
    //     _id: null,
    //     title: "",
    //     body: ""
    // })

    useEffect(() => {
        store.fetchNotes();
    }, [])

    // const fetchNotes = async () => {
    //     const res = await axios.get("http://localhost:5000/");

    //     setNotes(res.data.notes);
    //     console.log(res.data)
    // };

    // const updateCreateFormField = async (event) =>{
    //     const {name, value} = event.target;

    //     setFormField((prevValue) => {
    //         return({
    //             ...prevValue,
    //             [name]: value
    //         })
    //     })
    // }

    // const createNote = async (event) => {
    //     event.preventDefault();
        
    //     const res = await axios.post("http://localhost:5000/notes", formField);

    //     setNotes([...notes, res.data.note]);
    //     console.log(res)
    //     setFormField({
    //         title:"",
    //         body:""
    //     })
    // }

    // const deleteNote = async (_id) => {
    //     const res = await axios.delete(`http://localhost:5000/notes/${_id}`);

    //     const newNotes = [...notes].filter((note) => {
    //         return note._id !== _id;
    //     })

    //     setNotes(newNotes);
    // }

    // const handleUpdateFieldChange = (e) => {
    //     const {value, name} = e.target;

    //     setUpdateForm((prevValue) => {
    //         return({
    //             ...prevValue,
    //             [name]: value
    //         });
    //     });
    // }

    // const toggleUpdate = (note) => {
    //     setUpdateForm({title: note.title, body: note.body, _id: note._id})
    // }

    // const updateNote = async (event) => {
    //     event.preventDefault();

    //     const { _id, title, body } = updateForm;

    //     const res = await axios.patch(`http://localhost:5000/notes/${_id}`, {title, body});

    //     const newNotes = [...notes];
    //     const noteIndex = notes.findIndex((note) => {
    //         return note._id === _id;
    //     })
    //     newNotes[noteIndex] = res.data.note;

    //     setNotes(newNotes);

    //     setUpdateForm({
    //         _id: null,
    //         title: "",
    //         body: ""
    //     })
    // }

    return (
    <div>
    
        <NotesList />

        <UpdateForm />

        <CreateForm />

    </div>);
};

export default Note; 