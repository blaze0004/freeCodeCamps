const Router = require('express').Router;
const express = require('express');
const path = require('path');
const usersRoutes = require('./controllers/users.controller');

const exerciseRouter = Router();

exerciseRouter.use(express.static(path.resolve(__dirname, 'public')));

exerciseRouter.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'views', 'index.html'))
})

exerciseRouter.use('/api/users', usersRoutes);

module.exports = exerciseRouter;