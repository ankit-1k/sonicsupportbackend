const express = require('express');
const QuestionModel = require('../schema/questionSchema');
const News = require('../schema/news');
const Project = require('../schema/project');
const Contact = require('../schema/contact');
const cors = require('cors');
const router = express.Router();

router.use(cors());
router.use(express.json());

const var1 = 'ankit';
const var2 = 'ankit123';

// Question
router.post('/upload', async (req, res) => {
    const { subject, question, answer } = req.body;
    const newQuestion = new QuestionModel({ subject, question, answer });
    try {
        await newQuestion.save();
        res.status(200).send('Question saved successfully');
    } catch (error) {
        res.status(500).send('Error saving question');
    }
});

router.get('/questions', async (_, res) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).send('Error fetching questions');
    }
});

router.put('/questions/:id', async (req, res) => {
    const { id } = req.params;
    const { question, answer } = req.body;

    try {
        console.log(`Received request to update note with id: ${id}`);
        const note = await QuestionModel.findById(id);
        if (!note) {
            console.log(`Note with id ${id} not found`);
            return res.status(404).json({ message: 'Note not found' });
        }

        note.question = question;
        note.answer = answer;
        await note.save();
        console.log(`Note with id ${id} updated successfully`);
        res.json(note);
    } catch (error) {
        console.error('Error updating note:', error);
        res.status(500).json({ message: error.message });
    }
});

router.delete('/questions/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const note = await QuestionModel.findByIdAndDelete(id);
        if (!note) {
            console.log(`Note with id ${id} not found`);
            return res.status(404).json({ message: 'Note not found' });
        }
        res.json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error('Error deleting note:', error);
        res.status(500).json({ message: error.message });
    }
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (email === var1 && password === var2) {
        res.status(200).json({ message: 'Success' });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// News Endpoints
router.post('/api/news', async (req, res) => {
    try {
        const newNews = new News({
            title: req.body.title,
            link: req.body.link,
            description: req.body.description,
        });
        await newNews.save();
        res.json(newNews);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/news', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/api/news/:id', async (req, res) => {
    try {
        const result = await News.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Project Endpoints
router.post('/api/projects', async (req, res) => {
    try {
        const { projectName, projectLink, description } = req.body;
        const newProject = new Project({ projectName, projectLink, description });
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.delete('/api/projects/:id', async (req, res) => {
    try {
        const deletedProject = await Project.findByIdAndDelete(req.params.id);
        if (!deletedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/api/projects/:id', async (req, res) => {
    try {
        const { projectName, projectLink, description } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { projectName, projectLink, description },
            { new: true }
        );
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Contact Endpoint
router.post('/api/contact', async (req, res) => {
    const { name, email, phone, website, message } = req.body;
    try {
        const newContact = new Contact({ name, email, phone, website, message });
        await newContact.save();
        res.status(201).json(newContact);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
router.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await Contact.find();
        res.status(200).json(contacts);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
router.delete('/api/contacts/:id', async (req, res) => {
    try {
        const contactId = req.params.id;
        const deletedContact = await Contact.findByIdAndDelete(contactId);
        if (!deletedContact) {
            return res.status(404).json({ error: 'Contact not found' });
        }
        res.status(200).json({ message: 'Contact deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});
module.exports = router;