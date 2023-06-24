import {create} from "zustand";
import axios from "axios";

const notesStore = create((set) => ({
    notes: null,

    createForm: {
        title: "",
        body: ""
    },

    updateForm: {
        _id: null,
        title: "",
        body: ""
    },

    fetchNotes: async () => {
        console.log("Hello")
        const res = await axios.get("http://localhost:5000/");

        set({notes: res.data.notes});
    },

    updateCreateFormField : (event) => {
        const {name, value} = event.target;

        set((state) => {
            return {
                createForm: {
                    ...state.createForm,
                    [name]: value,
                }
            };
        });
    },

    createNote: async (event) => {
        event.preventDefault();

        const {createForm, notes} = notesStore.getState();
        
        const res = await axios.post("http://localhost:5000/notes", createForm);

        set({
            notes: [...notes, res.data.note],
            createForm: {
                title: "",
                body: ""
            },
        });
    },

    deleteNote: async (_id) => {
        const res = await axios.delete(`http://localhost:5000/notes/${_id}`);
        const {notes} = notesStore.getState();

        const newNotes = notes.filter((note) => {
            return note._id !== _id;
        });

        set({notes: newNotes});
    },

    handleUpdateFieldChange: (e) => {
        const {value, name} = e.target;

        set((state) => {
            return{
                updateForm: {
                    ...state.updateForm,
                    [name]: value
                },
            };
        });
    },

    toggleUpdate: (note) => {
        const {_id, title, body} = note;

        set({
            updateForm:{
                title,
                body,
                _id
            },
        })
    },

    updateNote: async (event) => {
        event.preventDefault();

        const { 
            updateForm: {_id, title, body}, 
            notes,
        } = notesStore.getState();

        const res = await axios.patch(`http://localhost:5000/notes/${_id}`, {title, body});

        const newNotes = [...notes];
        const noteIndex = notes.findIndex((note) => {
            return note._id === _id;
        })
        newNotes[noteIndex] = res.data.note;

        set({
            notes: newNotes,
            updateForm: {
                _id: null,
            title: "",
            body: ""
            }
        });
    },
}));

export default notesStore;