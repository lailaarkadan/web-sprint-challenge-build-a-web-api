// Write your "actions" router here!
const express = require('express')
const Actions = require('./actions-model')
const { 
    validateActionId, validateAction
 } = require('./actions-middlware')
const router = express.Router()

router.get('/', (req, res) => {
    Actions.get()
        .then(actions => res.status(200).json(actions))
})

router.get('/:id',validateActionId , (req, res) => {
    res.status(200).json(req.action)
})

router.post('/',validateAction , async (req, res, next) => {
    try {
        const newAction = await Actions.insert(req.body)
        res.status(201).json(newAction)
    } catch (err) {
        next(err)
    }
})

router.put("/:id",validateActionId , validateAction, (req, res, next) => {
    Actions.update(req.params.id, req.body)
        .then((updatedAction) => {
          res.status(200).json(updatedAction);
        })
        .catch(next);
    }
);
        

router.delete("/:id",validateActionId , async (req, res, next) => {
    try {
        await Actions.remove(req.params.id)
        res.status(200).send("deleted actions")
    } catch (err) {
        next(err)
    }
})