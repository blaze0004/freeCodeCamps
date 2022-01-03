const { Router } = require('express');
const { Users } = require('../models/user.model');
const { Exercises } = require('../models/exercise.model');

const userRouter = Router();

userRouter.post('/:id/exercises', (req, res) => {
    const { id } = req.params;
    const { description, duration, date = new Date() } = req.body; 

    Exercises.create({
        userId: id,
        description,
        duration: Number.parseInt(duration),
        date: !!date ? new Date(date) : new Date()
    }, (err, data) => {
        if (err) {
            return res.json({ errorMessage: err.message });
        } 
        
        Users.findById(data.userId, (err, user) => {
            if (err) {
                return res.json({ errorMessage: err.message })
            }

            return res.json({
                username: user.username,
                description: data.description,
                duration: data.duration,
                date: data.date.toDateString(),
                _id: id,
            })
        })
    })
    
})

userRouter.get('/:id/logs', (req, res) => {
    const { id } = req.params;
    const { from, to, limit } = req.query;

    Users.findById(id, (err, user) => {
        if (err) {
            return res.json({ errMessage: err.message });
        }

        let query = Exercises.find({ userId: id })
        
        if (from) {
            query = query.where({ date: {
                $gte: new Date(from)
            }})
        }

        if (to) {
            query = query.where({ date: {
                $lte: new Date(to)
            }})
        }

        if (limit) {
            query = query.limit(Number.parseInt(limit));
        }

        query.exec((exercisesError, exercises) => {
            if (exercisesError) {
                return res.json({ errorMessage: exercisesError.message });
            }

            return res.json({
                username: user.username,
                count: exercises.length,
                _id: id,
                log: exercises.map(x => ({
                    description: x.description,
                    duration: x.duration,
                    date: x.date.toDateString(),
                }))
            })
        })
    })
})

userRouter.get('/:id', async (req, res) => {
    const { id } = req.params;

    Users.findById(id, (err, data) => {
        if (err) {
           return res.json({ error: err.message })
        } 

        return res.json(data)
    })
})


userRouter.post('/', async (req, res) => {
    try {
        const { username } = req.body;
        const newUser = await Users.create({
            username
        })
        res.json(newUser);
    } catch (e) {
        res.json({ error: e.message });
    }
});

userRouter.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.json(users);
    } catch (e) {
        res.json({ errorMessage: e.message });
    }
});

module.exports = userRouter;