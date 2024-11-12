const express = require('express');
const Note = require('../model/note.model')
const auth = require('../midddleware/auth.middleware')

const router = express.Router();

//get all notes
router.get('/', auth, async(req,res)=>{
    
    const userId = req.userId;// get the userid from auth middleare

    try {
      const notes = await Note.find({ user: userId });
      res.status(200).json(notes);
    } catch (error) {
      res.status(500).json({ message: 'Failed to retrieve notes', error });
    }
});

//get single notes using id
router.get('/:id', auth, (req,res)=>{});

//add note
router.post('/', auth, async(req,res)=>{    
    const { title, content } = req.body;
    const userId = req.userId; 
    try {
        const note = new Note({
        user: userId,
        title,
        content,
        });

        await note.save(); 
        res.status(201).json({ message: 'Note saved successfully', note });
    } catch (error) {
        res.status(500).json({ message: 'Failed to save note', error });
    }
});

//update note
router.put('/', auth, (req,res)=>{});

// delete note
router.delete('/:id', auth, async (req,res)=>{
    const userId = req.userId; 
    const noteId = req.params.id; // Note ID from the URL parameter
  
    try {
      // Now find the note by ID and ensure it belongs to the logged in user
      const note = await Note.findOne({ _id: noteId, user: userId });
      if (!note) {
        return res.status(404).json({ message: 'Note not found or access denied' });
      }
      await Note.deleteOne({ _id: noteId });
      res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete note', error });
    }
});

module.exports = router;