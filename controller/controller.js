const { json } = require("express");
const Note = require("../models/note");


const getNotes = async (req, res) => {
    try{
        const notes = await Note.find({user: req.user._id});

        res.json({notes});
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

const getNote = async (req, res) => {
    try{
        const noteId = req.params.id;

        const note = await Note.findOne({_id: noteId, user: req.user._id});

        res.json({note});
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}


const postNotes = async (req, res) => {
    try{
        const {title, body} = req.body;

        const note = new Note({
            title: title,
            body: body,
            user: req.user._id,
        });

        await note.save();

        res.json({note: note});
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
} 

const updateNote = async (req, res) => {
    try{
        const noteId = req.params.id;

        const {title, body} = req.body;

        await Note.findOneAndUpdate({_id: noteId, user: req.user._id}, {
            title: title,
            body: body
        });

        const note = await Note.findById(noteId);

        res.json({note});
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

const deleteNote = async (req, res) => {
    try{
        const noteId = req.params.id;

        await Note.deleteOne({id: noteId, user: req.user._id});

        res.json({success: "Record deleted"});
    }catch(err){
        console.log(err)
        res.sendStatus(400)
    }
}

module.exports = {getNotes, getNote, postNotes, updateNote, deleteNote};