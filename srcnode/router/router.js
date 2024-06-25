const express = require('express');
const QuestionModel = require('./../schema/questionSchema');
const NewsModal = require('../schema/news');
const router = express.Router();
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;
const Item = require('./../schema/item');
const News = require('./../schema/news');
const Project = require('./../schema/project');
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
        console.error('Error saving question:', error);
        res.status(500).send('Error saving question');
    }
});

router.get('/questions', async (_, res) => {
    try {
        const questions = await QuestionModel.find();
        res.status(200).json(questions);
    } catch (error) {
        console.error('Error fetching questions:', error);
        res.status(500).send('Error fetching questions');
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
        console.error('Error saving news:', error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/api/news', async (req, res) => {
    try {
        const news = await News.find();
        res.json(news);
    } catch (error) {
        console.error('Error fetching news:', error);
        res.status(500).json({ error: error.message });
    }
});

router.delete('/api/news/:id', async (req, res) => {
    try {
        const result = await News.findByIdAndDelete(req.params.id);
        res.json(result);
    } catch (error) {
        console.error('Error deleting news:', error);
        res.status(500).json({ error: error.message });
    }
});

router.post('/api/projects', async (req, res) => {
    try {
        const { projectName, projectLink, description } = req.body;
        const newProject = new Project({ projectName, projectLink, description });
        await newProject.save();
        res.status(201).json({ message: 'Project created successfully' });
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find(); // Fetch all projects from the database
        res.status(200).json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
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
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// PUT /api/projects/:id - Update a project by ID
router.put('/api/projects/:id', async (req, res) => {
    try {
        const { projectName, projectLink, description } = req.body;
        const updatedProject = await Project.findByIdAndUpdate(
            req.params.id,
            { projectName, projectLink, description },
            { new: true } // Return the updated project
        );
        if (!updatedProject) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.status(200).json({ message: 'Project updated successfully', project: updatedProject });
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
