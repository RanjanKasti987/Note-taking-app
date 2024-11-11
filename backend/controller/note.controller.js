const express = require('express');

const router = express.Router();

//get all notes
router.get('/', (req,res)=>{});

//get single notes using id
router.get('/:id', (req,res)=>{});

//add note
router.post('/', (req,res)=>{});

//update note
router.put('/', (req,res)=>{});

// delete note
router.delete('/:id', (req,res)=>{});

module.exports = router;